const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const parentPageId = '32d93bb0cb5b80bd9325cb30ab732cb0';

const postsProperties = {
  Title: { title: {} },
  Excerpt: { rich_text: {} },
  Content: { rich_text: {} },
  Category: {
    select: {
      options: [
        { name: 'AI News' },
        { name: 'Guides' }
      ]
    }
  },
  Status: {
    select: {
      options: [
        { name: 'pending' },
        { name: 'approved' },
        { name: 'rejected' }
      ]
    }
  },
  Date: { date: {} },
  Author: { rich_text: {} },
};

const productsProperties = {
  Title: { title: {} },
  Description: { rich_text: {} },
  Category: { rich_text: {} },
  Price: { rich_text: {} },
  Image: { url: {} },
  Gradient: { rich_text: {} },
  Status: {
    select: {
      options: [
        { name: 'pending' },
        { name: 'approved' },
        { name: 'rejected' }
      ]
    }
  },
  Date: { date: {} },
};

async function createDatabases() {
  try {
    console.log('Creating Posts database...');
    const postsDb = await notion.databases.create({
      parent: { page_id: parentPageId },
      title: [
        {
          type: 'text',
          text: {
            content: 'Posts'
          }
        }
      ],
      properties: postsProperties,
    });
    console.log('Posts database created. ID:', postsDb.id);

    console.log('Creating Products database...');
    const productsDb = await notion.databases.create({
      parent: { page_id: parentPageId },
      title: [
        {
          type: 'text',
          text: {
            content: 'Products'
          }
        }
      ],
      properties: productsProperties,
    });
    console.log('Products database created. ID:', productsDb.id);

    console.log('\nAdd these to Vercel environment variables:');
    console.log('NOTION_POSTS_DB_ID =', postsDb.id);
    console.log('NOTION_PRODUCTS_DB_ID =', productsDb.id);
  } catch (error) {
    console.error('Error creating databases:', error.body || error.message);
    process.exit(1);
  }
}

createDatabases();
