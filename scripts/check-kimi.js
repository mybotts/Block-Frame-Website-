// Find the Kimi K3 post and show its thumbnail
const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });

(async () => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DB_ID,
    filter: { property: 'Status', select: { equals: 'approved' } },
    page_size: 100,
  });
  for (const p of res.results) {
    const title = p.properties.Title?.title?.[0]?.plain_text || '';
    if (/kimi|k3/i.test(title)) {
      console.log('title:', title);
      const thumb = p.properties.Thumbnail?.url || 'NONE';
      console.log('thumbnail:', thumb.slice(0, 160));
      const children = await notion.blocks.children.list({ block_id: p.id, page_size: 100 });
      const types = {};
      let firstImage = null;
      for (const b of children.results) {
        types[b.type] = (types[b.type] || 0) + 1;
        if (!firstImage && b.type === 'image') {
          firstImage = b.image?.type === 'external' ? b.image.external?.url : b.image?.file?.url;
        }
      }
      console.log('block types:', JSON.stringify(types));
      console.log('first image block:', (firstImage || 'none').slice(0, 140));
    }
  }
})();
