"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const calendlyHref = "https://calendly.com/blockframemedia/30min";
const emailHref = "mailto:sergeolisco@gmail.com?subject=Project%20or%20Advisory%20Inquiry%20for%20Sergeo";
const groplyRepoHref = "https://github.com/Sergeo01/Groply-Open-Core-Autonomous-AI-Commerce-Engine";
const ignitionTopGgHref = "https://top.gg/bot/1388870348841287690";
const ignitionDiscordHref = "https://discord.com/discovery/applications/1388870348841287690";

const navSections = [
  { id: "about", label: "01  About & Thesis" },
  { id: "problems", label: "02  Problems I Solve" },
  { id: "systems", label: "03  Systems & Case Studies" },
  { id: "discord-bots", label: "04  Custom Discord Bots" },
  { id: "web3-gaming", label: "05  Web3 Gaming & Media" },
  { id: "artifacts", label: "06  Work Samples & Proofs" },
  { id: "stack", label: "07  Tech Stack & Ecosystem" },
  { id: "credentials", label: "08  Verified Certifications" },
  { id: "contact", label: "09  Work With Me" },
];

interface LightboxItem {
  src: string;
  title: string;
  subtitle?: string;
  verifyHref?: string;
}

export default function PortfolioClient() {
  const [activeSection, setActiveSection] = useState("about");
  const [activeLightbox, setActiveLightbox] = useState<LightboxItem | null>(null);
  const [checklist, setChecklist] = useState({
    inputSanitization: true,
    domainGuardrails: true,
    floorPriceRules: true,
    multiModelFailover: true,
    asyncQueueIsolation: true,
    sentryTelemetry: true,
    systemdRecovery: true,
    antiPhishingShield: true,
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
      
      {/* Lightbox Modal for Certificate / Proof Inspection */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-opacity"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-primary/40 bg-surface p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-card-border">
              <div>
                <h4 className="text-base font-bold text-text-primary">{activeLightbox.title}</h4>
                {activeLightbox.subtitle && (
                  <p className="text-xs text-text-muted font-mono">{activeLightbox.subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {activeLightbox.verifyHref && (
                  <a
                    href={activeLightbox.verifyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded bg-primary/15 border border-primary/40 px-3 py-1 text-xs font-mono text-primary-light hover:bg-primary/25 transition"
                  >
                    <span>Verify Credential</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="rounded-lg bg-surface-light px-3 py-1 text-xs font-semibold text-text-secondary hover:text-white transition"
                  aria-label="Close modal"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="relative h-[65vh] w-full rounded-lg overflow-hidden bg-background/50 flex items-center justify-center">
              <Image
                src={activeLightbox.src}
                alt={activeLightbox.title}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          </div>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-14 xl:grid-cols-[320px_1fr]">
        
        {/* ========================================================
            LEFT STICKY SIDEBAR (Executive Identity & Navigation)
            ======================================================== */}
        <aside className="mb-14 lg:mb-0">
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* Identity Card */}
            <div className="glass-card p-6 border border-card-border">
              {/* Official 3D BlockFrame Emblem */}
              <div className="mb-5 flex items-center justify-between">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-primary/40 p-2 shadow-[0_0_25px_rgba(0,179,191,0.25)]">
                  <Image
                    src="/images/blockframe-3d-badge.png"
                    alt="BlockFrame Labs Badge"
                    width={56}
                    height={56}
                    className="object-contain drop-shadow"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-primary/40 text-[9px] font-mono text-primary-light">
                    &gt;_
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1">
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
                Designing, deploying, and hardening autonomous AI systems, custom Discord bots, conversational commerce engines, and resilient cloud infrastructure.
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
                <span className="text-primary-light font-medium">Autonomous Systems &amp; Bots</span>
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
                From low-level Linux VPS servers and containerized agent fleets to custom verified Discord automation platforms, trilingual conversational commerce engines, and deterministic publishing pipelines, my focus is always on building systems that operate 24/7 with strict reliability and measurable business outcomes.
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
                <span className="font-mono text-3xl font-bold text-text-primary block mb-1">Verified</span>
                <span className="text-xs text-text-muted leading-tight block">Custom Discord Bots (Ignition)</span>
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
                <div className="font-mono text-xs text-primary-light font-semibold mb-3">02 / DISCORD &amp; COMMUNITY AUTOMATION</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Custom Discord Bots for Any Server &amp; Task
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Building bespoke, verified Discord bots for onboarding funnels, gamified quizzes, tournaments, automated ticketing, moderation, server-wide economies, and custom API webhooks for communities of any scale.
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
          <section id="systems" className="scroll-mt-32 space-y-12">
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

                {/* VISUAL PROOF ARTIFACT: Realistic WhatsApp Chat Simulator */}
                <div className="rounded-xl border border-card-border bg-[#0b141a] p-5 shadow-inner">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <span className="text-text-primary font-semibold">WhatsApp Business &middot; Groply AI Sales Rep</span>
                    </div>
                    <span className="text-text-muted">Autonomous Session #BF-9042</span>
                  </div>

                  <div className="space-y-3 font-sans text-xs max-w-lg">
                    {/* Customer Message */}
                    <div className="flex justify-start">
                      <div className="rounded-lg bg-[#202c33] p-3 text-text-primary max-w-[85%] shadow-sm">
                        <p className="font-semibold text-[10px] text-emerald-400 mb-0.5">Customer &middot; +237 671... </p>
                        <p>Hey boss, how much for the Nike Air sneakers in size 43? Can you do 20,000 FCFA?</p>
                        <span className="text-[9px] text-text-muted float-right mt-1">10:14 PM</span>
                      </div>
                    </div>

                    {/* Groply AI Response */}
                    <div className="flex justify-end">
                      <div className="rounded-lg bg-[#005c4b] p-3 text-white max-w-[85%] shadow-sm space-y-2">
                        <p className="font-semibold text-[10px] text-emerald-200">Groply Autonomous Rep</p>
                        <p>
                          Hello! Size 43 is available in Black/Cyan. Normal retail price is 26,000 FCFA. 
                          The best I can do tonight is <strong>22,500 FCFA</strong> with same-day parcel dispatch via Touristique Express to Yaoundé. Would that work for you?
                        </p>
                        <div className="pt-2 border-t border-emerald-600/50 flex flex-col gap-1.5">
                          <button className="w-full bg-[#111b21] hover:bg-[#202c33] text-emerald-300 font-semibold py-1.5 px-3 rounded text-[11px] text-center border border-emerald-500/30">
                            &check; Accept 22,500 FCFA &amp; Order
                          </button>
                          <button className="w-full bg-[#111b21]/60 hover:bg-[#202c33] text-white py-1 px-3 rounded text-[10px] text-center">
                            Browse Storefront Sheet (&lt;25KB)
                          </button>
                        </div>
                        <span className="text-[9px] text-emerald-200/80 float-right">10:14 PM &middot; Automated in 1.4s</span>
                      </div>
                    </div>
                  </div>
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

                {/* VISUAL PROOF ARTIFACT: Pipeline Flowchart */}
                <div className="rounded-xl border border-card-border bg-surface p-5">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-3">
                    // Pipeline Execution Flowchart
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
                    <div className="rounded-lg bg-surface-light p-3 border border-card-border flex flex-col justify-center">
                      <span className="text-primary-light font-bold mb-1">01. NOTION</span>
                      <span className="text-text-muted text-[11px]">Post marked Approved</span>
                    </div>
                    <div className="rounded-lg bg-surface-light p-3 border border-card-border flex flex-col justify-center">
                      <span className="text-primary-light font-bold mb-1">02. ASSET CACHE</span>
                      <span className="text-text-muted text-[11px]">Downloads &amp; localizes S3 files</span>
                    </div>
                    <div className="rounded-lg bg-surface-light p-3 border border-card-border flex flex-col justify-center">
                      <span className="text-primary-light font-bold mb-1">03. EDGE REVALIDATE</span>
                      <span className="text-text-muted text-[11px]">Next.js ISR instant cache purge</span>
                    </div>
                    <div className="rounded-lg bg-surface-light p-3 border border-card-border flex flex-col justify-center">
                      <span className="text-primary-light font-bold mb-1">04. SYNDICATION</span>
                      <span className="text-text-muted text-[11px]">IndexNow + RSS + LLMs.txt</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-surface p-4 border border-card-border font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                  <span className="text-text-primary">Proof Stat: 30 blogs in 30 days, zero manual edits.</span>
                  <span className="text-emerald-400 font-semibold">&check; 100% Asset Uptime Verified</span>
                </div>
              </div>
            </div>

            {/* Case Study 3: 8-Agent Fleet */}
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

              {/* VISUAL PROOF ARTIFACT: Production Terminal Console */}
              <div className="rounded-xl border border-card-border bg-[#0d1117] p-4 font-mono text-xs text-text-secondary shadow-2xl overflow-x-auto">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                  <span className="text-text-muted text-[11px] ml-2">root@blockframe-vps:~ (systemctl status &middot; fleet-orchestration)</span>
                </div>
                <div className="space-y-1 text-[11px] leading-relaxed">
                  <p><span className="text-emerald-400 font-bold">&bull; hermes-gateway.service</span> - Multi-Agent Gateway Daemon</p>
                  <p className="text-text-muted">&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/hermes-gateway.service; enabled)</p>
                  <p className="text-text-muted">&nbsp;&nbsp;Active: <span className="text-emerald-400 font-semibold">active (running)</span> since Thu 2026-10-22 08:12:04 UTC; 4 days ago</p>
                  <p className="text-text-muted">&nbsp;&nbsp;Restart Policy: Restart=on-failure; StartLimitBurst=3; RestartSec=120</p>
                  <p className="text-primary-light mt-2">[FLEET PROTOCOL LOG]</p>
                  <p><span className="text-blue-400">[REQ:OWL-&gt;DANIEL]</span> Audit Next.js build bundle &amp; verify image localization</p>
                  <p><span className="text-emerald-400">[ACK:DANIEL-&gt;OWL]</span> 51/51 routes statically generated in 3.7s; 0 broken assets</p>
                  <p><span className="text-yellow-400">[INFO:ROY-&gt;HANS]</span> Article published to Notion; IndexNow pings verified</p>
                </div>
              </div>
            </div>

          </section>

          {/* ------------------------------------------------------
              SECTION 04: CUSTOM DISCORD BOTS (Ignition & Prime Ops)
              ------------------------------------------------------ */}
          <section id="discord-bots" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  04 &middot; DISCORD BOT ARCHITECTURE
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Custom Discord Bots for Any Server &amp; Task
              </h2>
              <p className="text-base text-text-secondary max-w-2xl">
                I build bespoke, verified Discord applications engineered for community onboarding, automated economies, interactive tournaments, security, and administrative operations.
              </p>
            </div>

            {/* Ignition Bot Showcase Card */}
            <div className="glass-card p-8 md:p-10 border border-card-border relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-primary/40 bg-surface shadow-md">
                    <Image
                      src="/images/ignition-icon.png"
                      alt="Ignition Discord Bot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary">Ignition</h3>
                      <span className="rounded bg-[#5865f2]/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#5865f2] border border-[#5865f2]/40">
                        &check; VERIFIED BOT
                      </span>
                    </div>
                    <span className="text-xs text-text-muted font-mono">App ID: 1388870348841287690</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={ignitionDiscordHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-[#5865f2] hover:bg-[#4752c4] px-4 py-2 text-xs font-semibold text-white transition shadow-sm"
                  >
                    <span>Discord App Directory</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a
                    href={ignitionTopGgHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-card-border bg-surface hover:bg-surface-light px-4 py-2 text-xs font-medium text-text-secondary transition"
                  >
                    <span>Top.gg Listing</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Ignition is a verified Discord application that helps communities educate, engage, and reward members through interactive gamified workflows, competitive tournaments, and a built-in server marketplace.
              </p>

              {/* Core Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mb-8 font-mono text-xs">
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Quizzes &amp; Trivia</span>
                  <span className="text-text-muted text-[10px]">Educational engagement</span>
                </div>
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Raffles &amp; Giveaways</span>
                  <span className="text-text-muted text-[10px]">Verifiable fair draws</span>
                </div>
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Tournaments</span>
                  <span className="text-text-muted text-[10px]">Live leaderboards</span>
                </div>
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Guilds &amp; Teams</span>
                  <span className="text-text-muted text-[10px]">Group collaboration</span>
                </div>
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Server Marketplace</span>
                  <span className="text-text-muted text-[10px]">Reward redemptions</span>
                </div>
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Smart Onboarding</span>
                  <span className="text-text-muted text-[10px]">Automated role gates</span>
                </div>
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Q&amp;A Systems</span>
                  <span className="text-text-muted text-[10px]">Community knowledgebase</span>
                </div>
                <div className="rounded bg-surface p-2.5 border border-card-border text-center">
                  <span className="text-primary-light font-semibold block">&bull; Credits &amp; Economy</span>
                  <span className="text-text-muted text-[10px]">Custom token balance</span>
                </div>
              </div>

              {/* VISUAL PROOF ARTIFACT: Realistic Discord Embed Preview */}
              <div className="rounded-xl border border-card-border bg-[#313338] p-5 font-sans text-xs text-[#dbdee1] shadow-2xl max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-[#1e1f22]">
                    <Image src="/images/ignition-icon.png" alt="Ignition" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white text-sm">Ignition</span>
                      <span className="rounded bg-[#5865f2] px-1.5 py-0.2 text-[10px] font-semibold text-white uppercase">
                        APP
                      </span>
                    </div>
                    <span className="text-[10px] text-[#949ba4]">Today at 9:42 PM &middot; /tournament join</span>
                  </div>
                </div>

                {/* Discord Embed Box */}
                <div className="rounded border-l-4 border-l-[#5865f2] bg-[#2b2d31] p-4 space-y-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-white block">
                    &bull; Weekly Server Championship &middot; Round 3
                  </span>
                  <p className="text-xs text-[#dbdee1] leading-relaxed">
                    Welcome to the tournament arena! Solve the cybersecurity riddle to earn <strong>250 Community Credits</strong> and advance your guild on the leaderboard.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono border-t border-white/5">
                    <div>
                      <span className="text-[#949ba4] block">Current Leader:</span>
                      <span className="text-white font-semibold">Alpha Guild (1,450 pts)</span>
                    </div>
                    <div>
                      <span className="text-[#949ba4] block">Prize Pool:</span>
                      <span className="text-emerald-400 font-semibold">50,000 Credits</span>
                    </div>
                  </div>
                </div>

                {/* Discord Interactive Buttons */}
                <div className="flex flex-wrap gap-2 pt-3">
                  <button className="rounded bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold px-3 py-1.5 text-xs transition">
                    &bull; Join Tournament
                  </button>
                  <button className="rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white px-3 py-1.5 text-xs transition">
                    Open Marketplace
                  </button>
                  <button className="rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white px-3 py-1.5 text-xs transition">
                    View Leaderboard
                  </button>
                </div>
              </div>

            </div>

            {/* Prime Ops Showcase */}
            <div className="glass-card p-8 md:p-10 border border-card-border relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-primary/40 bg-surface shadow-md p-1">
                    <Image
                      src="/images/blockframe-bot-avatar.png"
                      alt="Prime Ops Bot"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary">Prime Ops</h3>
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/40">
                        &check; INTERNAL SECURITY
                      </span>
                    </div>
                    <span className="text-xs text-text-muted font-mono">Operations &amp; Community Shield</span>
                  </div>
                </div>

                <span className="rounded-full border border-card-border bg-surface px-3 py-1 text-xs font-mono text-text-muted">
                  Private HQ Deployment
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Engineered and deployed for my own private community server (Prime Nexus / BlockFrame HQ). Prime Ops acts as the central command bot handling member onboarding, ticket triage, scam link neutralization, and autonomous server-health alerts.
              </p>

              {/* VISUAL PROOF ARTIFACT: Prime Ops Security Action Embed */}
              <div className="rounded-xl border border-card-border bg-[#313338] p-5 font-sans text-xs text-[#dbdee1] shadow-2xl max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-[#1e1f22]">
                    <Image src="/images/blockframe-bot-avatar.png" alt="Prime Ops" fill className="object-contain p-0.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white text-sm">Prime Ops</span>
                      <span className="rounded bg-[#5865f2] px-1.5 py-0.2 text-[10px] font-semibold text-white uppercase">
                        APP
                      </span>
                    </div>
                    <span className="text-[10px] text-[#949ba4]">Automated Incident &middot; Security Protocol</span>
                  </div>
                </div>

                {/* Prime Ops Security Embed Box */}
                <div className="rounded border-l-4 border-l-emerald-500 bg-[#2b2d31] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400">
                      🛡️ Phishing Link Intercepted &amp; Quarantined
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">AutoMod Rule #04</span>
                  </div>
                  <p className="text-xs text-[#dbdee1] leading-relaxed">
                    Malicious impersonation URL quarantined in <code className="text-primary-light">#general-chat</code>. Sender temporarily muted. Incident logged to Sentry telemetry and moderation log channel.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-text-muted border-t border-white/5 flex items-center justify-between">
                    <span>Target: Phish / Fake AirDrop Vector</span>
                    <span className="text-emerald-400 font-semibold">Status: Cleaned (0.3s)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-surface p-4 border border-card-border font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                <span className="text-text-primary">Need a custom bot for your Discord or Telegram community?</span>
                <a href={calendlyHref} target="_blank" rel="noopener noreferrer" className="text-primary-light font-semibold hover:underline">
                  Let&apos;s build it &rarr;
                </a>
              </div>
            </div>

          </section>

          {/* ------------------------------------------------------
              SECTION 05: WEB3 GAMING & MEDIA PRODUCTION
              ------------------------------------------------------ */}
          <section id="web3-gaming" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  05 &middot; WEB3 GAMING &amp; MEDIA
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Web3 Gaming, Ambassador &amp; Media Production
              </h2>
              <p className="text-base text-text-secondary max-w-2xl">
                Direct experience driving player acquisition, live tournament broadcasting, video content creation, and community moderation across top Web3 titles.
              </p>
            </div>

            {/* Showcase Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Villains Robot Battle Royale Card */}
              <div className="glass-card p-6 border border-card-border rounded-xl flex flex-col justify-between">
                <div>
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-lg border border-card-border mb-4 cursor-pointer group"
                    onClick={() => setActiveLightbox({
                      src: "/images/villains-robot-battle-royale.webp",
                      title: "Villains: Robot Battle Royale",
                      subtitle: "Birdy Inc · Official Ambassador & Content Creation"
                    })}
                  >
                    <Image
                      src="/images/villains-robot-battle-royale.webp"
                      alt="Villains Robot Battle Royale"
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="rounded bg-black/75 px-3 py-1 text-xs font-mono text-white">
                        Click to enlarge 🔍
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-1">
                    BIRDY INC &middot; OFFICIAL AMBASSADOR
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    Villains: Robot Battle Royale
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    Content creator and community ambassador. Led player outreach, created game strategy walkthroughs, live-streamed tournament showdowns, and managed community events.
                  </p>
                </div>
                <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Role: Ambassador &amp; Creator</span>
                  <span className="text-primary-light">Web3 Esports</span>
                </div>
              </div>

              {/* Voxie Tactics Card */}
              <div className="glass-card p-6 border border-card-border rounded-xl flex flex-col justify-between">
                <div>
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-lg border border-card-border mb-4 cursor-pointer group bg-background/50 flex items-center justify-center"
                    onClick={() => setActiveLightbox({
                      src: "/images/immutable-gaming-banner.webp",
                      title: "Immutable Web3 Gaming & Voxie Tactics",
                      subtitle: "AlwaysGeeky Games / Avocado DAO · Creator & Moderator"
                    })}
                  >
                    <Image
                      src="/images/immutable-gaming-banner.webp"
                      alt="Immutable Web3 Gaming"
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="rounded bg-black/75 px-3 py-1 text-xs font-mono text-white">
                        Click to enlarge 🔍
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-md border border-primary/40">
                      <Image src="/images/voxie-tactics.webp" alt="Voxie Tactics" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-primary-light font-semibold">
                        ALWAYSGEEKY GAMES &middot; AMBASSADOR
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Voxie Tactics &amp; Web3 Guilds
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    Ambassador and community moderator for Voxie Tactics (tactical RPG on Polygon). Onboarded hundreds of players, authored meta guides, and supported gaming scholarship programs.
                  </p>
                </div>
                <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Role: Community Moderator</span>
                  <span className="text-primary-light">Tactical RPG</span>
                </div>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 06: WORK SAMPLES & PRODUCTION PROOFS
              ------------------------------------------------------ */}
          <section id="artifacts" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  06 &middot; WORK SAMPLES &amp; ARTIFACTS
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Visible Proof of Work &amp; Frameworks
              </h2>
              <p className="text-base text-text-secondary max-w-2xl">
                Just like in top technical auditing, here are the real prompt templates, security frameworks, studio media assets, and execution checklists used across my systems.
              </p>
            </div>

            {/* Artifact 1: Studio Media Production & Visual Assets */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  MEDIA &amp; STUDIO INFRASTRUCTURE
                </span>
                <span className="text-[11px] font-mono text-primary-light">BlockFrame Creative Pipeline</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                AI &amp; Web3 Studio Video Automation Assets
              </h3>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                Automated multi-modal studio pipelines: generating AI avatars, broadcast backgrounds, dynamic overlays, and high-CTR thumbnails.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div
                  className="relative aspect-video w-full overflow-hidden rounded-lg border border-card-border cursor-pointer group"
                  onClick={() => setActiveLightbox({
                    src: "/images/ai-web3-studio-banner.webp",
                    title: "AI & Web3 Virtual Studio Environment",
                    subtitle: "Multi-monitor AI avatar studio production asset"
                  })}
                >
                  <Image
                    src="/images/ai-web3-studio-banner.webp"
                    alt="AI and Web3 Studio Banner"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="rounded bg-black/75 px-3 py-1 text-xs font-mono text-white">
                      Click to inspect 🔍
                    </span>
                  </div>
                </div>

                <div
                  className="relative aspect-video w-full overflow-hidden rounded-lg border border-card-border cursor-pointer group"
                  onClick={() => setActiveLightbox({
                    src: "/images/blockframe-cinematic-banner.webp",
                    title: "BlockFrame 3D Cinematic Visual Engine",
                    subtitle: "High-speed optical film reel and frame branding asset"
                  })}
                >
                  <Image
                    src="/images/blockframe-cinematic-banner.webp"
                    alt="BlockFrame Cinematic Banner"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="rounded bg-black/75 px-3 py-1 text-xs font-mono text-white">
                      Click to inspect 🔍
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Artifact 2: The Production Prompt Architecture */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  PRODUCTION SYSTEM PROMPT ARTIFACT
                </span>
                <span className="text-[11px] font-mono text-primary-light">Groply Anti-Hallucination &amp; Haggling Guard</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                The Prompt Specification &amp; Boundary Rules
              </h3>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                Firm boundaries ensure conversational agents never invent dates, speculate on stock, or breach merchant floor margins:
              </p>

              {/* Code / Prompt Box */}
              <div className="rounded-lg bg-[#0d1117] p-5 border border-card-border font-mono text-xs text-text-secondary leading-relaxed overflow-x-auto">
                <span className="text-emerald-400 block mb-2 font-bold">// SYSTEM PROMPT &middot; DOMAIN BOUNDARIES</span>
                <p className="text-text-primary mb-2">
                  You are Groply, an expert trilingual sales coordinator for local commerce. You strictly represent the merchant&apos;s verified inventory.
                </p>
                <div className="space-y-1 text-text-secondary pl-3 border-l-2 border-primary/40">
                  <p>1. <strong className="text-white">Strict Truth Anchor:</strong> Never invent inventory quantities, colors, or sizes. If not specified in the database, declare &apos;Pending merchant confirmation&apos;.</p>
                  <p>2. <strong className="text-white">Price Negotiation Rule:</strong> Current listed price = P_retail. Minimum floor price = P_floor. If customer negotiates below P_retail, counter-offer between (P_retail - 0.5 &times; delta) and P_floor. Never dip below P_floor under any circumstances.</p>
                  <p>3. <strong className="text-white">Trilingual Tone:</strong> Detect user language (English, French, or Cameroonian Pidgin) and reply with high cultural fluency and warmth.</p>
                  <p>4. <strong className="text-white">Payment Rail Verification:</strong> Only generate order codes when user selects confirmed payment option (MTN MoMo, Orange Money, or Bus Waybill).</p>
                </div>
              </div>
            </div>

            {/* Artifact 3: Interactive QA & Guardrail Checklist */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  DEPLOYMENT VERIFICATION CHECKLIST
                </span>
                <span className="text-[11px] font-mono text-primary-light">Interactive System QA</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Production Readiness &amp; Safety Checklist
              </h3>
              <p className="text-xs text-text-secondary mb-6">
                The non-negotiable verification gates executed before any autonomous system or bot goes live:
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
                    Domain boundary lockdown: system prompt strictly forbids hallucinating unlisted dates, prices, or inventory.
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
                    checked={checklist.antiPhishingShield}
                    onChange={() => toggleCheck("antiPhishingShield")}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className={checklist.antiPhishingShield ? "text-text-primary" : "text-text-muted line-through"}>
                    Community safety &amp; anti-phishing: Discord auto-mod link scanners and verified role gates active.
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
                    Live telemetry &amp; error alerts: Sentry tracking active with real-time stack trace alerts.
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
                    Infrastructure fault tolerance: systemd service isolation with Restart=on-failure verified.
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 07: TECH STACK & TOOLS
              ------------------------------------------------------ */}
          <section id="stack" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                07 &middot; TOOLS &amp; TECHNOLOGIES
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              Technologies &amp; Ecosystem
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-2xl">
              A battle-tested stack spanning autonomous agent orchestration, Discord bot development, low-level server environments, and modern edge web platforms.
            </p>

            <div className="space-y-6">
              
              <div className="glass-card p-6 border border-card-border">
                <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-4">
                  Discord &amp; Community Bot Engineering
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {["Discord API / Gateway", "discord.js / discord.py", "Slash Commands & Subcommands", "Interactive Embeds & Buttons", "Top.gg Integration", "AutoMod & Anti-Spam", "OAuth2 Server Verification"].map((t) => (
                    <span key={t} className="rounded-md border border-card-border bg-surface px-3 py-1.5 text-xs font-mono text-text-primary hover:border-primary/50 transition">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

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

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 08: VERIFIED CERTIFICATIONS & HISTORY
              ------------------------------------------------------ */}
          <section id="credentials" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                08 &middot; VERIFIED CREDENTIALS
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              Official Certifications &amp; Credentials
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-2xl">
              Backed by authentic, verifiable badges and certificates across AI systems, ethical hacking, network defense, and community operations. Click any credential to inspect the full document.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
              {/* 1. Claude Academy: AI Fluency */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-primary/50 transition"
                onClick={() => setActiveLightbox({
                  src: "/images/badge-ai-fluency.webp",
                  title: "AI Fluency: Framework and Foundations",
                  subtitle: "Anthropic Claude Academy · Issued Nov 4, 2026",
                  verifyHref: "https://academy.claude.com/verify/cd849217aa52d99682e3beecb73d47ca"
                })}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50 border border-card-border mb-3 group-hover:scale-[1.02] transition">
                    <Image
                      src="/images/badge-ai-fluency.webp"
                      alt="Claude Academy AI Fluency Badge"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-primary-light font-semibold mb-1">
                    CLAUDE ACADEMY &middot; 2026
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    AI Fluency: Framework &amp; Foundations
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Foundational LLM principles, prompt architecture, and domain-bounded system performance.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="text-emerald-400 font-semibold">&check; Verified Badge</span>
                  <span className="text-primary-light group-hover:underline">Inspect &rarr;</span>
                </div>
              </div>

              {/* 2. Claude Academy: Human-Agent Teams */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-primary/50 transition"
                onClick={() => setActiveLightbox({
                  src: "/images/badge-human-agent-teams.webp",
                  title: "Building Effective Human-Agent Teams",
                  subtitle: "Anthropic Claude Academy · Issued Nov 4, 2026",
                  verifyHref: "https://academy.claude.com/verify/579caba171a9c9cf67648125d7f68d64"
                })}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50 border border-card-border mb-3 group-hover:scale-[1.02] transition">
                    <Image
                      src="/images/badge-human-agent-teams.webp"
                      alt="Claude Academy Human-Agent Teams Badge"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-primary-light font-semibold mb-1">
                    CLAUDE ACADEMY &middot; 2026
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    Building Human-Agent Teams
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Multi-agent coordination, human-in-the-loop control, delegation boundaries, and safety.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="text-emerald-400 font-semibold">&check; Verified Badge</span>
                  <span className="text-primary-light group-hover:underline">Inspect &rarr;</span>
                </div>
              </div>

              {/* 3. EC-Council: Ethical Hacking Essentials (EHE) */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-primary/50 transition"
                onClick={() => setActiveLightbox({
                  src: "/images/cert-ecc-ehe.webp",
                  title: "Ethical Hacking Essentials (EHE)",
                  subtitle: "EC-Council · Cert #ECC8316945270"
                })}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50 border border-card-border mb-3 group-hover:scale-[1.02] transition">
                    <Image
                      src="/images/cert-ecc-ehe.webp"
                      alt="EC-Council Ethical Hacking Essentials Certificate"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">
                    EC-COUNCIL &middot; ECC8316945270
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    Ethical Hacking Essentials
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Penetration testing fundamentals, web application vulnerability identification, and mitigation.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="text-emerald-400 font-semibold">&check; Official Cert</span>
                  <span className="text-primary-light group-hover:underline">Inspect &rarr;</span>
                </div>
              </div>

              {/* 4. EC-Council: Network Defense Essentials (NDE) */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-primary/50 transition"
                onClick={() => setActiveLightbox({
                  src: "/images/cert-ecc-nde.webp",
                  title: "Network Defense Essentials (NDE)",
                  subtitle: "EC-Council · Cert #ECC6219384570"
                })}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50 border border-card-border mb-3 group-hover:scale-[1.02] transition">
                    <Image
                      src="/images/cert-ecc-nde.webp"
                      alt="EC-Council Network Defense Essentials Certificate"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">
                    EC-COUNCIL &middot; ECC6219384570
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    Network Defense Essentials
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Network security protocols, port hardening, firewall rules, encryption, and intrusion detection.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="text-emerald-400 font-semibold">&check; Official Cert</span>
                  <span className="text-primary-light group-hover:underline">Inspect &rarr;</span>
                </div>
              </div>

              {/* 5. EC-Council: Certified Secure Computer User (CSCU) */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-primary/50 transition"
                onClick={() => setActiveLightbox({
                  src: "/images/cert-ecc-cscu.webp",
                  title: "Certified Secure Computer User (CSCU)",
                  subtitle: "EC-Council · Cert #ECC2901748365"
                })}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50 border border-card-border mb-3 group-hover:scale-[1.02] transition">
                    <Image
                      src="/images/cert-ecc-cscu.webp"
                      alt="EC-Council Certified Secure Computer User Certificate"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-1">
                    EC-COUNCIL &middot; ECC2901748365
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    Certified Secure Computer User
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Endpoint protection, identity theft defense, anti-phishing hygiene, and data risk governance.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="text-emerald-400 font-semibold">&check; Official Cert</span>
                  <span className="text-primary-light group-hover:underline">Inspect &rarr;</span>
                </div>
              </div>

              {/* 6. Avocado DAO: Proof of Employment & Recommendation */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-primary/50 transition"
                onClick={() => setActiveLightbox({
                  src: "/images/avocado-dao-coe.webp",
                  title: "Avocado DAO · Certificate of Employment & Recommendation",
                  subtitle: "David Shi, Chief of Operations (COO) · Avocado IDO Limited"
                })}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50 border border-card-border mb-3 group-hover:scale-[1.02] transition">
                    <Image
                      src="/images/avocado-dao-coe.webp"
                      alt="Avocado DAO Proof of Employment Letter"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-text-muted font-semibold mb-1">
                    AVOCADO DAO &middot; LEADERSHIP
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    Marketing &amp; Community Operations
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Recognized by COO David Shi for community onboarding, campaign execution, and team reliability.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="text-emerald-400 font-semibold">&check; Official Letter</span>
                  <span className="text-primary-light group-hover:underline">Inspect &rarr;</span>
                </div>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 09: WORK WITH ME / CTA
              ------------------------------------------------------ */}
          <section id="contact" className="scroll-mt-32">
            <div className="glass-card p-8 md:p-12 border border-card-border rounded-2xl relative overflow-hidden">
              <div className="hero-radial-glow opacity-30 z-[-1]" />
              
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light block mb-3">
                  09 &middot; GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-4">
                  Your business has work to get done. Let&apos;s make it autonomous.
                </h2>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
                  Whether you are looking to deploy custom Discord bots, an autonomous conversational commerce engine, or resilient multi-agent infrastructure, I bring architectural clarity and hands-on execution.
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
                    <span className="text-primary-light font-semibold">Custom Bots &amp; AI Systems</span>
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
