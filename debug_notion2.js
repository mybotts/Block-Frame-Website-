const { Client } = require('@notionhq/client');
const fs = require('fs');

const envLines = fs.readFileSync('/data/workspace/hermes-agents/daniel/workspace/site/.env.local', 'utf8').split('\n');
const env = {};
for (const line of envLines) {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.substring(0, idx)] = line.substring(idx + 1).trim();
}

const notion = new Client({ auth: env.NOTION_TOKEN });

function parseBlocks(raw) {
  let blocks = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      blocks = parsed.map((b, idx) => ({
        id: b.id || `block-${idx}`,
        type: b.type || 'text',
        content: b.content || '',
        order: b.order ?? idx,
        language: b.language,
      }));
      return blocks;
    }
  } catch (e) {}
  return [{ id: 'block-fallback', type: 'text', content: raw, order: 0 }];
}

async function fetchBlogPostWithBlocks(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const props = page.properties;
  const rawContent = props.Content?.rich_text?.map(t => t.plain_text).join('') || '';
  let blocks = [];
  if (rawContent) blocks = parseBlocks(rawContent);

  if (blocks.length === 0) {
    try {
      let cursor = null;
      const allChildren = [];
      do {
        const res = await notion.blocks.children.list({ block_id: pageId, page_size: 100, start_cursor: cursor || undefined });
        allChildren.push(...res.results);
        cursor = res.next_cursor;
      } while (cursor != null);

      console.log(`  Fetched ${allChildren.length} child blocks`);

      blocks = allChildren.map((block, idx) => {
        let type = 'text', content = '', language;
        switch (block.type) {
          case 'paragraph':
            content = block.paragraph.rich_text.map(t => t.plain_text).join('');
            break;
          case 'heading_1': case 'heading_2': case 'heading_3':
            type = 'text';
            const lvl = block.type === 'heading_1' ? '# ' : block.type === 'heading_2' ? '## ' : '### ';
            content = lvl + block[block.type].rich_text.map(t => t.plain_text).join('');
            break;
          case 'bulleted_list_item': case 'numbered_list_item':
            content = '- ' + block[block.type].rich_text.map(t => t.plain_text).join('');
            break;
          case 'image':
            type = 'image';
            content = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
            break;
          case 'video':
            type = 'video';
            content = block.video.type === 'external' ? block.video.external.url : block.video.file.url;
            break;
          case 'code':
            type = 'code';
            content = block.code.rich_text.map(t => t.plain_text).join('');
            language = block.code.language || undefined;
            break;
          case 'divider': content = '---'; break;
          case 'bookmark':
            type = 'bookmark';
            content = JSON.stringify({ url: block.bookmark.url, caption: block.bookmark.caption?.map(c => c.plain_text).join('') || '' });
            break;
          case 'embed': case 'link_preview':
            type = 'html'; content = `<!-- ${block.type} -->`; break;
          default:
            type = 'html'; content = `<!-- ${block.type} -->`;
        }
        const obj = { id: block.id, type, content, order: idx };
        if (language) obj.language = language;
        return obj;
      }).filter(b => b.content && b.content.length > 0);
    } catch (err) {
      console.warn('Failed:', err.message);
    }
  }

  const getText = (p) => {
    if (!p) return '';
    if (p.title) return p.title[0]?.plain_text || '';
    if (p.rich_text) return p.rich_text[0]?.plain_text || '';
    if (p.select) return p.select.name;
    if (p.date) return p.date.start;
    return '';
  };

  const title = getText(props.Title);
  const category = getText(props.Category);
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  const excerpt = getText(props.Excerpt) || '';
  const date = getText(props.Date) || new Date().toISOString().split('T')[0];
  const status = getText(props.Status).toLowerCase();
  const author = getText(props.Author) || 'BlockFrameLabs';

  const cleaned = [];
  let firstH1Seen = false;
  for (const block of blocks) {
    if (block.type === 'text' || block.type === 'markdown') {
      if (/^title:/.test(block.content) && /description:/.test(block.content)) continue;
      if (cleaned.length > 0 && cleaned[cleaned.length-1].type === block.type && cleaned[cleaned.length-1].content === block.content) continue;
      if (block.content.startsWith('# ')) { if (firstH1Seen) continue; firstH1Seen = true; }
    }
    cleaned.push(block);
  }

  return {
    id: page.id, title, excerpt, category, categorySlug, date, status, author,
    blocks: cleaned,
    content: cleaned.filter(b => b.type === 'text' || b.type === 'markdown').map(b => b.content).join('\n\n'),
  };
}

(async () => {
  const res = await notion.databases.query({
    database_id: env.NOTION_POSTS_DB_ID,
    sorts: [{ property: 'Date', direction: 'descending' }],
  });

  for (const page of res.results.slice(0, 2)) {
    const title = page.properties.Title?.title?.[0]?.plain_text || 'untitled';
    console.log('\n=== ' + title + ' ===');
    const post = await fetchBlogPostWithBlocks(page.id);
    console.log('Blocks:', post.blocks.length);
    for (const b of post.blocks) {
      const preview = b.content.substring(0, 120).replace(/\n/g, '\\n');
      console.log(`  [${b.type}] ${preview}`);
    }
  }
})().catch(e => console.error('ERROR:', e.message));
