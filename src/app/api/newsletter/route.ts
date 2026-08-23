import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

// Newsletter signup from the blog sidebar.
//
// Writes into the existing Leads database (NOTION_LEADS_DB_ID) with
// Source = "Blog" so signups are separable from contact-form leads without a
// new database. Reuses the Leads schema exactly:
//   Name (title), Email (rich_text), 'Project description' (rich_text),
//   Date (date), Source (select), Status (select).
// If NOTION_NEWSLETTER_DB_ID is set, it wins — lets Sergeo split the stream
// later by creating a dedicated database and adding the env var in Vercel.

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID
const NEWSLETTER_DB_ID = process.env.NOTION_NEWSLETTER_DB_ID

const RATE_LIMIT_MS = 60 * 1000
const lastHitByIp = new Map<string, number>()

function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  try {
    if (!LEADS_DB_ID && !NEWSLETTER_DB_ID) {
      console.error('Missing NOTION_LEADS_DB_ID and NOTION_NEWSLETTER_DB_ID')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Simple per-IP throttle: 1 signup per minute per IP.
    const ip = clientIp(req)
    const now = Date.now()
    const last = lastHitByIp.get(ip) || 0
    if (now - last < RATE_LIMIT_MS) {
      return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 })
    }
    lastHitByIp.set(ip, now)
    // Keep the map bounded.
    if (lastHitByIp.size > 1000) {
      for (const [k, v] of lastHitByIp) {
        if (now - v > 10 * 60 * 1000) lastHitByIp.delete(k)
      }
    }

    const body = await req.json()
    const { email, _hp } = body

    // Server-side honeypot check: silently accept so bots learn nothing.
    if (_hp) {
      return NextResponse.json({ ok: true, message: "You're on the list." })
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase().slice(0, 200)
    const today = new Date().toISOString().split('T')[0]

    if (NEWSLETTER_DB_ID) {
      // Dedicated newsletter database: minimal schema, Name = email.
      await notion.pages.create({
        parent: { database_id: NEWSLETTER_DB_ID },
        properties: {
          Name: { title: [{ type: 'text', text: { content: cleanEmail } }] },
          Email: { rich_text: [{ type: 'text', text: { content: cleanEmail } }] },
          Date: { date: { start: today } },
          Status: { select: { name: 'Subscribed' } },
        },
      })
    } else {
      // Leads database with Source = "Blog".
      await notion.pages.create({
        parent: { database_id: LEADS_DB_ID! },
        properties: {
          Name: {
            title: [{ type: 'text', text: { content: `Newsletter: ${cleanEmail}` } }],
          },
          Email: {
            rich_text: [{ type: 'text', text: { content: cleanEmail } }],
          },
          'Project description': {
            rich_text: [
              { type: 'text', text: { content: `Blog newsletter signup on ${today}` } },
            ],
          },
          Date: { date: { start: today } },
          Source: { select: { name: 'Blog' } },
          Status: { select: { name: 'New' } },
        },
      })
    }

    return NextResponse.json({
      ok: true,
      message: "You're on the list. Watch your inbox.",
    })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Could not subscribe right now. Try again.' },
      { status: 500 }
    )
  }
}
