"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const calendlyHref = "https://calendly.com/blockframemedia/30min";
const emailHref = "mailto:sergeolisco@gmail.com?subject=Project%20or%20Advisory%20Inquiry%20for%20Sergeo";
const groplyRepoHref = "https://github.com/Sergeo01/Groply-Open-Core-Autonomous-AI-Commerce-Engine";

const navSections = [
  { id: "about", label: "01  About & Thesis" },
  { id: "problems", label: "02  Problems I Solve" },
  { id: "proof", label: "03  Systems & Case Studies" },
  { id: "standards", label: "04  Engineering Standards" },
  { id: "stack", label: "05  Tech Stack & Tools" },
  { id: "credentials", label: "06  Certifications & History" },
  { id: "contact", label: "07  Work With Me" },
];

export default function PortfolioClient() {
  const [activeSection, setActiveSection] = useState("about");
  const [checklist, setChecklist] = useState({
    inputSanitization: true,
    domainGuardrails: true,
    floorPriceRules: true,
    multiModelFailover: true,
    asyncQueueIsolation: true,
    sentryTelemetry: true,
    systemdRecovery: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl pt-36 pb-24 px-6 md:px-12">
      <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-14 xl:grid-cols-[320px_1fr]">
        
        {/* ========================================================
            LEFT STICKY SIDEBAR (Dossier Identity & Navigation)
            ======================================================== */}
        <aside className="mb-14 lg:mb-0">
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* Identity Card */}
            <div className="glass-card p-6 border border-card-border">
              {/* Typographic Monogram Emblem */}
              <div className="mb-5 flex items-center justify-between">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-surface to-surface-light border border-primary/40 shadow-[0_0_25px_rgba(0,179,191,0.15)]">
                  <span className="font-mono text-2xl font-bold tracking-tight text-primary-light">S</span>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-primary/40 text-[9px] font-mono text-primary-light">
                    &gt;_
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-medium text-emerald-400">Available</span>
                </div>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                Sergeo
              </h1>
              <p className="mt-1 text-sm font-medium text-primary-light">
                Founder &amp; AI Systems Architect
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                BlockFrame Labs
              </p>

              <p className="mt-4 text-xs leading-relaxed text-text-secondary">
                Designing, deploying, and hardening autonomous AI systems, conversational commerce engines, and resilient cloud infrastructure.
              </p>

              {/* Navigation Jump Links */}
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted mb-3">
                  Document Contents
                </p>
                <nav className="flex flex-col space-y-1.5" aria-label="Portfolio sections">
                  {navSections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-xs transition-colors py-1 px-2 rounded font-mono ${
                        activeSection === item.id
                          ? "bg-primary/10 text-primary-light font-semibold"
                          : "text-text-muted hover:text-text-primary hover:bg-surface-light"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Actions */}
              <div className="mt-6 border-t border-border pt-5 flex flex-col gap-2.5">
                <a
                  href={calendlyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded bg-text-primary px-4 py-2.5 text-xs font-semibold text-background transition hover:opacity-90 shadow-sm"
                >
                  <span>Book a Strategy Call</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href={emailHref}
                  className="w-full inline-flex items-center justify-center gap-2 rounded border border-card-border bg-surface px-4 py-2.5 text-xs font-medium text-text-secondary transition hover:bg-surface-light hover:text-text-primary"
                >
                  <span>Email Direct</span>
                </a>
                <a
                  href="https://github.com/Sergeo01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-[11px] text-text-muted hover:text-primary-light transition-colors pt-1"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>github.com/Sergeo01</span>
                </a>
              </div>
            </div>

            {/* Quick Meta Card */}
            <div className="glass-card p-5 border border-card-border space-y-3 text-xs">
              <div className="flex items-center justify-between text-text-muted">
                <span>Location:</span>
                <span className="text-text-primary font-mono">West Africa (WAT / UTC+1)</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Overlap:</span>
                <span className="text-text-primary font-mono">US East &amp; EU Flexible</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Focus:</span>
                <span className="text-primary-light font-medium">Autonomous Systems</span>
              </div>
            </div>

          </div>
        </aside>

        {/* ========================================================
            RIGHT CONTENT AREA (The Executive Dossier)
            ======================================================== */}
        <main className="space-y-24 min-w-0">

          {/* ------------------------------------------------------
              SECTION 01: ABOUT & THESIS
              ------------------------------------------------------ */}
          <section id="about" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                01 &middot; FOUNDER &amp; ARCHITECT
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-6">
              Architecting autonomous AI systems that execute real work, run in production, and solve hard business problems.
            </h2>

            <div className="prose prose-invert max-w-none text-base md:text-lg text-text-secondary leading-relaxed space-y-4">
              <p>
                Most modern AI projects stop at a toy demo, a fragile prompt, or an API wrapper that breaks the moment unexpected inputs arrive. I take the opposite path: I engineer end-to-end autonomous infrastructure designed for production reality.
              </p>
              <p>
                From low-level Linux VPS servers and containerized agent fleets to trilingual conversational commerce engines and deterministic publishing pipelines, my focus is always on building systems that operate 24/7 with strict reliability and measurable business outcomes.
              </p>
            </div>

            {/* Metrics Strip */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-text-primary block mb-1">8</span>
                <span className="text-xs text-text-muted leading-tight block">Autonomous Agents in Production Fleet</span>
              </div>
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-primary-light block mb-1">30 in 30</span>
                <span className="text-xs text-text-muted leading-tight block">Days, Zero Manual Edits (Blog OS)</span>
              </div>
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-text-primary block mb-1">3</span>
                <span className="text-xs text-text-muted leading-tight block">Dialects Supported (EN, FR, Pidgin)</span>
              </div>
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-primary-light block mb-1">100%</span>
                <span className="text-xs text-text-muted leading-tight block">Full-Stack Execution (Linux to Frontend)</span>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 02: PROBLEMS I SOLVE
              ------------------------------------------------------ */}
          <section id="problems" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                02 &middot; CAPABILITIES &amp; VALUE
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              Problems I Help Solve
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-2xl">
              Where high-level systems architecture translates into direct operational and financial advantages.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              
              <div className="glass-card p-7 border border-card-border hover:border-primary/40 transition">
                <div className="font-mono text-xs text-primary-light font-semibold mb-3">01 / COMMERCE BOTTLENECKS</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Conversational Commerce &amp; WhatsApp Automation
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  In many markets, over 80% of transactions occur inside chat apps. I build autonomous sales agents that discover buyer intent, intelligently negotiate within strict owner floor margins, generate native interactive catalogs, and confirm mobile money payments without human bottlenecking.
                </p>
              </div>

              <div className="glass-card p-7 border border-card-border hover:border-primary/40 transition">
                <div className="font-mono text-xs text-primary-light font-semibold mb-3">02 / UNATTENDED OPERATIONS</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Autonomous Multi-Agent Fleets
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Single prompts fail when complexity rises. I orchestrate specialized fleets of systems (researchers, web engineers, publishers, distribution bots) that communicate through structured REQ/ACK protocols, maintain persistent memory across sessions, and self-heal upon service disruption.
                </p>
              </div>

              <div className="glass-card p-7 border border-card-border hover:border-primary/40 transition">
                <div className="font-mono text-xs text-primary-light font-semibold mb-3">03 / CONTENT FRICTION</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Zero-Touch Content Pipelines (Blog OS)
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Eliminating manual copy-pasting, formatting bugs, and CDN image expiration. I connect headless Notion workspaces directly to production Next.js platforms with permanent asset localization, RSS syndication, IndexNow pings, and markdown mirrors for AI crawler discoverability.
                </p>
              </div>

              <div className="glass-card p-7 border border-card-border hover:border-primary/40 transition">
                <div className="font-mono text-xs text-primary-light font-semibold mb-3">04 / FRAGILE CLOUD STACKS</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Hardened Linux &amp; Docker Infrastructure
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  I deploy and manage reliable self-hosted infrastructure: Ubuntu VPS instances, multi-service Docker Compose stacks, automated Caddy TLS reverse proxies, PostgreSQL databases with schema migrations, and proactive systemd service isolation with zero downtime loops.
                </p>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 03: PROOF OF WORK & SYSTEMS
              ------------------------------------------------------ */}
          <section id="proof" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  03 &middot; PROOF OF WORK
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Live Production Systems &amp; Case Studies
              </h2>
              <p className="text-base text-text-secondary max-w-2xl">
                Every project below is real code running on real infrastructure, built to solve tangible operational bottlenecks.
              </p>
            </div>

            {/* Case Study 1: Groply */}
            <div className="glass-card p-8 md:p-10 border border-card-border relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="category-pill bg-accent/15 text-accent-light text-xs font-mono">
                    OPEN CORE
                  </span>
                  <span className="category-pill bg-surface-light text-text-secondary text-xs font-mono">
                    AUTONOMOUS COMMERCE
                  </span>
                </div>
                <a
                  href={groplyRepoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary-light hover:underline"
                >
                  <span>View Public GitHub Repo</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Groply: Autonomous AI Commerce Engine
              </h3>
              <p className="text-sm text-primary-light mb-6 font-mono">
                WhatsApp Conversational Agent &middot; Trilingual Haggling &middot; Local Mobile Money
              </p>

              <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                    The Situation &amp; Bottleneck
                  </h4>
                  <p>
                    In emerging markets across Africa, over 80% of online commerce takes place inside WhatsApp chats rather than traditional shopping carts. But answering hundreds of DMs by hand, answering repetitive price and size inquiries, negotiating discounts, and reconciling Mobile Money screenshots manually burns shop owners out.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                    The Solution &amp; Architecture
                  </h4>
                  <p>
                    I engineered Groply: an open-core autonomous AI commerce engine that turns WhatsApp into a 24/7 automated storefront.
                  </p>
                  <ul className="mt-3 list-disc list-inside space-y-1.5 pl-2 text-text-secondary">
                    <li><strong className="text-text-primary">Trilingual Fluency:</strong> Speaks natural English, French, and Cameroonian Pidgin.</li>
                    <li><strong className="text-text-primary">Intelligent Margin-Safe Haggling:</strong> Owners set a retail price and a confidential floor price. If a customer haggles, the AI negotiates autonomously to close the deal without ever dipping below approved profit margins.</li>
                    <li><strong className="text-text-primary">Native WhatsApp UI:</strong> Interactive product buttons, catalog menus, and order cards that keep the user inside WhatsApp.</li>
                    <li><strong className="text-text-primary">Dual-Layer Storefronts:</strong> Canonical web storefront paired with a featherlight (&lt;25KB) instant WhatsApp sheet that opens immediately on low-bandwidth mobile connections.</li>
                    <li><strong className="text-text-primary">Localized Payments &amp; Logistics:</strong> Native MTN Mobile Money and Orange Money reconciliation, plus inter-city parcel waybill dispatch via travel agency bus lines (Touristique Express, Buca Voyages).</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-surface p-4 border border-card-border font-mono text-xs">
                  <span className="text-text-muted block mb-1">// Production Architecture Stack</span>
                  <span className="text-text-primary">Meta WhatsApp Cloud API &middot; FastAPI (Python) &middot; PostgreSQL &middot; Docker &middot; Ubuntu VPS &middot; Sentry Telemetry</span>
                </div>
              </div>
            </div>

            {/* Case Study 2: BlockFrame Labs Blog OS */}
            <div className="glass-card p-8 md:p-10 border border-card-border relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="category-pill bg-accent/15 text-accent-light text-xs font-mono">
                    PRODUCTION SYSTEM
                  </span>
                  <span className="category-pill bg-surface-light text-text-secondary text-xs font-mono">
                    CONTENT AUTOMATION
                  </span>
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary-light hover:underline"
                >
                  <span>Explore Live Blog Surface</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Blog OS: Zero-Touch Notion to Edge Pipeline
              </h3>
              <p className="text-sm text-primary-light mb-6 font-mono">
                Permanent Asset Localization &middot; Turbopack SSR/ISR &middot; IndexNow SEO Automation
              </p>

              <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                    The Problem
                  </h4>
                  <p>
                    Notion is an intuitive CMS, but its AWS S3 signed image URLs expire after 60 minutes. Standard static site generators end up serving broken images, while content teams waste hours re-formatting markdown and configuring metadata.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                    The Architecture
                  </h4>
                  <p>
                    I engineered a fully autonomous pipeline connecting Notion databases directly to Next.js on Vercel:
                  </p>
                  <ul className="mt-3 list-disc list-inside space-y-1.5 pl-2 text-text-secondary">
                    <li><strong className="text-text-primary">Automated Thumbnail Localization:</strong> Downloads and localizes remote assets into permanent CDN paths upon approval, eliminating external image expiration completely.</li>
                    <li><strong className="text-text-primary">Turbopack &amp; On-Demand ISR:</strong> Sub-second page generation with on-demand webhook cache purging.</li>
                    <li><strong className="text-text-primary">AI &amp; Crawler Syndication:</strong> Full RSS 2.0 feeds, XML sitemaps, JSON APIs, and markdown mirrors (<code className="text-primary-light text-xs">/llms.txt</code> and <code className="text-primary-light text-xs">/agents.txt</code>) for programmatic consumption.</li>
                    <li><strong className="text-text-primary">Instant IndexNow Pings:</strong> Automatically notifies search engines the second a post is approved in Notion.</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-surface p-4 border border-card-border font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                  <span className="text-text-primary">Proof Stat: 30 blogs in 30 days, zero manual edits.</span>
                  <span className="text-emerald-400 font-semibold">100% Asset Uptime Verified</span>
                </div>
              </div>
            </div>

            {/* Case Study 3: 8-Agent Autonomous Fleet */}
            <div className="glass-card p-8 md:p-10 border border-card-border relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="category-pill bg-accent/15 text-accent-light text-xs font-mono">
                    INFRASTRUCTURE
                  </span>
                  <span className="category-pill bg-surface-light text-text-secondary text-xs font-mono">
                    MULTI-AGENT PLATFORM
                  </span>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Autonomous 8-Agent Production Fleet
              </h3>
              <p className="text-sm text-primary-light mb-6 font-mono">
                Dual Platform (Hermes + OpenClaw) &middot; REQ/ACK Protocol &middot; Self-Healing VPS
              </p>

              <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                    Architecture &amp; Roles
                  </h4>
                  <p>
                    Designed and deployed a fleet of 8 specialized systems with domain-specific boundaries: OWL (Technical Lead), Daniel (Web Engineer), Michael (Lead Research), Roy (Content Publishing), Hans (Social Distribution), Rex (Operations), SEO Specialist, and David (Video Production).
                  </p>
                  <ul className="mt-3 list-disc list-inside space-y-1.5 pl-2 text-text-secondary">
                    <li><strong className="text-text-primary">Inter-Agent Communication:</strong> Structured messaging protocol (REQ, ACK, INFO tags) over Discord and Telegram channels with strict file boundary safety.</li>
                    <li><strong className="text-text-primary">Self-Healing Services:</strong> Configured systemd service isolation with automatic restart triggers (<code className="text-primary-light text-xs">Restart=on-failure</code>, <code className="text-primary-light text-xs">StartLimitBurst=3</code>) ending gateway restart loops.</li>
                    <li><strong className="text-text-primary">Self-Hosted Marketing &amp; DB:</strong> Deployed Mautic 7 on Docker Compose with MySQL 8.4, executing 43 database migrations while preserving production data.</li>
                    <li><strong className="text-text-primary">Daily Autonomous Research:</strong> Scheduled cron jobs scanning AI hackathons, grants, and competitive intelligence without human intervention.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Case Study 4: Process Audit Scanner */}
            <div className="glass-card p-8 md:p-10 border border-card-border relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="category-pill bg-accent/15 text-accent-light text-xs font-mono">
                    WEB APPLICATION
                  </span>
                  <span className="category-pill bg-surface-light text-text-secondary text-xs font-mono">
                    LEAD ENGINE
                  </span>
                </div>
                <span className="text-xs font-mono text-text-muted">analyze.blockframe.cloud</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Process Audit Scanner
              </h3>
              <p className="text-sm text-primary-light mb-6 font-mono">
                Python Flask &middot; 6-Dimension AI Suitability Scoring &middot; Roadmap Generator
              </p>

              <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>
                  Built an interactive evaluation scanner evaluating business operations across 6 dimensions: Frequency, Volume, Complexity, Rule-based structure, Data Availability, and Integration readiness.
                </p>
                <p>
                  Features tailored industry templates (eCommerce, SaaS, Agency, Manufacturing, Healthcare, Finance) producing instant ROI estimates, AI maturity gap analysis, and automated consultation booking capture.
                </p>
              </div>
            </div>

          </section>

          {/* ------------------------------------------------------
              SECTION 04: ENGINEERING STANDARDS & GUARDRAILS
              ------------------------------------------------------ */}
          <section id="standards" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                04 &middot; ENGINEERING FRAMEWORK
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              How I Think &amp; Build
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-2xl">
              Strict engineering standards prevent costly bugs, eliminate hallucinations, and keep production systems online.
            </p>

            {/* 4 Pillars */}
            <div className="grid gap-6 md:grid-cols-2 mb-10">
              <div className="glass-card p-6 border border-card-border">
                <span className="font-mono text-xs text-primary-light font-semibold mb-2 block">PILLAR 1</span>
                <h3 className="text-base font-semibold text-text-primary mb-2">Real Flow Over Spec Ideals</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  The spec ideal is rarely what happens in production. Clocks drift, network sockets hang, and users send malformed inputs. I trace the real data flow end-to-end and patch root causes, not symptoms.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <span className="font-mono text-xs text-primary-light font-semibold mb-2 block">PILLAR 2</span>
                <h3 className="text-base font-semibold text-text-primary mb-2">Strict Domain Guardrails</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  An AI system that hallucinates dates, owners, or prices is a corporate liability. I enforce deterministic validation layers, schema bounds, and non-bypassable business rules.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <span className="font-mono text-xs text-primary-light font-semibold mb-2 block">PILLAR 3</span>
                <h3 className="text-base font-semibold text-text-primary mb-2">Multi-Model Resilience</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Upstream LLM providers experience outages and rate limits. Production systems must implement automated fallback chains, caching, and graceful degradation without crashing user sessions.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <span className="font-mono text-xs text-primary-light font-semibold mb-2 block">PILLAR 4</span>
                <h3 className="text-base font-semibold text-text-primary mb-2">Measurable Business Impact</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  The best code is the code that never had to be written. Every system built must eliminate a verifiable human bottleneck, reduce cycle time, or drive revenue.
                </p>
              </div>
            </div>

            {/* Interactive Quality Checklist Card (Inspired by the Reference Video) */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  PRODUCTION DEPLOYMENT ARTIFACT
                </span>
                <span className="text-[11px] font-mono text-primary-light">Interactive Guardrail Checklist</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Autonomous AI Systems Verification Checklist
              </h3>
              <p className="text-xs text-text-secondary mb-6">
                The minimum non-negotiable checklist executed before any autonomous system goes live in production:
              </p>

              <div className="space-y-3 font-mono text-xs">
                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-surface-light transition">
                  <input
                    type="checkbox"
                    checked={checklist.inputSanitization}
                    onChange={() => toggleCheck("inputSanitization")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.inputSanitization ? "text-text-primary" : "text-text-muted line-through"}>
                    Input boundary sanitization: strict character limits and injection filtering on all user prompts.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-surface-light transition">
                  <input
                    type="checkbox"
                    checked={checklist.domainGuardrails}
                    onChange={() => toggleCheck("domainGuardrails")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.domainGuardrails ? "text-text-primary" : "text-text-muted line-through"}>
                    Domain boundary lockdown: system prompt forbids hallucinating unlisted dates, prices, or inventory.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-surface-light transition">
                  <input
                    type="checkbox"
                    checked={checklist.floorPriceRules}
                    onChange={() => toggleCheck("floorPriceRules")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.floorPriceRules ? "text-text-primary" : "text-text-muted line-through"}>
                    Commercial profit margin locks: secret floor prices strictly enforced in code, not left to LLM discretion.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-surface-light transition">
                  <input
                    type="checkbox"
                    checked={checklist.multiModelFailover}
                    onChange={() => toggleCheck("multiModelFailover")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.multiModelFailover ? "text-text-primary" : "text-text-muted line-through"}>
                    Multi-model failover chain: secondary provider takes over automatically on 429/500 API responses.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-surface-light transition">
                  <input
                    type="checkbox"
                    checked={checklist.asyncQueueIsolation}
                    onChange={() => toggleCheck("asyncQueueIsolation")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.asyncQueueIsolation ? "text-text-primary" : "text-text-muted line-through"}>
                    Async event queue isolation: webhook responses acknowledge immediately; LLM processing handled off-thread.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-surface-light transition">
                  <input
                    type="checkbox"
                    checked={checklist.sentryTelemetry}
                    onChange={() => toggleCheck("sentryTelemetry")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.sentryTelemetry ? "text-text-primary" : "text-text-muted line-through"}>
                    Live telemetry &amp; error alerts: Sentry tracking active with stack trace capture and automated alerting.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-surface-light transition">
                  <input
                    type="checkbox"
                    checked={checklist.systemdRecovery}
                    onChange={() => toggleCheck("systemdRecovery")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.systemdRecovery ? "text-text-primary" : "text-text-muted line-through"}>
                    Infrastructure fault tolerance: systemd service isolation with Restart=on-failure policy verified.
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 05: TECH STACK & TOOLS
              ------------------------------------------------------ */}
          <section id="stack" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                05 &middot; TOOLS &amp; TECHNOLOGIES
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              Technologies &amp; Ecosystem
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-2xl">
              A battle-tested stack spanning autonomous agent orchestration, low-level server environments, and modern edge web platforms.
            </p>

            <div className="space-y-6">
              
              <div className="glass-card p-6 border border-card-border">
                <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4">
                  AI Systems &amp; LLM Architecture
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {["Anthropic Claude (3.7 / 3.5)", "OpenAI GPT-4o", "OpenRouter", "Hermes Agent Platform", "OpenClaw Engine", "Prompt Architecture", "Vector Embeddings", "Multi-Agent Protocols", "Tool & Function Calling"].map((t) => (
                    <span key={t} className="rounded-md border border-card-border bg-surface px-3 py-1.5 text-xs font-mono text-text-primary hover:border-primary/50 transition">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4">
                  Frontend &amp; Full-Stack Applications
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Turbopack", "Framer Motion", "Python (FastAPI / Flask)", "RESTful APIs"].map((t) => (
                    <span key={t} className="rounded-md border border-card-border bg-surface px-3 py-1.5 text-xs font-mono text-text-primary hover:border-primary/50 transition">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4">
                  Databases, CMS &amp; Data Layers
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {["PostgreSQL", "MySQL 8.4", "Redis", "Supabase", "Notion API (Headless CMS)", "SQLX / Schema Migrations"].map((t) => (
                    <span key={t} className="rounded-md border border-card-border bg-surface px-3 py-1.5 text-xs font-mono text-text-primary hover:border-primary/50 transition">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4">
                  Infrastructure, Cloud &amp; DevOps
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {["Ubuntu Linux VPS", "Docker & Docker Compose", "Caddy (Automatic Let's Encrypt TLS)", "systemd Service Isolation", "Cloudflare DNS", "Vercel Edge Network", "Git / GitHub", "Bash Automation Scripts"].map((t) => (
                    <span key={t} className="rounded-md border border-card-border bg-surface px-3 py-1.5 text-xs font-mono text-text-primary hover:border-primary/50 transition">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4">
                  Messaging, FinTech &amp; Operations
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {["Meta WhatsApp Cloud API", "MTN Mobile Money API", "Orange Money", "Discord Bot APIs", "Telegram Bot APIs", "Mautic 7 Marketing Automation", "Sentry Observability"].map((t) => (
                    <span key={t} className="rounded-md border border-card-border bg-surface px-3 py-1.5 text-xs font-mono text-text-primary hover:border-primary/50 transition">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 06: CREDENTIALS & BACKGROUND
              ------------------------------------------------------ */}
          <section id="credentials" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                06 &middot; CREDENTIALS &amp; BACKGROUND
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              Certifications &amp; Experience
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-2xl">
              Backed by verified credentials in autonomous AI frameworks, cybersecurity fundamentals, and community leadership.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              
              <div className="glass-card p-6 border border-card-border">
                <div className="font-mono text-xs text-primary-light font-semibold mb-2">ANTHROPIC CLAUDE ACADEMY &middot; 2026</div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  AI Fluency Framework Foundations
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Verified certification on foundational principles of large language models, prompt orchestration, and domain-bounded system performance.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <div className="font-mono text-xs text-primary-light font-semibold mb-2">ANTHROPIC CLAUDE ACADEMY &middot; 2026</div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Building Effective Human-Agent Teams
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Advanced certification focusing on multi-agent collaboration, human-in-the-loop controls, task delegation boundaries, and operational safety.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <div className="font-mono text-xs text-emerald-400 font-semibold mb-2">EC-COUNCIL &middot; CYBERSECURITY</div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Ethical Hacking Essentials (EHE)
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Core competencies in penetration testing fundamentals, vulnerability identification, web threat vectors, and defense mechanisms.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <div className="font-mono text-xs text-emerald-400 font-semibold mb-2">EC-COUNCIL &middot; CYBERSECURITY</div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Network Defense Essentials (NDE)
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Certified in network infrastructure protection, port management, firewall configuration, encryption protocols, and intrusion detection.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <div className="font-mono text-xs text-emerald-400 font-semibold mb-2">EC-COUNCIL &middot; CYBERSECURITY</div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Certified Secure Computer User (CSCU)
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Comprehensive training in endpoint security, identity protection, phishing countermeasures, and data risk management.
                </p>
              </div>

              <div className="glass-card p-6 border border-card-border">
                <div className="font-mono text-xs text-text-muted font-semibold mb-2">LEADERSHIP &amp; COMMUNITY</div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Avocado DAO &middot; Marketing &amp; Operations
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Official Certificate of Employment and Letter of Recommendation recognized for initiative, user onboarding, and operational reliability across large-scale Web3 gaming communities.
                </p>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 07: WORK WITH ME / CTA
              ------------------------------------------------------ */}
          <section id="contact" className="scroll-mt-32">
            <div className="glass-card p-8 md:p-12 border border-card-border rounded-2xl relative overflow-hidden">
              <div className="hero-radial-glow opacity-30 z-[-1]" />
              
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light block mb-3">
                  07 &middot; GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-4">
                  Your business has work to get done. Let's make it autonomous.
                </h2>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
                  Whether you are looking to deploy a conversational WhatsApp commerce engine, automate complex multi-agent workflows, or build resilient cloud infrastructure, I bring architectural clarity and hands-on execution.
                </p>

                {/* Working Availability Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-mono text-xs">
                  <div className="rounded-lg bg-surface p-4 border border-card-border">
                    <span className="text-text-muted block mb-1">// Setup</span>
                    <span className="text-text-primary font-semibold">Global Remote</span>
                  </div>
                  <div className="rounded-lg bg-surface p-4 border border-card-border">
                    <span className="text-text-muted block mb-1">// Time Zone</span>
                    <span className="text-text-primary font-semibold">WAT (UTC+1)</span>
                  </div>
                  <div className="rounded-lg bg-surface p-4 border border-card-border">
                    <span className="text-text-muted block mb-1">// Engagement</span>
                    <span className="text-primary-light font-semibold">Advisory &amp; Build</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={calendlyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-text-primary px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-85 shadow-lg"
                  >
                    <span>Schedule a 30-Min Call</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a
                    href={emailHref}
                    className="inline-flex items-center gap-2 rounded border border-card-border bg-surface px-6 py-3.5 text-sm font-medium text-text-secondary transition hover:bg-surface-light hover:text-text-primary"
                  >
                    <span>Email Me Directly</span>
                  </a>
                  <a
                    href={groplyRepoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-card-border bg-surface px-6 py-3.5 text-sm font-medium text-primary-light transition hover:bg-surface-light"
                  >
                    <span>View Groply Repo</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
