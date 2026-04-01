import { Client } from '@notionhq/client'
import type { Block, BlogPost, MarketplaceProduct } from './types'

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

// Helper to generate a simple block id if missing
const generateBlockId = (): string => `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Parse raw content (from Notion) into blocks array
export function parseBlocks(raw: string): Block[] {
  let blocks: Block[] = []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      blocks = parsed.map((b: any, idx: number) => ({
        id: b.id || generateBlockId(),
        type: b.type || 'text',
        content: b.content || '',
        order: b.order ?? idx,
      }))
      return blocks
    }
  } catch (e) {
    // Not JSON; fallback
  }
  // Fallback: single text block
  return [{
    id: generateBlockId(),
    type: 'text',
    content: raw,
    order: 0,
  }]
}

// Serialize blocks array to JSON string for storage in Notion Content property
export function serializeBlocks(blocks: Block[]): string {
  return JSON.stringify(blocks)
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

// Update a post page
export async function updatePostPage(pageId: string, properties: any) {
  return notion.pages.update({
    page_id: pageId,
    properties,
  })
}

// Retrieve a single post page by ID
export async function retrievePostPage(pageId: string): Promise<any> {
  return await notion.pages.retrieve({ page_id: pageId })
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

// Fetch a post and ensure blocks are populated, optionally fetching children if Content empty
export async function fetchBlogPostWithBlocks(pageId: string): Promise<BlogPost> {
  const page = await retrievePostPage(pageId)
  const props = page.properties

  // Compute rawContent from Content property (concatenate all rich_text parts)
  const rawContent = props.Content && props.Content.rich_text && Array.isArray(props.Content.rich_text)
    ? props.Content.rich_text.map((t: any) => t.plain_text).join('')
    : ''

  let blocks: Block[] = []
  if (rawContent) {
    blocks = parseBlocks(rawContent)
  }

  // If Content empty, fetch child blocks from Notion
  if (blocks.length === 0) {
    // console.log(`[INFO] Content empty for ${pageId}, fetching child blocks...`)
    try {
      const childrenRes = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
      })
      blocks = childrenRes.results.map((block: any, idx: number) => {
        let type: Block['type'] = 'text'
        let content = ''

        switch (block.type) {
          case 'paragraph':
            type = 'text'
            content = block.paragraph.rich_text.map((t: any) => t.plain_text).join('')
            break
          case 'heading_1':
          case 'heading_2':
          case 'heading_3':
            // Preserve heading level with markdown prefix
            type = 'text'
            const level = block.type === 'heading_1' ? '# ' : block.type === 'heading_2' ? '## ' : '### '
            content = level + block[block.type].rich_text.map((t: any) => t.plain_text).join('')
            break
          case 'bulleted_list_item':
          case 'numbered_list_item':
            type = 'text'
            content = '- ' + block[block.type].rich_text.map((t: any) => t.plain_text).join('')
            break
          case 'image':
            type = 'image'
            const img = block.image
            content = img.type === 'external' ? img.external.url : img.file.url
            break
          case 'video':
            type = 'video'
            const vid = block.video
            content = vid.type === 'external' ? vid.external.url : vid.file.url
            break
          case 'code':
            type = 'text'
            content = block.code.rich_text.map((t: any) => t.plain_text).join('')
            break
          case 'divider':
            content = '---'
            break
          case 'bookmark':
          case 'embed':
          case 'link_preview':
            type = 'html'
            content = `<!-- ${block.type} block -->`
            break
          default:
            // Unsupported block types become HTML placeholder
            type = 'html'
            content = `<!-- Unsupported block type: ${block.type} -->`
        }

        return {
          id: block.id,
          type,
          content,
          order: idx,
        }
      }).filter(b => b.content && b.content.length > 0)
    } catch (err) {
      console.warn('Failed to fetch child blocks for', pageId, err)
    }
  }

  // Build BlogPost
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
  const category = getText(props.Category)
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
  const excerpt = getText(props.Excerpt) || ''
  const date = getText(props.Date) || new Date().toISOString().split('T')[0]
  const status = getText(props.Status).toLowerCase() as 'pending' | 'approved' | 'rejected'
  const author = getText(props.Author) || 'BlockFrameLabs'

  const contentString = blocks
    .filter(b => b.type === 'text' || b.type === 'markdown')
    .map(b => b.content)
    .join('\n\n')

  return {
    id: page.id,
    title,
    excerpt,
    category: category as 'AI News' | 'Guides',
    categorySlug,
    date,
    status,
    author,
    blocks,
    content: contentString,
  }
}

// Helper to convert Notion page to BlogPost type (legacy; uses Content property only)
export function notionPageToBlogPost(page: any): BlogPost {
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
  const category = getText(props.Category)
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
  // For Content property, concatenate all rich_text parts to handle multi-paragraph storage
  const rawContent = props.Content && props.Content.rich_text && Array.isArray(props.Content.rich_text)
    ? props.Content.rich_text.map((t: any) => t.plain_text).join('')
    : (getText(props.Content) || '')

  const blocks: Block[] = parseBlocks(rawContent)

  // Backward compatible content string: concatenate text and markdown blocks
  const contentString = blocks
    .filter(b => b.type === 'text' || b.type === 'markdown')
    .map(b => b.content)
    .join('\n\n')

  return {
    id: page.id,
    title,
    excerpt: getText(props.Excerpt) || '',
    category: category as 'AI News' | 'Guides',
    categorySlug,
    date: getText(props.Date) || new Date().toISOString().split('T')[0],
    status: getText(props.Status).toLowerCase() as 'pending' | 'approved' | 'rejected',
    author: getText(props.Author) || 'BlockFrameLabs',
    blocks,
    content: contentString,
  }
}

// Helper to convert Notion page to MarketplaceProduct
export function notionPageToProduct(page: any): MarketplaceProduct {
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
