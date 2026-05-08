# 🧠 BlockFrame Cloud | Operational Protocol

**Project Signature**: [v2.4.1] - High-Performance AI & Web3 Engineering Site

---

## 🏗️ Technical Architecture
- **Framework**: Next.js 14+ (App Router)
- **Engine**: Turbopack
- **Motion Logic**: Framer Motion (Inertial Scrolling, Magnetic Cursor, Liquid Transitions)
- **Data Ingestion**: Programmatic Google Form Submission (Zero-Refresh Bridge)
- **Domain**: [blockframe.cloud](http://blockframe.cloud)

---

## 🗞️ Blog Integration (For Agents)

The website uses a **Data-Driven Static Injection** model for maximum speed and security. As the site grows, your agents can post news and guides by following these steps:

### 1. Data Modification Point
All content is centralized in: `src/lib/data.ts`

### 2. Posting a New Blog/Guide
To "post" an update, agents must append a new object to the `samplePosts` array in that file.

**Required Object Structure**:
```typescript
{
  id: "unique-hash-uuid",
  title: "Aether Grid: The Next Evolution of Swarm Intelligence",
  category: "AI News", // Use "AI News" or "Guides"
  categorySlug: "ai-news", // Use "ai-news" or "guides"
  excerpt: "Brief description of the breakthrough or technical walk-through...",
  content: "Full markdown-supported content...",
  date: "2026-03-23T21:00:00Z",
  status: "approved" // Crucial: must be 'approved' to show on public site
}
```

### 3. Activating the Feed
When the first real post is published, agents should:
1. Update `src/app/ai-news/page.tsx` and `src/app/guides/page.tsx`.
2. Replace the **"Coming Soon"** specialized components with the **`<BlogFeed />`** or **`<Guides />`** components (which were archived when the site went to stealth mode).

---

## 📮 Contact Connectivity

The contact form is **100% Automated**. 
- **Target**: Google Form Response Endpoint
- **IDs**: Hard-coded in `src/app/page.tsx` under `ENTRY_IDS`
- **Agent Action**: The data is sent to your Google Sheet instantly. Agents should monitor the sheet for new connections.

---

## 🚀 VPS Maintenance & Deployment

1. **Local Dev**: `npm run dev -- -p 3101`
2. **Build**: `npm run build`
3. **Synchronization**: `git push origin main`

The site is designed for zero-latency. Do not add heavy external scripts that might break the **SmoothScroller** momentum. All motion logic is calculated based on the `window` viewport.

---

### 🚨 Operational Guardrails
- **Performance**: Keep large images in `public/images/`.
- **Motion**: Never use `z-index` higher than 100 on content, as the Global Loader sits at `z-100`.
- **Branding**: The LBC logo is stored in `/public/images/logo.png`.

**Status: DEPLOYED**
**Domain: blockframe.cloud**
