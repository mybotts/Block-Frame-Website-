// ============================================
// BlockFrameLabs - Static Data & Sample Content
// ============================================

import { Service, BlogPost, MarketplaceProduct, Tab } from "./types";

export const tabs: Tab[] = [
  { id: "services", label: "Services" },
  { id: "blogs", label: "Blogs" },
  { id: "videos", label: "Videos" },
  { id: "marketplace", label: "Marketplace/Products" },
];

export const services: Service[] = [
  // ── AI & Automation ──────────────────────────────────────────
  {
    id: "ai-systems",
    title: "AI Agents Deployment",
    description:
      "Design, deployment, and management of autonomous AI agents and multi-agent systems. Featuring flagship OpenClaw integration, alongside KilowClaw and NemoClaw enterprise architectures.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-violet-600/20 to-indigo-900/20",
    team: "AI & Automation",
  },
  {
    id: "ai-agents-local",
    title: "Local AI Agent Setup",
    description:
      "Deploy autonomous AI agents on your own infrastructure. Full installation, configuration, and training for local, offline, or edge deployments. Complete control, data sovereignty, and zero external API dependencies.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-violet-600/20 to-indigo-900/20",
    team: "AI & Automation",
  },
  {
    id: "ai-agents-cloud",
    title: "Cloud-Based AI Agents",
    description:
      "Scalable, managed AI agent services in the cloud. 24/7 operation, auto-scaling, global distribution, and enterprise-grade SLAs. Focus on outcomes; we handle infrastructure, updates, and reliability.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-blue-600/20 to-sky-900/20",
    team: "AI & Automation",
  },
  {
    id: "autonomous-systems",
    title: "Fully Autonomous Agents",
    description:
      "End-to-end autonomous systems that perceive, decide, and act with minimal human oversight. From monitoring and incident response to data aggregation and trading — self-directing, self-correcting AI.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-teal-600/20 to-cyan-900/20",
    team: "AI & Automation",
  },
  {
    id: "managed-agent-services",
    title: "Managed Agent Services",
    description:
      "We operate AI agents as a service. No setup, no maintenance. Subscribe to ready-to-use agents for customer support, compliance monitoring, content generation, and more. Pay per use or monthly.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-orange-600/20 to-amber-900/20",
    team: "AI & Automation",
  },
  {
    id: "specialized-agent-dev",
    title: "Specialized Agent Development and Management",
    description:
      "Custom AI agent development tailored to your unique business processes. We design, build, and operate specialized agents with deep workflow integration, continuous improvement, and full lifecycle management.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-indigo-600/20 to-purple-900/20",
    team: "AI & Automation",
  },
  {
    id: "community-moderator-agents",
    title: "Discord & Telegram Support Agents",
    description: "Deploy AI agents as 24/7 community moderators and support staff across Discord, Telegram, and other platforms. Handle inquiries, moderate discussions, provide instant support, and maintain healthy community environments around the clock.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-emerald-600/20 to-green-900/20",
    team: "AI & Automation",
  },
    // ── Engineering ──────────────────────────────────────────────
  {
    id: "web-apps",
    title: "App & Web Engineering",
    description:
      "End-to-end development, deployment, and management of high-performance mobile apps and web platforms. Built for scale, security, and exceptional user experiences.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-emerald-600/20 to-green-900/20",
    team: "Engineering",
  },
  // ── Content & Creative ───────────────────────────────────────
  {
    id: "motion-graphics",
    title: "Motion Graphics VFX",
    description:
      "Stunning, high-conversion motion graphic videos. We transform complex ideas into visually engaging technical explainers, product announcements, and brand stories.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-teal-600/20 to-cyan-900/20",
    team: "Content & Creative",
  },
  {
    id: "ads-video",
    title: "Video Ads Creation",
    description:
      "High-impact, conversion-focused video advertisements engineered for TikTok, YouTube Shorts, and Instagram. Stop the scroll and scale your user acquisition.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-orange-600/20 to-amber-900/20",
    team: "Content & Creative",
  },
  // ── Growth & Marketing ───────────────────────────────────────
  {
    id: "marketing-advisory",
    title: "Marketing & Advisory",
    description:
      "Strategic growth consulting, go-to-market execution, and brand positioning. We don't just build products; we ensure they reach the right audience and scale efficiently.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-pink-600/20 to-rose-900/20",
    team: "Growth & Marketing",
  },
  {
    id: "social-media",
    title: "Social Media Architecture",
    description:
      "Complete social media development and management. We engineer organic growth strategies, community building, and viral content pipelines customized for your niche.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-emerald-600/20 to-green-900/20",
    team: "Growth & Marketing",
  },
  {
    id: "social-ads-campaigns",
    title: "Social Media Ad Campaigns",
    description:
      "AI-optimized ad campaigns across TikTok, Instagram, YouTube, and X. Creative production, targeting, budget optimization, and performance reporting. Drive acquisition and revenue with data-backed campaigns.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-pink-600/20 to-rose-900/20",
    team: "Growth & Marketing",
  },
];

