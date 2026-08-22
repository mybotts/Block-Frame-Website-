// Final fallback: generate branded noir SVG thumbnails (category-labeled,
// deterministic per-post hue shift) for posts still without one, save as
// local assets, and set the Thumbnail property.
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'thumbnails');

const LABELS = {
  'ai-news': 'AI NEWS',
  guides: 'GUIDES',
  educational: 'EDUCATIONAL',
};

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function hashHue(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

function makeSvg(label, hue) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="g" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="hsla(${hue}, 100%, 50%, 0.18)"/>
      <stop offset="100%" stop-color="hsla(${hue}, 100%, 50%, 0)"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050505" stop-opacity="0"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0c0e"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect y="470" width="1200" height="160" fill="url(#fade)"/>
  <text x="60" y="330" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="44" letter-spacing="14" fill="rgba(0,240,255,0.75)">${esc(label)}</text>
  <text x="60" y="560" font-family="system-ui, sans-serif" font-size="22" fill="rgba(227,226,226,0.5)">BLOCKFRAME LABS</text>
  <rect x="60" y="360" width="80" height="2" fill="rgba(0,240,255,0.6)"/>
</svg>`;
}

(async () => {
  let cursor;
  let made = 0;

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
      const category = (page.properties.Category?.select?.name || 'blog').toLowerCase().replace(/\s+/g, '-');
      const label = LABELS[category] || 'BLOG';
      const hue = hashHue(title);

      const filename = `${page.id}.svg`;
      fs.writeFileSync(path.join(OUT_DIR, filename), makeSvg(label, hue));
      await notion.pages.update({
        page_id: page.id,
        properties: { Thumbnail: { url: `/images/thumbnails/${filename}` } },
      });
      made++;
      console.log(`✓ ${filename} [${label} h=${hue}] ${title.slice(0, 50)}`);
    }
  } while (cursor);

  console.log(`\ngenerated ${made} branded thumbnails`);
})();
