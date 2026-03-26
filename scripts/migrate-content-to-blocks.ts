/**
 * Migration utility: convert existing Notion posts that use plain text Content
 * to the new multi-block JSON format.
 *
 * This script will:
 * - Query all pages from the Posts database
 * - For each page, read the Content property
 * - If Content is not valid JSON, convert it to a single text block
 * - Update the page with the new Content (as JSON string)
 *
 * Usage:
 *   1. Ensure NOTION_TOKEN, NOTION_POSTS_DB_ID are set in environment
 *   2. Run: npx tsx scripts/migrate-content-to-blocks.ts
 *
 * This script is idempotent; running multiple times is safe.
 */

import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'

dotenv.config()

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const getPostsDatabaseId = () => {
  const id = process.env.NOTION_POSTS_DB_ID
  if (!id) throw new Error('Missing NOTION_POSTS_DB_ID')
  return id
}

const serializeBlocks = (blocks: any[]) => JSON.stringify(blocks)

const migrate = async () => {
  const dbId = getPostsDatabaseId()
  console.log(`Querying database ${dbId}...`)

  let cursor: string | undefined = undefined
  let total = 0
  let updated = 0

  do {
    const response = await notion.databases.query({
      database_id: dbId,
      page_size: 100,
      ...(cursor && { start_cursor: cursor }),
    })
    const pages = response.results as any[]
    total += pages.length

    for (const page of pages) {
      const props = page.properties
      const contentProp = props.Content as any
      if (!contentProp) continue

      const rawText = contentProp.rich_text[0]?.plain_text || ''
      if (!rawText) continue

      // If already JSON array, skip
      try {
        const parsed = JSON.parse(rawText)
        if (Array.isArray(parsed)) {
          continue
        }
      } catch {
        // Not JSON - will migrate
      }

      // Create a single text block
      const blocks = [
        {
          type: 'text',
          content: rawText,
          order: 0,
          id: `migrated-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        },
      ]

      const newContent = serializeBlocks(blocks)

      await notion.pages.update({
        page_id: page.id,
        properties: {
          Content: { rich_text: [{ text: { content: newContent } }] },
        },
      })

      updated++
      console.log(`Updated page ${page.id}`)
    }

    cursor = response.next_cursor as string | undefined
  } while (cursor)

  console.log(`Migration complete. Total pages processed: ${total}, updated: ${updated}.`)
}

migrate().catch(console.error)