// Sample blog posts (in a real app, these come from the API)
export const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "GPT-5 and the Future of Autonomous Agents",
    excerpt:
      "Exploring how the next generation of language models will reshape autonomous agent architectures and enable truly self-directed AI systems.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-20",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-1", type: "text", content: 
      "Exploring how the next generation of language models will reshape autonomous agent architectures and enable truly self-directed AI systems.", order: 0 }],
  },
  {
    id: "2",
    title: "DeepSeek V4: Open-Source Breakthrough in Reasoning",
    excerpt:
      "DeepSeek's latest model challenges proprietary giants with state-of-the-art reasoning capabilities available to everyone.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-18",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-2", type: "text", content: 
      "DeepSeek's latest model challenges proprietary giants with state-of-the-art reasoning capabilities available to everyone.", order: 0 }],
  },
  {
    id: "3",
    title: "The Rise of AI-Native Development Tools",
    excerpt:
      "How AI-first coding assistants are transforming software development workflows and what it means for engineering teams.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-15",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-3", type: "text", content: 
      "How AI-first coding assistants are transforming software development workflows and what it means for engineering teams.", order: 0 }],
  },
  {
    id: "4",
    title: "Building Your First AI Agent with LangChain",
    excerpt:
      "A step-by-step guide to creating an autonomous AI agent using LangChain, complete with tool usage, memory, and multi-step reasoning.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-03-19",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-4", type: "text", content: 
      "A step-by-step guide to creating an autonomous AI agent using LangChain, complete with tool usage, memory, and multi-step reasoning.", order: 0 }],
  },
  {
    id: "5",
    title: "AI Agent Reliability: The Complete Production Checklist",
    excerpt:
      "Essential observability, guardrails, evaluation, and fallback patterns every team needs before deploying AI agents into production workflows.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-03-16",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-5", type: "text", content: 
      "Essential observability, guardrails, evaluation, and fallback patterns every team needs before deploying AI agents into production workflows.", order: 0 }],
  },
  {
    id: "6",
    title: "Deploying Next.js at Scale with Edge Functions",
    excerpt:
      "Learn how to leverage edge computing and serverless functions to deploy Next.js apps that handle millions of requests.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-03-12",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-6", type: "text", content: 
      "Learn how to leverage edge computing and serverless functions to deploy Next.js apps that handle millions of requests.", order: 0 }],
  },
  {
    id: "7",
    title: "Multi-Modal AI: Combining Vision and Language",
    excerpt:
      "The convergence of vision and language models is creating new possibilities for AI applications across industries.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-10",
    status: "pending",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-7", type: "text", content: 
      "The convergence of vision and language models is creating new possibilities for AI applications across industries.", order: 0 }],
  },
  {
    id: "8",
    title: "Understanding Neural Networks: A Visual Introduction",
    excerpt:
      "Break through the jargon and build an intuitive understanding of how neural networks learn, from perceptrons to deep architectures.",
    category: "Educational",
    categorySlug: "educational",
    date: "2026-03-22",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-8", type: "text", content: 
      "Break through the jargon and build an intuitive understanding of how neural networks learn, from perceptrons to deep architectures.", order: 0 }],
  },
  {
    id: "9",
    title: "Edge AI: Running Models on Resource-Constrained Devices",
    excerpt:
      "How quantization, pruning, and knowledge distillation enable powerful AI inference on edge devices — from microcontrollers to smartphones.",
    category: "Tech",
    categorySlug: "tech",
    date: "2026-03-24",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-9", type: "text", content: 
      "How quantization, pruning, and knowledge distillation enable powerful AI inference on edge devices — from microcontrollers to smartphones.", order: 0 }],
  },
];

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "proposal-led-agentic-outreach",
    title: "Proposal-Led Agentic Outreach System",
    description:
      "A custom implementation that researches qualified prospects, creates personalized sample assets, publishes private proposal pages, and prepares controlled outreach through your existing CRM and mailbox.",
    category: "Growth Automation",
    price: "Starting at $1,250",
    image: "/images/agentic-outreach-engine.png",
    gradient: "from-teal-500/30 via-slate-900/40 to-amber-700/30",
    badge: "Custom build",
    cta: "Book implementation call",
    highlights: [
      "Built around your current mailbox, CRM, lead sources, and approval process.",
      "Includes send caps, dedupe, suppression lists, preview checks, and opt-out handling.",
      "Creates proof-led outreach with private proposal pages instead of generic cold pitches.",
    ],
    tiers: [
      {
        name: "Workflow Blueprint",
        price: "Starting at $350",
        description: "DIY operating map, templates, data model, prompts, and setup checklist.",
      },
      {
        name: "Build Sprint",
        price: "Starting at $1,250",
        description: "We configure the prospecting, proposal, email queue, and safety workflow in your stack.",
      },
      {
        name: "Managed System",
        price: "Starting at $750/mo",
        description: "Monthly operation, iteration, reporting, and campaign improvements after launch.",
      },
    ],
  },
  {
    id: "blog-os-automated-notion-cms",
    title: "Blog OS — Automated Notion-CMS Blog Publishing System",
    description:
      "A managed, Notion-backed editorial system that researches topics, drafts posts, manages approvals, and publishes finished content to your website on a reliable schedule.",
    category: "Content Systems",
    price: "Starting at $1,950",
    image: "/images/blog-os-system.png",
    gradient: "from-indigo-500/30 via-slate-900/40 to-emerald-600/30",
    badge: "Managed system",
    cta: "Request implementation",
    highlights: [
      "Uses Notion as the editorial source of truth with clear stage statuses.",
      "Covers research, drafting, review, scheduling, publishing, SEO metadata, and error recovery.",
      "Built for clients who want consistent publishing without manual copy-paste or scattered toolchains.",
    ],
    tiers: [
      {
        name: "DIY Blueprint",
        price: "Starting at $450",
        description: "Schema, prompts, runbooks, and setup guide for clients to run the pipeline themselves.",
      },
      {
        name: "Managed System",
        price: "Starting at $1,950",
        description: "We operate research, drafting, approvals, scheduling, publishing, and basic distribution.",
      },
      {
        name: "Enterprise OS",
        price: "Custom",
        description: "Multi-site, multi-author, advanced governance, analytics, distribution, automation, and dedicated ops.",
      },
    ],
  },
];
