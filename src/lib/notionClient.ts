import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export function getPostsDatabaseId(): string {
  const id = process.env.NOTION_POSTS_DB_ID
  if (!id) throw new Error('Missing NOTION_POSTS_DB_ID')
  return id
}

export function getProductsDatabaseId(): string {
  const id = process.env.NOTION_PRODUCTS_DB_ID
  if (!id) throw new Error('Missing NOTION_PRODUCTS_DB_ID')
  return id
}

// Ensure we have the database
export async function validateDatabase(databaseId: string) {
  try {
    return await notion.databases.retrieve({ database_id: databaseId })
  } catch (error) {
    console.error('Failed to retrieve Notion database:', error)
    throw error
  }
}

// Query posts
export async function queryPosts(filter: any, sorts: any[] = [{ property: 'Date', direction: 'descending' as const }]) {
  const dbId = getPostsDatabaseId()
  const response = await notion.databases.query({
    database_id: dbId,
    filter,
    sorts,
  })
  return response.results
}

// Query products
export async function queryProducts(filter: any, sorts: any[] = [{ property: 'Title', direction: 'descending' as const }]) {
  const dbId = getProductsDatabaseId()
  const response = await notion.databases.query({
    database_id: dbId,
    filter,
    sorts,
  })
  return response.results
}

// Create a post page
export async function createPostPage(properties: any) {
  const dbId = getPostsDatabaseId()
  return notion.pages.create({
    parent: { database_id: dbId },
    properties,
  })
}

// Create a product page
export async function createProductPage(properties: any) {
  const dbId = getProductsDatabaseId()
  return notion.pages.create({
    parent: { database_id: dbId },
    properties,
  })
}

// Update a page (used for approval)
export async function updatePage(pageId: string, properties: any) {
  return notion.pages.update({
    page_id: pageId,
    properties,
  })
}

// Helper to convert Notion page to BlogPost type
export function notionPageToBlogPost(page: any): any {
  const props = page.properties
  const getText = (prop: any) => {
    if (!prop) return ''
    if (prop.title) return prop.title[0]?.plain_text || ''
    if (prop.rich_text) return prop.rich_text[0]?.plain_text || ''
    if (prop.number) return prop.number.toString()
    if (prop.select) return prop.select.name
    if (prop.date) return prop.date.start
    return ''
  }

  const title = getText(props.Title)
  // Derive categorySlug from Category
  const category = getText(props.Category)
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-')

  return {
    id: page.id,
    title,
    excerpt: getText(props.Excerpt),
    category,
    categorySlug,
    date: getText(props.Date) || new Date().toISOString().split('T')[0],
    status: getText(props.Status).toLowerCase() as 'pending' | 'approved' | 'rejected',
    author: getText(props.Author) || 'BlockFrameLabs',
    content: getText(props.Content) || '',
  }
}

// Helper to convert Notion page to MarketplaceProduct
export function notionPageToProduct(page: any): any {
  const props = page.properties
  const getText = (prop: any) => {
    if (!prop) return ''
    if (prop.title) return prop.title[0]?.plain_text || ''
    if (prop.rich_text) return prop.rich_text[0]?.plain_text || ''
    if (prop.url) return prop.url
    if (prop.select) return prop.select.name
    return ''
  }

  const title = getText(props.Title)
  return {
    id: page.id,
    title,
    description: getText(props.Description),
    category: getText(props.Category),
    price: getText(props.Price),
    image: getText(props.Image) || '/images/placeholder.png',
    gradient: getText(props.Gradient) || 'from-primary/30 to-primary-dark/30',
  }
}
