// Localize ALL remote blog thumbnails into public/images/thumbnails/.
// - Downloads each remote image once (with retry/backoff for 429)
// - Falls back to Wayback Machine for dead files (404s)
// - Clears the Thumbnail property when nothing works (card falls back gracefully)
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'thumbnails');

const UA = { 'User-Agent': 'BlockFrameLabsSiteBot/1.0 (contact@blockframe.cloud)' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchImage(url, attempt = 1) {
  try {
    const resp = await fetch(url, {
      headers: { ...UA, Accept: 'image/*,*/*;q=0.8' },
      redirect: 'follow',
      signal: AbortSignal.timeout(25000),
    });
    if (resp.status === 429 && attempt <= 3) {
      await sleep(attempt * 4000);
      return fetchImage(url, attempt + 1);
    }
    return resp;
  } catch (err) {
    if (attempt <= 2) {
      await sleep(attempt * 3000);
      return fetchImage(url, attempt + 1);
    }
    throw err;
  }
}

async function waybackFor(url) {
  try {
    const r = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`, {
      headers: UA, signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return null;
    const j = await r.json();
    const snap = j?.archived_snapshots?.closest;
    if (!snap || snap.available !== true) return null;
    // rewrite web.archive.org snapshot to raw asset URL
    let u = snap.url;
    u = u.replace(/^https?:\/\/web\.archive\.org\/web\/(\d+)\//, 'https://web.archive.org/web/${1}id_/');
    return u;
  } catch {
    return null;
  }
}

function extFromType(type, url) {
  if (type.includes('png')) return 'png';
  if (type.includes('webp')) return 'webp';
  if (type.includes('gif')) return 'gif';
  if (type.includes('svg')) return 'svg';
  const m = /\.(jpe?g|png|webp|gif|svg)(\?|$)/i.exec(url);
  if (m) return m[1].toLowerCase().replace('jpeg', 'jpg');
  return 'jpg';
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let cursor;
  let localized = 0, waybacked = 0, cleared = 0, alreadyLocal = 0;

  do {
    const res = await notion.databases.query({
      database_id: DB,
      filter: { property: 'Status', select: { equals: 'approved' } },
      start_cursor: cursor,
      page_size: 50,
    });
    cursor = res.has_more ? res.next_cursor : undefined;

    for (const page of res.results) {
      const title = page.properties.Title?.title?.[0]?.plain_text || '?';
      const short = title.slice(0, 50);
      const url = page.properties.Thumbnail?.url;

      if (!url) { continue; }
      if (url.startsWith('/images/') || url.startsWith('/')) { alreadyLocal++; continue; }

      // Skip obviously non-image hosts we cannot or should not fetch
      let source = url;
      let resp = null;
      try {
        resp = await fetchImage(source);
      } catch (err) {
        resp = null;
      }

      // Dead? try Wayback
      if ((!resp || !resp.ok || !(resp.headers.get('content-type') || '').startsWith('image/'))) {
        const wb = await waybackFor(source);
        if (wb) {
          try {
            resp = await fetch(wb, { headers: UA, signal: AbortSignal.timeout(30000) });
            if (resp.ok && (resp.headers.get('content-type') || '').startsWith('image/')) {
              waybacked++;
              console.log(`↩ wayback: ${short}`);
            } else {
              resp = null;
            }
          } catch { resp = null; }
        }
      }

      if (!resp || !resp.ok) {
        await notion.pages.update({ page_id: page.id, properties: { Thumbnail: { url: null } } });
        cleared++;
        console.log(`✗ cleared (no recovery): ${short}`);
        continue;
      }

      try {
        const type = resp.headers.get('content-type') || '';
        const ext = extFromType(type, source);
        const buf = Buffer.from(await resp.arrayBuffer());
        if (buf.length < 500) throw new Error(`too small (${buf.length}b)`);
        if (buf.length > 3 * 1024 * 1024) throw new Error(`too large (${Math.round(buf.length / 1024)}KB)`);

        const filename = `${page.id}.${ext}`;
        fs.writeFileSync(path.join(OUT_DIR, filename), buf);
        await notion.pages.update({
          page_id: page.id,
          properties: { Thumbnail: { url: `/images/thumbnails/${filename}` } },
        });
        localized++;
        console.log(`✓ ${filename} (${Math.round(buf.length / 1024)}KB) ${short}`);
      } catch (err) {
        cleared++;
        await notion.pages.update({ page_id: page.id, properties: { Thumbnail: { url: null } } });
        console.log(`✗ cleared (${err.message}): ${short}`);
      }
    }
  } while (cursor);

  console.log(`\nDone. localized=${localized} via-wayback=${waybacked} cleared=${cleared} already-local=${alreadyLocal}`);
})();
