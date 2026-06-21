# BlockFrame Labs — Company Reference Document

**Version:** 2026-06-21  
**Audience:** All BlockFrame Labs agents (Daniel, Roy, Hans, Rex, SEO Consultant, Michael)  
**Purpose:** Single source of truth for company info, services, products, processes, and operational details.

---

## Table of Contents

1. [Company Overview](#1-company-overview)
2. [Brand Guidelines](#2-brand-guidelines)
3. [Website & Technical Stack](#3-website--technical-stack)
4. [Services — Full Catalog](#4-services--full-catalog)
5. [Marketplace Products](#5-marketplace-products)
6. [Process: How We Work](#6-process-how-we-work)
7. [Blog & Content System](#7-blog--content-system)
8. [Contact & Lead Capture](#8-contact--lead-capture)
9. [Social Media Links](#9-social-media-links)
10. [Agent Roster & Responsibilities](#10-agent-roster--responsibilities)
11. [Key URLs & Paths](#11-key-urls--paths)
12. [Operational Conventions](#12-operational-conventions)

---

## 1. Company Overview

**Company Name:** BlockFrame Labs  
**Tagline:** "AI systems and services that do real work."  
**Positioning:** AI agency for practical automation. We build and deploy AI systems and services that handle support, content, and operations, so your team can focus on the decisions that actually need a human.  
**Domain:** [blockframe.cloud](https://www.blockframe.cloud)  
**CEO:** Sergeo  
**Target:** $50k revenue EOY 2026

### What We Do

BlockFrame Labs builds AI systems and services, web platforms, and content systems for teams that need working infrastructure, not slide decks. We audit existing workflows, productize repeatable solutions, and deploy them into real operations. Every system is packaged as a product with clear inputs, outputs, and pricing.

### Values

- Ship fast, measure real usage
- Docs as product
- No meetings unless blocking
- Concise, outcome-oriented, client-first voice

---

## 2. Brand Guidelines

### Voice & Tone
- Concise, technical, opinionated when useful
- Outcome-oriented, client-first
- No em dashes in prose copy (use commas or rephrase)
- "AI systems and services" — never "AI agents" in marketing copy

### Visual Identity
- Dark theme: deep navy/black backgrounds (#06070a, #07090d, #080b10)
- Accent colors: electric blue, cyan, violet
- Gradient-first UI with glass-card effects
- Framer Motion animations (inertial scrolling, magnetic cursor, liquid transitions)
- Professional, tech-forward, premium SaaS aesthetic

### Logo
- Stored at `/public/images/logo.png`
- White logo on dark backgrounds
- Rounded rectangle format (11x11 in footer, 10x10 in nav)

---

## 3. Website & Technical Stack

### Stack
- **Framework:** Next.js 14+ (App Router) with Turbopack
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **CMS:** Notion (headless, via API)
- **Deployment:** Vercel (auto-deploy from GitHub main branch)
- **Repository:** [github.com/mybotts/Block-Frame-Website-](https://github.com/mybotts/Block-Frame-Website-)
- **Local Dev Port:** 3101

### Key File Paths
| Purpose | Path |
|---|---|
| All content data | `src/lib/data.ts` |
| Type definitions | `src/lib/types.ts` |
| Homepage | `src/app/page.tsx` |
| Navigation | `src/components/Navigation.tsx` |
| Footer | `src/components/Footer.tsx` |
| Services section | `src/components/Services.tsx` |
| Blog pages | `src/app/blogs/`, `src/app/post/[id]/` |
| Videos page | `src/app/videos/` |
| Marketplace listing | `src/app/marketplace/products/page.tsx` |
| Marketplace detail pages | `src/app/marketplace/products/[slug]/page.tsx` |
| AI News page | `src/app/ai-news/` |
| Guides page | `src/app/guides/` |
| Lead capture API | `src/app/api/leads/route.ts` |
| Blog posts API | `src/app/api/posts/` |
| Products API | `src/app/api/products/route.ts` |
| Public images | `public/images/` |

### Build & Deploy
```bash
cd site/
npm run build        # Must pass before any delivery
git add -A
git commit -m "feat: description"
git push origin main # Triggers Vercel auto-deploy
```

### Content Data Model
All services, products, and blog posts live in `src/lib/data.ts`. To add content:
- **Services:** Append to `services[]` array
- **Marketplace Products:** Append to `marketplaceProducts[]` array
- **Blog Posts:** Append to `samplePosts[]` array (status: "approved" to publish)

---

## 4. Services — Full Catalog

Services are organized into four teams. Six are featured on the homepage as priority services.

### AI & Automation Team

#### AI Systems Deployment (priority)
- **ID:** `ai-systems`
- **Homepage blurb:** "AI systems and services for support, data, and operations."
- **Full description:** We build and deploy AI systems that handle real tasks, from customer support to data pipelines. You get a working system, not a prototype.
- **Image:** `/images/ai-agent-development.png`

#### Voice Agent Service (priority) — NEW
- **ID:** `voice-agent`
- **Homepage blurb:** "24/7 voice AI that answers calls, qualifies callers, and books meetings."
- **Full description:** We install a voice AI agent on your website or business that runs 24/7. It knows your business, answers calls, and books meetings and sessions based on your provided schedule.
- **Image:** `/images/voice-agent.png`
- **Marketplace page:** `/marketplace/products/voice-agent-24-7`

#### Local AI Systems
- **ID:** `ai-agents-local`
- **Description:** Run AI systems on your own servers. Full control over your data, no third-party API costs, no rate limits. We handle the installation, configuration, and training.

#### Cloud-Based AI Systems
- **ID:** `ai-agents-cloud`
- **Description:** Managed AI systems that run 24/7 on reliable infrastructure. We handle scaling, monitoring, and updates so you can focus on results.

#### Automation Systems
- **ID:** `autonomous-systems`
- **Description:** Multi-system workflows that coordinate, make decisions, and execute tasks with minimal human oversight. Built for operations that need to run themselves.

#### Managed AI Services (priority)
- **ID:** `managed-agent-services`
- **Homepage blurb:** "We run and maintain your systems. You get the results."
- **Full description:** We operate your AI systems as a service. No setup, no maintenance. You subscribe to outcomes. We handle the infrastructure, updates, and reliability.
- **Image:** `/images/managed-agent-services.png`

#### Custom AI Development
- **ID:** `specialized-agent-dev`
- **Description:** Purpose-built AI systems designed around your specific workflows. We build, deploy, and continuously improve systems that fit how your team actually works.

### Engineering Team

#### Web & App Engineering (priority)
- **ID:** `web-apps`
- **Homepage blurb:** "Full-stack web platforms and mobile apps, built to scale."
- **Full description:** Full-stack development of web platforms and mobile apps. Built for performance, security, and the kind of user experience that keeps people coming back.
- **Image:** `/images/uiux-design.png`

### Content & Creative Team

#### Motion Graphics & VFX
- **ID:** `motion-graphics`
- **Description:** Motion graphics that explain complex products in seconds. We turn technical features into visual stories that convert viewers into customers.

#### Video Ad Production
- **ID:** `ads-video`
- **Description:** Short-form video ads engineered for TikTok, YouTube Shorts, and Instagram. Built to stop the scroll and drive measurable acquisition.

#### UGC & Explainer Videos (priority)
- **ID:** `ugc-video-production`
- **Homepage blurb:** "UGC, explainers, and video ads. From script to publish."
- **Full description:** Long and short-form video content that builds trust. From scripted product demos to authentic creator-style content, produced for YouTube, TikTok, and your sales funnel.
- **Image:** `/images/ugc-video-production.png`

### Growth & Marketing Team

#### Social Media Systems (priority)
- **ID:** `social-media`
- **Homepage blurb:** "Content systems and posting infrastructure that runs itself."
- **Full description:** We build the content systems and posting infrastructure that keep your social channels active and growing, without requiring daily manual effort.
- **Image:** `/images/social-media.png`

#### Paid Ad Campaigns
- **ID:** `social-ads-campaigns`
- **Description:** Data-backed ad campaigns across TikTok, Instagram, YouTube, and X. We handle creative production, targeting, budget optimization, and reporting.

---

## 5. Marketplace Products

Four productized systems are available in the marketplace. Each has a detail page, three engagement tiers, and structured data markup.

### Voice Agent: 24/7 AI Phone Assistant, Call Handler & Meeting Booker
- **Slug:** `/marketplace/products/voice-agent-24-7`
- **Category:** AI Systems
- **Badge:** New
- **Price:** Custom pricing
- **CTA:** Book implementation call
- **Image:** `/images/voice-agent.png` | **OG:** `/images/voice-agent-og.png`
- **Description:** A voice AI agent installed for your business that runs 24/7. It learns your services, answers inbound calls, qualifies callers, and books meetings or sessions directly into your calendar based on your provided schedule.
- **Highlights:**
  - Runs 24/7 on your website or phone line — never sleeps, never misses a call
  - Learns your business, services, pricing, and FAQs so it answers like a real team member
  - Books meetings, consultations, and sessions directly into your calendar based on your real-time availability
  - Call screening, qualification, and routing — only hot leads and confirmed bookings reach you
- **Engagement Tiers:**
  - **Voice Agent Blueprint** — Complete setup guide, call flow templates, prompt libraries, and integration docs so you or your team can deploy it yourself.
  - **Build Sprint** — We configure the voice agent with your business knowledge, call flows, calendar integration, and launch it on your phone line or website.
  - **Managed Voice Agent** — Monthly operation, call quality monitoring, knowledge base updates, and continuous improvement after launch.
- **Implementation Steps:**
  1. Discovery call: map your services, pricing, FAQs, call volume, current scheduling tool, and qualification criteria
  2. Knowledge base build: compile business knowledge, tone guidelines, objection-handling scripts, and escalation rules
  3. Calendar and telephony setup: connect scheduling tool and configure phone line or web voice widget
  4. Call flow design: build conversation flows for common call types
  5. Testing and launch: run test calls, refine responses, set daily caps and escalation thresholds
  6. Monitor and improve: review call recordings, booking rates, and caller feedback

### Proposal Led Agentic Outreach System
- **Slug:** `/marketplace/products/proposal-led-agentic-outreach`
- **Category:** Growth Automation
- **Badge:** Custom build
- **Price:** Custom pricing
- **CTA:** Book implementation call
- **Image:** `/images/agentic-outreach-engine.png`
- **Description:** A custom implementation that researches qualified prospects, creates personalized sample assets, publishes private proposal pages, and prepares controlled outreach through your existing CRM and mailbox.
- **Highlights:**
  - Built around your current mailbox, CRM, lead sources, and approval process
  - Includes send caps, dedupe, suppression lists, preview checks, and opt-out handling
  - Creates proof-led outreach with private proposal pages instead of generic cold pitches
- **Engagement Tiers:**
  - **Workflow Blueprint** — DIY operating map, templates, data model, prompts, and setup checklist
  - **Build Sprint** — We configure the prospecting, proposal, email queue, and safety workflow in your stack
  - **Managed System** — Monthly operation, iteration, reporting, and campaign improvements after launch

### Blog OS Automated Notion CMS Blog Publishing System
- **Slug:** `/marketplace/products/blog-os-automated-notion-cms`
- **Category:** Content Systems
- **Badge:** Build + Handoff
- **Price:** Custom pricing
- **CTA:** Request implementation
- **Image:** `/images/cms-content-pipelines.png`
- **Description:** A managed, Notion-backed editorial system that researches topics, drafts posts, manages approvals, and publishes finished content to your website on a reliable schedule.
- **Highlights:**
  - Uses Notion as the editorial source of truth with clear stage statuses
  - Covers research, drafting, review, scheduling, publishing, SEO metadata, and error recovery
  - Built for clients who want consistent publishing without manual copy-paste or scattered toolchains
- **Engagement Tiers:**
  - **One-Time Setup** — Builds the Notion schema, research pipeline, drafting workflow, approval stages, SEO rules, and publish hook to your site
  - **Monthly Care** — Covers ongoing editing, scheduling, publishing, light distribution, and system tuning after launch
  - **DIY Blueprint** — Schema, prompts, runbooks, and setup guide for clients to run the pipeline themselves

### Social Agent: AI Multi-Platform Posting, Engagement & Lead Qualification
- **Slug:** `/marketplace/products/social-agent-multi-platform`
- **Category:** Growth Systems
- **Badge:** Build + Management
- **Price:** Custom pricing
- **CTA:** Start Social Agent setup
- **Image:** `/images/social-agent.png`
- **Description:** An AI agent that posts content across 15 platforms, auto-replies to comments and messages, qualifies inbound leads, and improves over time. Built on the same systems BlockFrame Labs uses internally for its own distribution.
- **Highlights:**
  - Auto-posts to 15 platforms including X, LinkedIn, Instagram, TikTok, YouTube, Facebook, Threads, and more
  - Auto-replies to comments and DMs with brand-voiced, context-aware responses
  - Qualifies leads from social interactions, scores them, and routes to your CRM or inbox
  - Safety controls: daily caps, suppression lists, approval queues, and opt-out handling built in
- **Engagement Tiers:**
  - **DIY Blueprint** — Platform schemas, prompt templates, repurposing rules, reply workflows, setup guide, and recommended stack list
  - **Build Sprint** — We configure the agent's posting, threading, and reply flows for your brand voice, platforms, content types, and lead criteria
  - **Managed System** — Monthly operation, monitoring, continued tuning, lead distribution, and reporting after launch

---

## 6. Process: How We Work

Our process is summarized as **"Audit. Productize. Deploy."** with four concrete steps:

### Step 01: Audit your workflow
We map the work you are actually doing today. Where it breaks, where it takes too long, and which parts can be handled by an automated system without losing quality.

### Step 02: Productize the solution
We do not build one-off scripts. Every system is packaged as a repeatable product with clear inputs, outputs, and pricing. You know exactly what you are getting.

### Step 03: Deploy and validate
We connect the system to your real tools and data. We test with actual workflows, measure the results, and iterate until it performs reliably.

### Step 04: Operate or hand off
You choose: we run the system for you as a managed service, or we document everything and hand it over. Either way, you own the outcome.

---

## 7. Blog & Content System

### How Blog Posts Are Created
- All content is centralized in `src/lib/data.ts` under `samplePosts[]`
- Posts use a block-based content model (text, image, video, html, markdown, code, bookmark)
- Posts must have `status: "approved"` to appear on the public site
- Content is stored as child blocks in Notion, NOT in the Content property
- The system uses Notion as the editorial source of truth

### Blog Post Structure
```typescript
{
  id: "unique-id",
  title: "Post Title",
  excerpt: "Brief description...",
  category: "AI News",        // "AI News", "Guides", "Educational", "Tech"
  categorySlug: "ai-news",    // "ai-news", "guides", "educational", "tech"
  date: "2026-03-20",
  status: "approved",         // "pending" | "approved" | "rejected"
  author: "BlockFrameLabs",
  blocks: [...]
}
```

### Published Blog Posts (as of 2026-06-21)
| ID | Title | Category | Date |
|---|---|---|---|
| 1 | GPT-5 and the Future of Autonomous Agents | AI News | 2026-03-20 |
| 2 | DeepSeek V4: Open-Source Breakthrough in Reasoning | AI News | 2026-03-18 |
| 3 | The Rise of AI-Native Development Tools | AI News | 2026-03-15 |
| 4 | Building Your First AI Agent with LangChain | Guides | 2026-03-19 |
| 5 | AI Agent Reliability: The Complete Production Checklist | Guides | 2026-03-16 |
| 6 | Deploying Next.js at Scale with Edge Functions | Guides | 2026-03-12 |
| 8 | Understanding Neural Networks: A Visual Introduction | Educational | 2026-03-22 |
| 10 | What Are AI Agents: A Practical Breakdown | Educational | 2026-04-01 |
| 9 | Edge AI: Running Models on Resource-Constrained Devices | Tech | 2026-03-24 |

### Content Categories
- **AI News** (`ai-news`) — Industry news and analysis
- **Guides** (`guides`) — Step-by-step technical guides
- **Educational** (`educational`) — Explanatory content
- **Tech** (`tech`) — Technical deep-dives

---

## 8. Contact & Lead Capture

### Contact Email
- **Email:** `contact@blockframe.cloud`
- **Mailto link:** `mailto:contact@blockframe.cloud?subject=Project%20inquiry%20for%20BlockFrame%20Labs`

### Calendly
- **URL:** `https://calendly.com/blockframemedia/30min`

### Lead Capture Form
- **Endpoint:** `POST /api/leads`
- **Creates:** A page in the Notion "Leads" database
- **Fields captured:** Name, Email, Workspace, Project description
- **Auto-set fields:** Date (today), Source = "Website", Status = "New"
- **Spam protection:** Honeypot field (`_hp`) checked server-side + email validation
- **Notion DB ID:** `NOTION_LEADS_DB_ID` env var

---

## 9. Social Media Links

| Platform | URL |
|---|---|
| X (Twitter) | https://x.com/blockframelabs |
| TikTok | https://www.tiktok.com/@blockframe_labs?_r=1&_t=ZN-96Et1Hif4j8 |
| YouTube | https://youtube.com/@blockframelabs?si=Z2MnWDopzMohKjXd |
| Instagram | https://www.instagram.com/blockframelabs?igsh=MWtwYWQycHR3cXJlYw== |

---

## 10. Agent Roster & Responsibilities

| Agent | Role | Discord Bot ID | Channel ID |
|---|---|---|---|
| **Daniel** | Web Engineer | `1502209090703851530` | `1502216146680549386` |
| **Roy** | Website Content Specialist | `1502197102040584244` | `1489311270833230038` |
| **Hans** | Content Distribution | `1502320792761798666` | `1489311278433566972` |
| **Rex** | Sergeo's PA | `1502931856432304191` | `1503010099470270656` |
| **SEO Consultant** | SEO & AI Search | `1502704825110892757` | `1489311269654626408` |
| **Michael** | Video Production | `1502322486685990952` | `1514385284366864455` |
| **Sergeo** | CEO | — | — |

### Agent Responsibilities

**Daniel (Web Engineer)**
- Maintain the BlockframeLabs marketing website
- Build polished Next.js/React UI and web automations
- Support Notion/content publishing workflows
- Report through Hermes/Kanban/Discord

**Roy (Website Content Specialist)**
- Create and manage website content (blog posts, pages, updates)
- Publish content via Notion and the website pipeline
- Coordinate with Daniel on content placement

**Hans (Content Distribution)**
- Publish content to social platforms
- Schedule distribution for new blog posts and pages
- Coordinate with Daniel and Roy on content launches

**Rex (Sergeo's PA)**
- Coordinate tasks across agents
- Manage timelines and handoffs
- Relay priorities from Sergeo

**SEO Consultant (SEO & AI Search)**
- Technical SEO recommendations
- Structured data, meta tags, performance optimizations
- Audit findings and prioritization

**Michael (Video Production)**
- Produce video content for BlockframeLabs
- Coordinate with Daniel on video embedding and web delivery

---

## 11. Key URLs & Paths

### Public Website
| Page | URL |
|---|---|
| Homepage | https://www.blockframe.cloud |
| Blogs | https://www.blockframe.cloud/blogs |
| Videos | https://www.blockframe.cloud/videos |
| Marketplace | https://www.blockframe.cloud/marketplace/products |
| AI News | https://www.blockframe.cloud/ai-news |
| Guides | https://www.blockframe.cloud/guides |
| Voice Agent Product | https://www.blockframe.cloud/marketplace/products/voice-agent-24-7 |
| Proposal Outreach Product | https://www.blockframe.cloud/marketplace/products/proposal-led-agentic-outreach |
| Blog OS Product | https://www.blockframe.cloud/marketplace/products/blog-os-automated-notion-cms |
| Social Agent Product | https://www.blockframe.cloud/marketplace/products/social-agent-multi-platform |
| Book a Call | https://calendly.com/blockframemedia/30min |
| Contact Email | mailto:contact@blockframe.cloud |

### Internal Paths
| Purpose | Path |
|---|---|
| Site workspace | `/data/workspace/hermes-agents/daniel/workspace/site` |
| Data file | `site/src/lib/data.ts` |
| Images | `site/public/images/` |
| Marketplace pages | `site/src/app/marketplace/products/[slug]/page.tsx` |

---

## 12. Operational Conventions

### Communication Rules
- Always @mention the target agent by Discord bot user ID when sending or responding
- Send messages directly to the target agent's channel, not your own
- Respond to tagged messages from other agents in the channel
- No em dashes in prose copy

### Deployment Workflow
1. Make changes locally in `site/`
2. Run `npm run build` — must pass with no errors
3. `git add -A && git commit -m "feat: description"`
4. `git push origin main`
5. Vercel auto-deploys from main branch
6. Verify the live site after deployment

### Content Publishing Workflow
1. Roy creates content in Notion (child blocks, not Content property)
2. Daniel ensures the website displays it correctly
3. Hans schedules social distribution
4. SEO Consultant reviews for optimization opportunities

### Blog Post Publishing Rules
- Content goes in Notion child blocks (paragraphs, headings, images, videos)
- The Content property should remain empty
- Posts with plain-text Content property lose images/videos
- Status must be "approved" to appear on the public site

### Naming Conventions
- Service IDs: kebab-case (e.g., `ai-systems`, `voice-agent`)
- Product IDs: kebab-case (e.g., `voice-agent-24-7`)
- Blog post IDs: string numbers (e.g., `"1"`, `"2"`)
- Image files: kebab-case in `/public/images/`

### Important Notes
- Mission Control and Paperclip are permanently abandoned — do not reference or maintain
- Notion is the source of truth for all content
- The website is primary proof of company offerings — must be best-in-class
- 3-day work cycles, async coordination via Kanban
- Deploy Friday, monitor Monday

---

*This document should be updated whenever services, products, processes, or team structure changes. Last updated: 2026-06-21 by Daniel.*
