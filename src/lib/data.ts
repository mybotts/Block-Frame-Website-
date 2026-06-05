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
    title: "AI Systems Deployment",
    description:
      "We build and deploy AI systems that handle real tasks, from customer support to data pipelines. You get a working system, not a prototype.",
    image: "/images/ai-agent-development.png",
    gradient: "from-violet-600/20 to-indigo-900/20",
    team: "AI & Automation",
  },
  {
    id: "ai-agents-local",
    title: "Local AI Systems",
    description:
      "Run AI systems on your own servers. Full control over your data, no third-party API costs, no rate limits. We handle the installation, configuration, and training.",
    image: "/images/placeholder.png",
    gradient: "from-violet-600/20 to-indigo-900/20",
    team: "AI & Automation",
  },
  {
    id: "ai-agents-cloud",
    title: "Cloud-Based AI Systems",
    description:
      "Managed AI systems that run 24/7 on reliable infrastructure. We handle scaling, monitoring, and updates so you can focus on results.",
    image: "/images/placeholder.png",
    gradient: "from-blue-600/20 to-sky-900/20",
    team: "AI & Automation",
  },
  {
    id: "autonomous-systems",
    title: "Automation Systems",
    description:
      "Multi-system workflows that coordinate, make decisions, and execute tasks with minimal human oversight. Built for operations that need to run themselves.",
    image: "/images/placeholder.png",
    gradient: "from-teal-600/20 to-cyan-900/20",
    team: "AI & Automation",
  },
  {
    id: "managed-agent-services",
    title: "Managed AI Services",
    description:
      "We operate your AI systems as a service. No setup, no maintenance. You subscribe to outcomes. We handle the infrastructure, updates, and reliability.",
    image: "/images/managed-agent-services.png",
    gradient: "from-orange-600/20 to-amber-900/20",
    team: "AI & Automation",
  },
  {
    id: "specialized-agent-dev",
    title: "Custom AI Development",
    description:
      "Purpose-built AI systems designed around your specific workflows. We build, deploy, and continuously improve systems that fit how your team actually works.",
    image: "/images/placeholder.png",
    gradient: "from-indigo-600/20 to-purple-900/20",
    team: "AI & Automation",
  },
  // ── Engineering ──────────────────────────────────────────────
  {
    id: "web-apps",
    title: "Web & App Engineering",
    description:
      "Full-stack development of web platforms and mobile apps. Built for performance, security, and the kind of user experience that keeps people coming back.",
    image: "/images/uiux-design.png",
    gradient: "from-emerald-600/20 to-green-900/20",
    team: "Engineering",
  },
  // ── Content & Creative ───────────────────────────────────────
  {
    id: "motion-graphics",
    title: "Motion Graphics & VFX",
    description:
      "Motion graphics that explain complex products in seconds. We turn technical features into visual stories that convert viewers into customers.",
    image: "/images/placeholder.png",
    gradient: "from-teal-600/20 to-cyan-900/20",
    team: "Content & Creative",
  },
  {
    id: "ads-video",
    title: "Video Ad Production",
    description:
      "Short-form video ads engineered for TikTok, YouTube Shorts, and Instagram. Built to stop the scroll and drive measurable acquisition.",
    image: "/images/placeholder.png",
    gradient: "from-orange-600/20 to-amber-900/20",
    team: "Content & Creative",
  },
  {
    id: "ugc-video-production",
    title: "UGC & Explainer Videos",
    description:
      "Long and short-form video content that builds trust. From scripted product demos to authentic creator-style content, produced for YouTube, TikTok, and your sales funnel.",
    image: "/images/ugc-video-production.png",
    gradient: "from-violet-600/20 to-fuchsia-900/20",
    team: "Content & Creative",
  },
  // ── Growth & Marketing ───────────────────────────────────────
  {
    id: "social-media",
    title: "Social Media Systems",
    description:
      "We build the content systems and posting infrastructure that keep your social channels active and growing, without requiring daily manual effort.",
    image: "/images/social-media.png",
    gradient: "from-emerald-600/20 to-green-900/20",
    team: "Growth & Marketing",
  },
  {
    id: "social-ads-campaigns",
    title: "Paid Ad Campaigns",
    description:
      "Data-backed ad campaigns across TikTok, Instagram, YouTube, and X. We handle creative production, targeting, budget optimization, and reporting.",
    image: "/images/placeholder.png",
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
      "What GPT-5 means for autonomous agents: better reasoning, longer memory, and fewer hallucinations.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-20",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-1", type: "text", content:
      "What GPT-5 means for autonomous agents: better reasoning, longer memory, and fewer hallucinations.", order: 0 }],
  },
  {
    id: "2",
    title: "DeepSeek V4: Open-Source Breakthrough in Reasoning",
    excerpt:
      "DeepSeek's latest model matches proprietary rivals on reasoning benchmarks, and it is open-source.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-18",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-2", type: "text", content:
      "DeepSeek's latest model matches proprietary rivals on reasoning benchmarks, and it is open-source.", order: 0 }],
  },
  {
    id: "3",
    title: "The Rise of AI-Native Development Tools",
    excerpt:
      "AI-first coding tools are changing how engineering teams write and ship software.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-15",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-3", type: "text", content:
      "AI-first coding tools are changing how engineering teams write and ship software.", order: 0 }],
  },
  {
    id: "4",
    title: "Building Your First AI Agent with LangChain",
    excerpt:
      "A step-by-step guide to building an AI agent with LangChain, including tools, memory, and multi-step reasoning.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-03-19",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-4", type: "text", content:
      "A step-by-step guide to building an AI agent with LangChain, including tools, memory, and multi-step reasoning.", order: 0 }],
  },
  {
    id: "5",
    title: "AI Agent Reliability: The Complete Production Checklist",
    excerpt:
      "The checklist we use before putting any AI agent into production.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-03-16",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-5", type: "text", content:
      "The checklist we use before putting any AI agent into production.", order: 0 }],
  },
  {
    id: "6",
    title: "Deploying Next.js at Scale with Edge Functions",
    excerpt:
      "How to use edge computing and serverless functions to deploy Next.js apps that handle millions of requests.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-03-12",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-6", type: "text", content:
      "How to use edge computing and serverless functions to deploy Next.js apps that handle millions of requests.", order: 0 }],
  },
  {
    id: "7",
    title: "Multi-Modal AI: Combining Vision and Language",
    excerpt:
      "Vision and language models are merging. Here is what that means for AI applications.",
    category: "AI News",
    categorySlug: "ai-news",
    date: "2026-03-10",
    status: "pending",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-7", type: "text", content:
      "Vision and language models are merging. Here is what that means for AI applications.", order: 0 }],
  },
  {
    id: "8",
    title: "Understanding Neural Networks: A Visual Introduction",
    excerpt:
      "A visual guide to how neural networks learn, from perceptrons to deep architectures.",
    category: "Educational",
    categorySlug: "educational",
    date: "2026-03-22",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-8", type: "text", content:
      "A visual guide to how neural networks learn, from perceptrons to deep architectures.", order: 0 }],
  },
  {
    id: "10",
    title: "What Are AI Agents: A Practical Breakdown",
    excerpt:
      "AI agents are not just chatbots. They are systems that perceive, decide, and act on their own. Here is how they work and where they make sense.",
    category: "Educational",
    categorySlug: "educational",
    date: "2026-04-01",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [
      {
        id: "agents-img-1",
        type: "image",
        content: "/images/ai-agent-development.png",
        order: 0,
      },
      {
        id: "agents-text-1",
        type: "text",
        content: "Most people hear \"AI agent\" and think of a chatbot that answers questions. That is only one narrow slice. A real AI agent can take in information, make decisions, and carry out a sequence of actions toward a specific goal. It is the difference between a tool that waits for instructions and a teammate that works independently.",
        order: 1,
      },
      {
        id: "agents-h2-1",
        type: "text",
        content: "## The three parts of an AI agent",
        order: 2,
      },
      {
        id: "agents-text-2",
        type: "text",
        content: "Every AI agent has three core components:\n\n**Perception.** The agent takes in data. This could be a user message, an API response, a database query, or a sensor reading. The key is that it can interpret what it is receiving.\n\n**Reasoning.** The agent decides what to do next. This is where the language model comes in. It evaluates the current state, considers the goal, and picks the best next step.\n\n**Action.** The agent executes. It sends an email, writes to a database, calls an API, or triggers another agent. The action produces a result, and the cycle continues.",
        order: 3,
      },
      {
        id: "agents-text-3",
        type: "text",
        content: "## Where agents fail",
        order: 4,
      },
      {
        id: "agents-text-4",
        type: "text",
        content: "Agents are not magic. They break down in predictable ways. They hallucinate actions that look correct but are wrong. They get stuck in loops when a step keeps failing. They waste tokens on tasks a simple script could handle faster. And they need guardrails, without them, a small error compounds into a costly mistake.",
        order: 5,
      },
      {
        id: "agents-text-5",
        type: "text",
        content: "## When to use an agent",
        order: 6,
      },
      {
        id: "agents-text-6",
        type: "text",
        content: "You need an agent when the task requires judgment across multiple steps, when the steps depend on previous results, and when the exact sequence cannot be predetermined. For fixed, linear workflows, a script is better. For open-ended tasks where each step informs the next, an agent earns its cost.",
        order: 7,
      },
    ],
  },
  {
    id: "9",
    title: "Edge AI: Running Models on Resource-Constrained Devices",
    excerpt:
      "How quantization and pruning let AI models run on phones, microcontrollers, and edge devices.",
    category: "Tech",
    categorySlug: "tech",
    date: "2026-03-24",
    status: "approved",
    author: "BlockFrameLabs",
    blocks: [{ id: "sample-9", type: "text", content:
      "How quantization and pruning let AI models run on phones, microcontrollers, and edge devices.", order: 0 }],
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
