// Backfill: for every approved post, find the first image block or YouTube
// video in its child blocks and write it to the "Thumbnail" url property.
const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;

function extractYouTubeId(url) {
  const patterns = [
    /youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?&\s/]+)/,
    /youtu\.be\/([^?&\s/]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function thumbnailFromChildren(children) {
  for (const b of children) {
    if (b.type === 'image') {
      const img = b.image || {};
      const url = img.type === 'external' ? img.external?.url : img.file?.url;
      if (url && url.startsWith('http')) {
        // Notion file URLs expire; still fine as backfill seed. Prefer external (stable).
        return { url, source: 'image-block', stable: img.type === 'external' };
      }
    }
  }
  for (const b of children) {
    if (b.type === 'video') {
      const v = b.video || {};
      const url = v.type === 'external' ? v.external?.url : v.file?.url;
      if (url) {
        const id = extractYouTubeId(url);
        if (id) return { url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, source: 'youtube-frame', stable: true };
      } else if (v.type === 'file' && v.file?.url) {
        // YouTube embeds via file type are rare; skip
      }
    }
  }
  for (const b of children) {
    if (b.type === 'bookmark' && /^https:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(b.bookmark?.url || '')) {
      const id = extractYouTubeId(b.bookmark.url);
      if (id) return { url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, source: 'bookmark-frame', stable: true };
    }
  }
  return null;
}

(async () => {
  let cursor;
  let scanned = 0, updated = 0, noImage = 0, skippedNotionFile = [];
  const missing = [];

  do {
    const res = await notion.databases.query({
      database_id: DB,
      filter: { property: 'Status', select: { equals: 'approved' } },
      start_cursor: cursor,
      page_size: 50,
    });
    cursor = res.has_more ? res.next_cursor : undefined;

    for (const page of res.results) {
      scanned++;
      const props = page.properties;
      const title = props.Title?.title?.[0]?.plain_text || '?';

      // Respect explicit thumbnails already set
      if (props.Thumbnail?.url) {
        continue;
      }

      try {
        const children = await notion.blocks.children.list({ block_id: page.id, page_size: 100 });
        const found = thumbnailFromChildren(children.results);

        if (!found) {
          noImage++;
          missing.push(title.slice(0, 60));
          continue;
        }
        if (!found.stable) {
          skippedNotionFile.push(title.slice(0, 60));
        }
        await notion.pages.update({
          page_id: page.id,
          properties: { Thumbnail: { url: found.url } },
        });
        updated++;
        console.log(`✓ [${found.source}] ${title.slice(0, 60)}`);
      } catch (err) {
        console.error(`✗ ${title.slice(0, 40)}: ${err.message}`);
      }
    }
  } while (cursor);

  console.log(`\nDone. scanned=${scanned} updated=${updated} without-image=${noImage}`);
  if (skippedNotionFile.length) {
    console.log('\nNOTE: these got Notion-hosted (expiring ~1h) file URLs. Re-run later or upload stable images:');
    skippedNotionFile.forEach(t => console.log('  -', t));
  }
  if (missing.length) {
    console.log('\nNo image/video found in:');
    missing.forEach(t => console.log('  -', t));
  }
})();
