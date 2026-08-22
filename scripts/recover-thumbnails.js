// Recovery pass: for posts WITHOUT a Thumbnail, re-scan ALL child blocks
// (images beyond the first, video blocks, YouTube bookmarks) for a usable source.
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'thumbnails');
const UA = { 'User-Agent': 'BlockFrameLabsSiteBot/1.0 (contact@blockframe.cloud)' };

function ytId(url) {
  const m = url.match(/youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?&\s/]+)/) || url.match(/youtu\.be\/([^?&\s/]+)/);
  return m ? m[1] : null;
}

(async () => {
  let cursor;
  let recovered = 0, stillNone = 0;

  do {
    const res = await notion.databases.query({
      database_id: DB,
      filter: { and: [
        { property: 'Status', select: { equals: 'approved' } },
        { property: 'Thumbnail', url: { is_empty: true } },
      ]},
      start_cursor: cursor,
      page_size: 50,
    });
    cursor = res.has_more ? res.next_cursor : undefined;

    for (const page of res.results) {
      const title = page.properties.Title?.title?.[0]?.plain_text || '?';
      const short = title.slice(0, 50);

      // Gather candidate URLs from every block type, in order
      let children;
      try {
        children = (await notion.blocks.children.list({ block_id: page.id, page_size: 100 })).results;
      } catch { continue; }

      const candidates = [];
      for (const b of children) {
        if (b.type === 'image') {
          const u = b.image?.type === 'external' ? b.image.external?.url : b.image?.file?.url;
          if (u) candidates.push(u);
        } else if (b.type === 'video') {
          const u = b.video?.type === 'external' ? b.video.external?.url : b.video?.file?.url;
          const id = u ? ytId(u) : null;
          if (id) candidates.push(`yt:${id}`);
        } else if (b.type === 'bookmark' || b.type === 'embed') {
          const u = b[b.type]?.url || '';
          const id = ytId(u);
          if (id) candidates.push(`yt:${id}`);
        }
      }

      let done = false;
      for (const cand of candidates) {
        try {
          let buf, ext;
          if (cand.startsWith('yt:')) {
            const r = await fetch(`https://img.youtube.com/vi/${cand.slice(3)}/hqdefault.jpg`, { headers: UA });
            if (!r.ok) continue;
            buf = Buffer.from(await r.arrayBuffer());
            ext = 'jpg';
          } else {
            const r = await fetch(cand, { headers: UA, signal: AbortSignal.timeout(25000) });
            if (!r.ok) continue;
            const type = r.headers.get('content-type') || '';
            if (!type.startsWith('image/')) continue;
            buf = Buffer.from(await r.arrayBuffer());
            if (buf.length < 500) continue;
            if (buf.length > 3 * 1024 * 1024) continue;
            ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('svg') ? 'svg' : 'jpg';
          }
          const filename = `${page.id}.${ext}`;
          fs.writeFileSync(path.join(OUT_DIR, filename), buf);
          await notion.pages.update({
            page_id: page.id,
            properties: { Thumbnail: { url: `/images/thumbnails/${filename}` } },
          });
          recovered++;
          done = true;
          console.log(`✓ ${filename} (${Math.round(buf.length / 1024)}KB) ${short}`);
          break;
        } catch { /* try next candidate */ }
      }
      if (!done) { stillNone++; console.log(`· nothing recoverable: ${short}`); }
    }
  } while (cursor);

  console.log(`\nrecovered=${recovered}, still-without=${stillNone}`);
})();
