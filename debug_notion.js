const { Client } = require('@notionhq/client');
const fs = require('fs');

const env = fs.readFileSync('/data/workspace/hermes-agents/daniel/workspace/site/.env.local', 'utf8');
const tokenMatch = env.match(/NOTION_TOKEN=(.+)/);
const dbMatch = env.match(/NOTION_POSTS_DB_ID=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';
const dbId = dbMatch ? dbMatch[1].trim() : '';

const notion = new Client({ auth: token });

(async () => {
  // Step 1: Query latest post
  const res = await notion.databases.query({
    database_id: dbId,
    sorts: [{ property: 'Date', direction: 'descending' }],
  });
  const page = res.results[0];
  const title = page.properties.Title?.title?.[0]?.plain_text || 'untitled';
  console.log('Post:', title, '| ID:', page.id);

  // Step 2: Check Content property
  const rawContent = page.properties.Content?.rich_text?.map(t => t.plain_text).join('') || '';
  console.log('Content property raw:', JSON.stringify(rawContent.substring(0, 200)));
  console.log('Content length:', rawContent.length);

  // Step 3: Fetch child blocks
  const children = await notion.blocks.children.list({ block_id: page.id });
  console.log('Child blocks count:', children.results.length);

  for (const child of children.results) {
    if (child.type === 'image') {
      console.log('\n--- IMAGE BLOCK ---');
      console.log('Full:', JSON.stringify(child).substring(0, 800));
    }
    if (child.type === 'video') {
      console.log('\n--- VIDEO BLOCK ---');
      console.log('Full:', JSON.stringify(child).substring(0, 800));
    }
    if (child.type === 'heading_1') {
      const txt = child.heading_1?.rich_text?.map(t => t.plain_text).join('');
      console.log('H1:', txt);
    }
  }

  // Step 4: Also check the second post
  const page2 = res.results[1];
  const title2 = page2.properties.Title?.title?.[0]?.plain_text || 'untitled';
  console.log('\n\nPost 2:', title2, '| ID:', page2.id);
  const raw2 = page2.properties.Content?.rich_text?.map(t => t.plain_text).join('') || '';
  console.log('Content property raw:', JSON.stringify(raw2.substring(0, 200)));
  console.log('Content length:', raw2.length);

  const children2 = await notion.blocks.children.list({ block_id: page2.id });
  console.log('Child blocks count:', children2.results.length);
  for (const child of children2.results) {
    if (child.type === 'image') {
      console.log('\n--- IMAGE BLOCK ---');
      console.log('Full:', JSON.stringify(child).substring(0, 800));
    }
    if (child.type === 'video') {
      console.log('\n--- VIDEO BLOCK ---');
      console.log('Full:', JSON.stringify(child).substring(0, 800));
    }
  }
})().catch(e => console.error('ERROR:', e.message));
