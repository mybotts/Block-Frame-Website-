// ============================================
// BlockFrameLabs - Static Data & Sample Content
// ============================================

import { Service, BlogPost, MarketplaceProduct, Tab } from "./types";

export const tabs: Tab[] = [
  { id: "services", label: "Services" },
  { id: "ai-news", label: "AI News" },
  { id: "guides", label: "Guides" },
  { id: "marketplace", label: "Marketplace/Products" },
];

export const services: Service[] = [
  {
    id: "ai-systems",
    title: "AI Agents Deployment",
    description:
      "Design, deployment, and management of autonomous AI agents and multi-agent systems. Featuring flagship OpenClaw integration, alongside KilowClaw and NemoClaw enterprise architectures.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-violet-600/20 to-indigo-900/20",
  },
  {
    id: "web-apps",
    title: "App & Web Engineering",
    description:
      "End-to-end development, deployment, and management of high-performance mobile apps and web platforms. Built for scale, security, and exceptional user experiences.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-blue-600/20 to-sky-900/20",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics VFX",
    description:
      "Stunning, high-conversion motion graphic videos. We transform complex ideas into visually engaging technical explainers, product announcements, and brand stories.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-teal-600/20 to-cyan-900/20",
  },
  {
    id: "ads-video",
    title: "Video Ads Creation",
    description:
      "High-impact, conversion-focused video advertisements engineered for TikTok, YouTube Shorts, and Instagram. Stop the scroll and scale your user acquisition.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-orange-600/20 to-amber-900/20",
  },
  {
    id: "marketing-advisory",
    title: "Marketing & Advisory",
    description:
      "Strategic growth consulting, go-to-market execution, and brand positioning. We don't just build products; we ensure they reach the right audience and scale efficiently.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-pink-600/20 to-rose-900/20",
  },
  {
    id: "social-media",
    title: "Social Media Architecture",
    description:
      "Complete social media development and management. We engineer organic growth strategies, community building, and viral content pipelines customized for your niche.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-emerald-600/20 to-green-900/20",
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
  },
  {
    id: "5",
    title: "Smart Contract Security: The Complete Audit Checklist",
    excerpt:
      "Essential security patterns and common vulnerabilities every Solidity developer must know before deploying to mainnet.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-03-16",
    status: "approved",
    author: "BlockFrameLabs",
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
  },
];

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "mp-1",
    title: "AI Agent Starter Kit",
    description:
      "Production-ready boilerplate for building autonomous AI agents with LangChain, vector stores, and tool integrations. Includes 10+ pre-built tools.",
    category: "AI Templates",
    price: "$149",
    image: "/images/ai-agent-development.png",
    gradient: "from-violet-500/30 to-purple-900/30",
  },
  {
    id: "mp-2",
    title: "DeFi Protocol Framework",
    description:
      "Complete smart contract framework for launching DeFi protocols. Includes staking, lending, and liquidity pool contracts — fully audited.",
    category: "Web3",
    price: "$299",
    image: "/images/web3-blockchain.png",
    gradient: "from-teal-500/30 to-emerald-900/30",
  },
  {
    id: "mp-3",
    title: "SaaS Dashboard UI Kit",
    description:
      "50+ premium React components for building beautiful SaaS dashboards. Dark mode, charts, data tables, and more. Built with Tailwind CSS.",
    category: "UI Kits",
    price: "$79",
    image: "/images/uiux-design.png",
    gradient: "from-pink-500/30 to-rose-900/30",
  },
  {
    id: "mp-4",
    title: "Content Pipeline Automator",
    description:
      "AI-powered content pipeline that auto-generates, schedules, and publishes blog posts, social media, and newsletters from a single prompt.",
    category: "Automation",
    price: "$199",
    image: "/images/cms-content-pipelines.png",
    gradient: "from-orange-500/30 to-amber-900/30",
  },
  {
    id: "mp-5",
    title: "NFT Marketplace Starter",
    description:
      "Full-stack NFT marketplace with minting, auctions, and royalty management. Supports Ethereum and Solana. Deploy in under an hour.",
    category: "Web3",
    price: "$249",
    image: "/images/web3-blockchain.png",
    gradient: "from-cyan-500/30 to-blue-900/30",
  },
  {
    id: "mp-6",
    title: "DevOps Monitoring Stack",
    description:
      "Pre-configured monitoring stack with Grafana dashboards, alerting rules, and incident response automation. Works with AWS, GCP, and Azure.",
    category: "DevOps",
    price: "$129",
    image: "/images/ai-agent-development.png",
    gradient: "from-emerald-500/30 to-green-900/30",
  },
];
