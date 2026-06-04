const { Client } = require('@notionhq/client');
const fs = require('fs');

const envLines = fs.readFileSync('/data/workspace/hermes-agents/daniel/workspace/site/.env.local', 'utf8').split('\n');
const env = {};
for (const line of envLines) {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.substring(0, idx)] = line.substring(idx + 1).trim();
}

const notion = new Client({ auth: env.NOTION_TOKEN });

(async () => {
  const res = await notion.databases.query({
    database_id: env.NOTION_POSTS_DB_ID,
    sorts: [{ property: 'Date', direction: 'descending' }],
  });

  for (const page of res.results.slice(0, 5)) {
    const props = page.properties;
    const title = props.Title?.title?.[0]?.plain_text || 'untitled';
    const rawContent = props.Content?.rich_text?.map(t => t.plain_text).join('') || '';
    const children = await notion.blocks.children.list({ block_id: page.id });
    const imgBlocks = children.results.filter(c => c.type === 'image');
    const vidBlocks = children.results.filter(c => c.type === 'video');

    console.log('\n=== ' + title + ' ===');
    console.log('Content prop length:', rawContent.length);
    console.log('Content prop empty?', rawContent.length === 0);
    console.log('Child blocks:', children.results.length);
    console.log('Image blocks in children:', imgBlocks.length);
    console.log('Video blocks in children:', vidBlocks.length);

    // Check if Content prop has blocks JSON
    if (rawContent.length > 0) {
      try {
        const parsed = JSON.parse(rawContent);
        if (Array.isArray(parsed)) {
          const types = parsed.map(b => b.type);
          console.log('Content prop block types:', types.join(', '));
        }
      } catch(e) {
        console.log('Content prop is NOT JSON, plain text');
      }
    }

    // Check child block types
    const childTypes = children.results.map(c => c.type);
    console.log('Child block types:', childTypes.join(', '));
  }
})().catch(e => console.error('ERROR:', e.message));
