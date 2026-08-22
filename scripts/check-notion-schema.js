// Inspect the Posts DB schema + sample a few rows for Thumbnail/images
const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;

(async () => {
  const db = await notion.databases.retrieve({ database_id: DB });
  console.log('PROPERTIES:', Object.keys(db.properties).join(', '));
  console.log('has Thumbnail:', 'Thumbnail' in db.properties);

  const res = await notion.databases.query({
    database_id: DB,
    filter: { property: 'Status', select: { equals: 'approved' } },
    page_size: 5,
  });
  for (const page of res.results) {
    const p = page.properties;
    const title = p.Title?.title?.[0]?.plain_text || '?';
    // peek at Content property shape
    const raw = (p.Content?.rich_text || []).map(t => t.plain_text).join('');
    let shape = 'empty';
    if (raw.startsWith('[{')) {
      try { const j = JSON.parse(raw); shape = `block-json(${j.length} blocks, types: ${[...new Set(j.map(b=>b.type))].join('/')})`; }
      catch { shape = 'unparsable'; }
    } else if (raw) { shape = `plain-text(${raw.length} chars)`; }
    console.log(`- ${title.slice(0, 50)} | content: ${shape}`);
  }

  // Check one post's child blocks for images
  if (res.results[0]) {
    const children = await notion.blocks.children.list({ block_id: res.results[0].id, page_size: 100 });
    const types = {};
    for (const b of children.results) types[b.type] = (types[b.type] || 0) + 1;
    console.log('first post child block types:', JSON.stringify(types));
  }
})();
