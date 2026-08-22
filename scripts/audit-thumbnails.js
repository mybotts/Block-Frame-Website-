// Audit: test every approved post's Thumbnail URL; report failures with status codes.
// Optionally pass --fix to download failures into public/images/thumbnails/ and repoint.
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;
const FIX = process.argv.includes('--fix');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'thumbnails');

async function checkUrl(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
        Accept: 'image/*,*/*;q=0.8',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });
    const type = resp.headers.get('content-type') || '';
    const ok = resp.ok && type.startsWith('image/');
    return { ok, status: resp.status, type };
  } catch (err) {
    return { ok: false, status: 0, type: err.name };
  }
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let cursor;
  const failures = [];
  let total = 0;

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
      if (url.startsWith('/images/')) continue; // local asset, always fine
      total++;
      const title = page.properties.Title?.title?.[0]?.plain_text || '?';
      const r = await checkUrl(url);
      if (!r.ok) {
        failures.push({ page, title, url, ...r });
        console.log(`✗ [${r.status || r.type}] ${title.slice(0, 55)}`);
        console.log(`   ${url.slice(0, 120)}`);
      }
    }
  } while (cursor);

  console.log(`\nchecked ${total} remote thumbnails, ${failures.length} failing`);

  if (FIX && failures.length > 0) {
    console.log('\n--- fixing: downloading failures as local assets ---');
    for (const f of failures) {
      try {
        // For expired Notion S3 URLs the signed link is dead; try refreshing via
        // the page's own attachment is not possible via API. Skip those with a note.
        if (/prod-files-secure|notion-static/.test(f.url)) {
          console.log(`⚠ cannot re-download expired Notion URL for "${f.title.slice(0, 40)}" — needs fresh source`);
          continue;
        }
        const resp = await fetch(f.url, {
          headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' },
          signal: AbortSignal.timeout(20000),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const type = resp.headers.get('content-type') || 'image/jpeg';
        const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('svg') ? 'svg' : 'jpg';
        const buf = Buffer.from(await resp.arrayBuffer());
        if (buf.length < 1024) throw new Error(`too small (${buf.length}b)`);
        const filename = `${f.page.id}.${ext}`;
        fs.writeFileSync(path.join(OUT_DIR, filename), buf);
        await notion.pages.update({
          page_id: f.page.id,
          properties: { Thumbnail: { url: `/images/thumbnails/${filename}` } },
        });
        console.log(`✓ localized ${filename} (${Math.round(buf.length / 1024)}KB) for "${f.title.slice(0, 45)}"`);
      } catch (err) {
        console.log(`✗ could not localize "${f.title.slice(0, 45)}": ${err.message}`);
      }
    }
  }
})();
