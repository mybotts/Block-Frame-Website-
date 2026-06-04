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
    title: "AI Agent Deployment",
    description:
      "We build and deploy autonomous AI agents that handle real tasks — from customer support to data pipelines. You get a working system, not a prototype.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-violet-600/20 to-indigo-900/20",
    team: "AI & Automation",
  },
  {
    id: "ai-agents-local",
    title: "Local AI Agent Setup",
    description:
      "Run AI agents on your own servers. Full control over your data, no third-party API costs, no rate limits. We handle the installation, configuration, and training.",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-violet-600/20 to-indigo-900/20",
    team: "AI & Automation",
  },
  {
    id: "ai-agents-cloud",
    title: "Cloud-Based AI Agents",
    description:
      "Managed AI agents that run 24/7 on reliable infrastructure. We handle scaling, monitoring, and updates so you can focus on results.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-blue-600/20 to-sky-900/20",
    team: "AI & Automation",
  },
  {
    id: "autonomous-systems",
    title: "Autonomous Agent Systems",
    description:
      "Multi-agent systems that coordinate, make decisions, and execute workflows with minimal human oversight. Built for operations that need to run themselves.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-teal-600/20 to-cyan-900/20",
    team: "AI & Automation",
  },
  {
    id: "managed-agent-services",
    title: "Managed Agent Services",
    description:
      "We operate your AI agents as a service. No setup, no maintenance. You subscribe to outcomes — we handle the infrastructure, updates, and reliability.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-orange-600/20 to-amber-900/20",
    team: "AI & Automation",
  },
  {
    id: "specialized-agent-dev",
    title: "Custom Agent Development",
    description:
      "Purpose-built AI agents designed around your specific workflows. We build, deploy, and continuously improve agents that fit how your team actually works.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-indigo-600/20 to-purple-900/20",
    team: "AI & Automation",
  },
  // ── Engineering ──────────────────────────────────────────────
  {
    id: "web-apps",
    title: "Web & App Engineering",
    description:
      "Full-stack development of web platforms and mobile apps. Built for performance, security, and the kind of user experience that keeps people coming back.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-emerald-600/20 to-green-900/20",
    team: "Engineering",
  },
  // ── Content & Creative ───────────────────────────────────────
  {
    id: "motion-graphics",
    title: "Motion Graphics & VFX",
    description:
      "Motion graphics that explain complex products in seconds. We turn technical features into visual stories that convert viewers into customers.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-teal-600/20 to-cyan-900/20",
    team: "Content & Creative",
  },
  {
    id: "ads-video",
    title: "Video Ad Production",
    description:
      "Short-form video ads engineered for TikTok, YouTube Shorts, and Instagram. Built to stop the scroll and drive measurable acquisition.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-orange-600/20 to-amber-900/20",
    team: "Content & Creative",
  },
  {
    id: "ugc-video-production",
    title: "UGC & Explainer Videos",
    description:
      "Long and short-form video content that builds trust. From scripted product demos to authentic creator-style content — produced for YouTube, TikTok, and your sales funnel.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-violet-600/20 to-fuchsia-900/20",
    team: "Content & Creative",
  },
  // ── Growth & Marketing ───────────────────────────────────────
  {
    id: "social-media",
    title: "Social Media Systems",
    description:
      "We build the content systems and posting infrastructure that keep your social channels active and growing — without requiring daily manual effort.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-emerald-600/20 to-green-900/20",
    team: "Growth & Marketing",
  },
  {
    id: "social-ads-campaigns",
    title: "Paid Ad Campaigns",
    description:
      "Data-backed ad campaigns across TikTok, Instagram, YouTube, and X. We handle creative production, targeting, budget optimization, and reporting.",
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
      "How quantization, pruning, and knowledge distillation enable powerful AI inference on edge devices, from microcontrollers to smartphones.",
    category: "Tech",
    categorySlug: "tech",
    date: "2026-03-24",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-9", type: "text", content:
      "How quantization, pruning, and knowledge distillation enable powerful AI inference on edge devices, from microcontrollers to smartphones.", order: 0 }],
  },
];

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "proposal-led-agentic-outreach",
    title: "Proposal Led Agentic Outreach System",
    description:
      "A custom implementation that researches qualified prospects, creates personalized sample assets, publishes private proposal pages, and prepares controlled outreach through your existing CRM and mailbox.",
    category: "Growth Automation",
    price: "Starting at $1,250",
    image: "/images/agentic-outreach-engine.webp",
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
    title: "Blog OS Automated Notion CMS Blog Publishing System",
    description:
      "A managed, Notion-backed editorial system that researches topics, drafts posts, manages approvals, and publishes finished content to your website on a reliable schedule.",
    category: "Content Systems",
    price: "Starting at $450",
    image: "/images/cms-content-pipelines.png",
    gradient: "from-indigo-500/30 via-slate-900/40 to-emerald-600/30",
    badge: "Build + Handoff",
    cta: "Request implementation",
    highlights: [
      "Uses Notion as the editorial source of truth with clear stage statuses.",
      "Covers research, drafting, review, scheduling, publishing, SEO metadata, and error recovery.",
      "Built for clients who want consistent publishing without manual copy-paste or scattered toolchains.",
    ],
    tiers: [
      {
        name: "One-Time Setup",
        price: "$5,000",
        description:
          "Builds the Notion schema, research pipeline, drafting workflow, approval stages, SEO rules, and publish hook to your site.",
      },
      {
        name: "Monthly Care",
        price: "$1,000/mo",
        description:
          "Covers ongoing editing, scheduling, publishing, light distribution, and system tuning after launch.",
      },
      {
        name: "DIY Blueprint",
        price: "Starting at $450",
        description:
          "Schema, prompts, runbooks, and setup guide for clients to run the pipeline themselves.",
      },
    ],
  },
];
