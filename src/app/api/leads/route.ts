import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID

function sanitize(value: string): string {
  return value.trim().slice(0, 2000)
}

export async function POST(req: NextRequest) {
  try {
    if (!LEADS_DB_ID) {
      console.error('Missing NOTION_LEADS_DB_ID')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const body = await req.json()
    const { name, workspace, email, message, _hp } = body

    // Server-side honeypot check
    if (_hp) {
      // Bot detected — silently accept but don't process
      return NextResponse.json({ ok: true })
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Rate limiting: simple in-memory check (resets on deploy)
    // For production, use a proper rate limiter like upstash/ratelimit

    const properties: Record<string, any> = {
      Name: {
        title: [{ type: 'text', text: { content: sanitize(name) } }],
      },
      Email: {
        rich_text: [{ type: 'text', text: { content: sanitize(email) } }],
      },
      'Project description': {
        rich_text: [{ type: 'text', text: { content: sanitize(message) } }],
      },
      Date: {
        date: { start: new Date().toISOString().split('T')[0] },
      },
      Source: {
        select: { name: 'Website' },
      },
      Status: {
        select: { name: 'New' },
      },
    }

    if (workspace) {
      properties.Workspace = {
        rich_text: [{ type: 'text', text: { content: sanitize(workspace) } }],
      }
    }

    await notion.pages.create({
      parent: { database_id: LEADS_DB_ID },
      properties,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
