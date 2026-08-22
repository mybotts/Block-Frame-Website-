// Stabilize thumbnails: download Notion-hosted (expiring) image URLs into
// public/images/thumbnails/ and repoint the Thumbnail property at the local path.
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'thumbnails');

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let cursor;
  let stabilized = 0;

  do {
    const res = await notion.databases.query({
      database_id: DB,
      filter: { property: 'Status', select: { equals: 'approved' } },
      start_cursor: cursor,
      page_size: 50,
    });
    cursor = res.has_more ? res.next_cursor : undefined;

    for (const page of res.results) {
      const url = page.properties.Thumbnail?.url;
      if (!url) continue;

      // Only fix expiring Notion-hosted URLs (S3 + notion-static file proxies)
      if (!/prod-files-secure\.(s3|us-west-2)|prod-files\.secure\.notion\.static\.com|notion-static\.com/.test(url)) continue;

      const title = page.properties.Title?.title?.[0]?.plain_text || '?';
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const type = resp.headers.get('content-type') || 'image/jpeg';
        const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
        const filename = `${page.id}.${ext}`;
        const buf = Buffer.from(await resp.arrayBuffer());
        fs.writeFileSync(path.join(OUT_DIR, filename), buf);

        const localUrl = `/images/thumbnails/${filename}`;
        await notion.pages.update({
          page_id: page.id,
          properties: { Thumbnail: { url: localUrl } },
        });
        stabilized++;
        console.log(`✓ ${title.slice(0, 55)} -> ${localUrl} (${Math.round(buf.length / 1024)}KB)`);
      } catch (err) {
        console.error(`✗ ${title.slice(0, 45)}: ${err.message}`);
      }
    }
  } while (cursor);

  console.log(`\nStabilized ${stabilized} thumbnails into public/images/thumbnails/`);
})();
