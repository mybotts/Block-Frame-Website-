// One-time: add "Thumbnail" (url) property to the Posts database
const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_POSTS_DB_ID;

(async () => {
  const db = await notion.databases.retrieve({ database_id: DB });
  if ('Thumbnail' in db.properties) {
    console.log('Thumbnail property already exists');
    return;
  }
  await notion.databases.update({
    database_id: DB,
    properties: { Thumbnail: { url: {} } },
  });
  console.log('Created Thumbnail (url) property');
})();
