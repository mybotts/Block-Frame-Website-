"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ToolLogo from "./ToolLogo";
import TailoredResumeModal, { ResumeRole } from "./TailoredResumeModal";

const calendlyHref = "https://calendly.com/blockframemedia/30min";
const emailHref = "mailto:contactsergeo@gmail.com?subject=Project%20or%20Work%20Inquiry%20for%20Sergeo";
const groplyRepoHref = "https://github.com/Sergeo01/Groply-Open-Core-Autonomous-AI-Commerce-Engine";
const ignitionTopGgHref = "https://top.gg/bot/1388870348841287690";
const ignitionDiscordHref = "https://discord.com/discovery/applications/1388870348841287690";

const navSections = [
  { id: "about", label: "01  About & Skills" },
  { id: "capabilities", label: "02  What I Do & Deliver" },
  { id: "software-stack", label: "03  Apps & Software Stack" },
  { id: "video-edits", label: "04  Video Editing & Motion" },
  { id: "community-ops", label: "05  Community Ops & Growth" },
  { id: "discord-bots", label: "06  Custom Discord Bots" },
  { id: "systems", label: "07  AI Systems & Automations" },
  { id: "reviews", label: "08  Team Feedback & Reviews" },
  { id: "credentials", label: "09  Verified Certifications" },
  { id: "engagement", label: "10  Ways to Work Together" },
  { id: "faq", label: "11  Client FAQ" },
  { id: "contact", label: "12  Work With Me" },
];

interface LightboxItem {
  src: string;
  title: string;
  subtitle?: string;
  verifyHref?: string;
  isVideo?: boolean;
}

export default function PortfolioClient() {
  const [activeSection, setActiveSection] = useState("about");
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeInitialRole, setResumeInitialRole] = useState<ResumeRole>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeLightbox, setActiveLightbox] = useState<LightboxItem | null>(null);
  const [activeToolCategory, setActiveToolCategory] = useState<string>("all");
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

  // Tools & Applications Data
  const softwareTools = [
    // Project & Task Management
    { name: "Notion", category: "project", role: "Databases, client portals, SOP documentation, event tracking", tag: "Primary" },
    { name: "ClickUp", category: "project", role: "Sprint management, workflow pipelines, custom statuses", tag: "Advanced" },
    { name: "Asana", category: "project", role: "Cross-functional task boards, dependencies, timeline planning", tag: "Proficient" },
    { name: "Jira", category: "project", role: "Agile issue tracking, sprint backlogs, release management", tag: "Proficient" },
    { name: "monday.com", category: "project", role: "Operational dashboards, team task assignments, automation triggers", tag: "Proficient" },
    { name: "Airtable", category: "project", role: "Relational data tables, automations, multi-view registries", tag: "Advanced" },
    { name: "Trello", category: "project", role: "Kanban task boards, visual triage, workflow cards", tag: "Proficient" },

    // CRM & Customer Support
    { name: "Zendesk", category: "crm", role: "Customer support ticket queues, SLA monitoring, macro replies", tag: "Core" },
    { name: "HubSpot", category: "crm", role: "Lead management, sales pipeline CRM, contact segmentation", tag: "Proficient" },
    { name: "Bitrix24", category: "crm", role: "Omnichannel CRM, telephony logs, automated client funnels", tag: "Proficient" },
    { name: "Intercom", category: "crm", role: "Conversational customer onboarding, live messenger triage", tag: "Proficient" },

    // Community & Communication
    { name: "Telegram", category: "community", role: "Channel broadcasts, group management, bot automations, moderation", tag: "Expert" },
    { name: "Discord", category: "community", role: "Server architecture, role gating, AutoMod, verified bots, events", tag: "Expert" },
    { name: "Slack", category: "community", role: "Internal workspace channels, async huddles, workflow notifications", tag: "Expert" },
    { name: "WhatsApp Business", category: "community", role: "Direct client messaging, catalog management, automated commerce", tag: "Expert" },
    { name: "Zoom", category: "community", role: "Team meetings, client onboarding calls, screen sharing", tag: "Daily" },
    { name: "Loom", category: "community", role: "Async video walkthroughs, client updates, bug demonstrations", tag: "Daily" },
    { name: "Calendly", category: "community", role: "Automated schedule coordination, timezone alignment", tag: "Daily" },

    // Productivity & Office
    { name: "Microsoft Excel", category: "office", role: "Data analysis, formulas, pivot tables, financial tracking", tag: "Advanced" },
    { name: "Microsoft Word", category: "office", role: "Executive briefs, formal proposals, client agreements, SOPs", tag: "Advanced" },
    { name: "Google Docs", category: "office", role: "Collaborative writing, live commenting, shared proposals", tag: "Daily" },
    { name: "Google Sheets", category: "office", role: "Live trackers, data imports, workflow collaboration", tag: "Daily" },
    { name: "Dropbox & Drive", category: "office", role: "Organized asset repositories, secure file permissions", tag: "Daily" },

    // Video Editing & Creative Media
    { name: "CapCut", category: "creative", role: "Fast short-form video editing, captions, hooks, audio ducking", tag: "Advanced" },
    { name: "Adobe Premiere Pro", category: "creative", role: "Long-form timeline editing, color grading, multi-track audio", tag: "Proficient" },
    { name: "Canva", category: "creative", role: "Thumbnails, social media assets, pitch decks, infographics", tag: "Advanced" },
    { name: "Remotion", category: "creative", role: "Programmatic React video generation, automated text overlays", tag: "Builder" },
    { name: "Adobe Photoshop", category: "creative", role: "Graphics retouching, banner art, transparent cutouts", tag: "Proficient" },

    // AI & Automation (Latest Frontier Models)
    { name: "Claude 3.7 Sonnet & 3.5 Haiku", category: "ai", role: "Hybrid reasoning architecture, agentic tool-use, vision evaluation, and production prompt architecture", tag: "Certified" },
    { name: "OpenAI o3-mini & GPT-4o", category: "ai", role: "Structured mathematical reasoning, low-latency function calling, and structured JSON outputs", tag: "Advanced" },
    { name: "DeepSeek-R1 & V3", category: "ai", role: "Open-weights reasoning distillation, cost-effective inference pipelines, and local agent deployments", tag: "Advanced" },
    { name: "Make / Zapier", category: "ai", role: "Cross-app workflow automations, webhook bridges, no-code integrations", tag: "Advanced" },
    { name: "Python", category: "ai", role: "Backend scripting, FastAPI endpoints, data scraping, bot engines", tag: "Builder" },
    { name: "Next.js & React", category: "ai", role: "Interactive frontend portals, static web generation, ISR caching", tag: "Builder" },
    { name: "GitHub", category: "ai", role: "Version control, collaborative repos, automated CI/CD actions", tag: "Daily" },
  ];

  const filteredTools = activeToolCategory === "all"
    ? softwareTools
    : softwareTools.filter((t) => t.category === activeToolCategory);

  return (
    <div className="relative w-full pt-28 md:pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
      
      {/* Lightbox Modal for Certificate / Proof / Video Inspection */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-opacity"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0d1117] p-5 shadow-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] border border-white/15 hover:border-white/25 hover:bg-white/[0.1] px-3 py-1 text-xs font-mono text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
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
                  Close
                </button>
              </div>
            </div>

            <div className="relative h-[65vh] w-full rounded-lg overflow-hidden bg-background/50 flex items-center justify-center">
              {activeLightbox.isVideo ? (
                <video
                  src={activeLightbox.src}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-lg shadow-2xl"
                />
              ) : (
                <Image
                  src={activeLightbox.src}
                  alt={activeLightbox.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 xl:grid-cols-[320px_1fr] xl:gap-10 2xl:grid-cols-[360px_1fr] 2xl:gap-12">
        
        {/* ========================================================
            LEFT STICKY SIDEBAR (Executive Identity & Navigation)
            ======================================================== */}
        <aside className="mb-14 lg:mb-0">
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* Identity Card */}
            <div className="glass-card p-6 border border-card-border">
              {/* Profile Avatar (SN Monogram - Sergeo Ndonwi) */}
              <div className="mb-5 flex items-center justify-between">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-white/[0.02] border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-md">
                  <span className="font-sans text-xl font-bold tracking-wider text-white select-none">
                    SN
                  </span>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0d1117] border border-white/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
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
              <p className="text-xs text-text-muted mt-0.5">
                Chenwi Sergeo Ndonwi
              </p>

              {/* Multi-Disciplinary Skills Pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  Video Editing
                </span>
                <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  Community Management
                </span>
                <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  Social Media Growth
                </span>
                <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  Custom Discord Bots
                </span>
                <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  AI Systems &amp; Automation
                </span>
                <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  Project Operations
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-text-secondary">
                A versatile digital operator. Whether you need community management on Discord/Telegram, crisp commercial video editing, Notion workflows, or custom AI automations, I deliver clean, end-to-end execution.
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
                  <span>Schedule a Call</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href={emailHref}
                  className="w-full inline-flex items-center justify-center gap-2 rounded border border-card-border bg-surface px-4 py-2.5 text-xs font-medium text-text-secondary transition hover:bg-surface-light hover:text-text-primary"
                >
                  <span>Email Direct</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setResumeInitialRole("all");
                    setIsResumeModalOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/25 px-4 py-2.5 text-xs font-semibold text-text-primary transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Tailored Resume</span>
                </button>
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
                <span>Availability:</span>
                <span className="text-text-primary font-mono">Global Remote</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Working Overlap:</span>
                <span className="text-text-primary font-mono">US East &amp; EU Flexible</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Engagement:</span>
                <span className="text-primary-light font-medium">Remote &middot; Full or Project</span>
              </div>
            </div>

          </div>
        </aside>

        {/* ========================================================
            RIGHT CONTENT AREA (The Executive Dossier)
            ======================================================== */}
        <main className="space-y-24 min-w-0">

          {/* ------------------------------------------------------
              SECTION 01: ABOUT & MULTI-SKILLED PROFILE
              ------------------------------------------------------ */}
          <section id="about" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                01 &middot; MULTI-SKILLED OPERATOR &amp; BUILDER
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-6">
              Hands-on execution across video editing, community management, social media, custom Discord bots, and AI automation.
            </h2>

            <div className="prose prose-invert max-w-none text-base md:text-lg text-text-secondary leading-relaxed space-y-4">
              <p>
                Many businesses struggle because work gets fragmented across multiple single-skill freelancers who fail to communicate. A video editor doesn&apos;t know how to run community engagement; a community manager doesn&apos;t know how to build a Discord bot or track metrics in Notion; and an automation engineer often overcharges for things that can be solved simply.
              </p>
              <p>
                I take a comprehensive approach: I combine daily operational discipline (managing Telegram and Discord communities, organizing live events, tracking spreadsheets, handling Zendesk and Bitrix queues) with creative production (editing engaging short-form videos and commercials) and modern software automation (building custom Discord bots, trilingual WhatsApp sales agents, and Notion publishing pipelines).
              </p>
            </div>

            {/* Metrics Strip */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-text-primary block mb-1">20,500+</span>
                <span className="text-xs text-text-muted leading-tight block">Organic Social Engagements</span>
              </div>
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-primary-light block mb-1">11+</span>
                <span className="text-xs text-text-muted leading-tight block">Live Community Events Hosted</span>
              </div>
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-text-primary block mb-1">Verified</span>
                <span className="text-xs text-text-muted leading-tight block">Discord Bot Creator (Ignition)</span>
              </div>
              <div className="glass-card p-5 border border-card-border">
                <span className="font-mono text-3xl font-bold text-primary-light block mb-1">30+ Apps</span>
                <span className="text-xs text-text-muted leading-tight block">Mastered Daily Software Stack</span>
              </div>
            </div>

            {/* Quick Discipline Jump Bar */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-3">
                Quick Jump by Discipline:
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#video-edits"
                  className="rounded-lg bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Video Editing &amp; Motion
                </a>
                <a
                  href="#community-ops"
                  className="rounded-lg bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Community &amp; Social
                </a>
                <a
                  href="#discord-bots"
                  className="rounded-lg bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Custom Discord Bots
                </a>
                <a
                  href="#systems"
                  className="rounded-lg bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  AI Systems &amp; Automation
                </a>
                <a
                  href="#engagement"
                  className="rounded-lg bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Engagement Models
                </a>
                <a
                  href="#faq"
                  className="rounded-lg bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Client FAQ
                </a>
              </div>
            </div>

            {/* Tailored Resume Generator Banner */}
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.025] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/90 font-semibold">
                    Dynamic 1-Page Resume Generator
                  </span>
                  <span className="rounded-md bg-white/[0.06] border border-white/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    Auto-Tailored
                  </span>
                </div>
                <p className="text-xs text-text-secondary max-w-3xl">
                  Hiring for a specific role? Pick your discipline below to generate a tailored, print-ready 1-page PDF highlighting the exact metrics, tools, and experience relevant to your post.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setResumeInitialRole("video"); setIsResumeModalOpen(true); }}
                  className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.08] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Video
                </button>
                <button
                  type="button"
                  onClick={() => { setResumeInitialRole("community"); setIsResumeModalOpen(true); }}
                  className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.08] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Community
                </button>
                <button
                  type="button"
                  onClick={() => { setResumeInitialRole("discord"); setIsResumeModalOpen(true); }}
                  className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.08] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  Discord
                </button>
                <button
                  type="button"
                  onClick={() => { setResumeInitialRole("ai"); setIsResumeModalOpen(true); }}
                  className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-text-secondary border border-white/10 hover:border-white/25 hover:bg-white/[0.08] hover:text-white transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  AI Systems
                </button>
                <button
                  type="button"
                  onClick={() => { setResumeInitialRole("all"); setIsResumeModalOpen(true); }}
                  className="rounded-lg bg-white text-black hover:bg-white/90 px-3.5 py-1.5 text-xs font-semibold transition shadow-sm font-sans"
                >
                  Choose Role &rarr;
                </button>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 02: WHAT I DO & PROBLEMS I SOLVE
              ------------------------------------------------------ */}
          <section id="capabilities" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                02 &middot; CORE CAPABILITIES
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              What I Can Do For Your Business
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-4xl">
              Flexible skills designed to remove bottlenecks, produce high-retention media, keep communities engaged, and automate repetitive tasks.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              
              {/* Capability 01 */}
              <div className="glass-card p-6 border border-card-border hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">01 / CONTENT &amp; MEDIA</div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    Video Editing &amp; Motion Design
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Editing high-retention short-form videos (TikTok, Reels, Shorts), SaaS product commercials, kinetic typography, dynamic subtitles, and high-CTR thumbnail designs using CapCut, Premiere Pro, and Canva.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-card-border/50 text-[11px] font-mono text-text-muted">
                  CapCut &middot; Premiere &middot; Canva &middot; Remotion
                </div>
              </div>

              {/* Capability 02 */}
              <div className="glass-card p-6 border border-card-border hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">02 / COMMUNITY &amp; SOCIAL OPS</div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    Community Management &amp; Social Media Strategy
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Full management of Discord and Telegram servers: welcoming members, moderating discussions, role hierarchies, organizing game nights, and running prompt support queues. Plus social media content calendars, engaging Twitter/X threads, and organic growth campaigns with verifiable metric tracking.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-card-border/50 text-[11px] font-mono text-text-muted">
                  Discord &middot; Telegram &middot; Twitter/X &middot; Slack &middot; Zendesk &middot; Notion
                </div>
              </div>

              {/* Capability 03 */}
              <div className="glass-card p-6 border border-card-border hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">03 / DISCORD BOT CREATION</div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    Custom Discord Bots for Any Server
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Building custom, verified Discord applications for community engagement: gamified quizzes, raffles, live tournament leaderboards, automated ticketing, anti-phishing defense, and server economies.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-card-border/50 text-[11px] font-mono text-text-muted">
                  Ignition (Verified) &middot; Prime Ops &middot; Discord API
                </div>
              </div>

              {/* Capability 04 */}
              <div className="glass-card p-6 border border-card-border hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">04 / OPERATIONS &amp; ADMIN</div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    Project Management &amp; Office Systems
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Structuring databases and task sprints in Notion and ClickUp, maintaining financial spreadsheets and registries in Excel, and preparing clear SOP documentation in Word and Google Docs.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-card-border/50 text-[11px] font-mono text-text-muted">
                  Notion &middot; ClickUp &middot; Excel &middot; Word &middot; Asana
                </div>
              </div>

              {/* Capability 05 */}
              <div className="glass-card p-6 border border-card-border hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition flex flex-col justify-between md:col-span-2 lg:col-span-1">
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">05 / AI AUTOMATION</div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    AI Systems &amp; Workflow Automations
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Deploying trilingual conversational WhatsApp sales reps, headless Notion-to-web publishing pipelines, and self-hosted Linux agent daemons to automate repetitive manual work.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-card-border/50 text-[11px] font-mono text-text-muted">
                  Claude 3.7 Sonnet &middot; OpenAI o3-mini &middot; DeepSeek-R1 &middot; Python &middot; Make
                </div>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 03: APPS & SOFTWARE STACK (THE RICH SOFTWARE GRID)
              ------------------------------------------------------ */}
          <section id="software-stack" className="scroll-mt-32 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  03 &middot; SOFTWARE &amp; TOOL PROFICIENCY
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Apps &amp; Software Tools I Use Daily
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                I am hands-on and comfortable with modern project management tools, customer support software, community platforms, spreadsheet applications, and creative media suites.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { id: "all", label: "All Tools (30+)" },
                { id: "project", label: "Project Management" },
                { id: "crm", label: "CRM & Support" },
                { id: "community", label: "Community & Chat" },
                { id: "office", label: "Office & Spreadsheets" },
                { id: "creative", label: "Video & Design" },
                { id: "ai", label: "AI & Automation" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveToolCategory(cat.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-mono transition ${
                    activeToolCategory === cat.id
                      ? "bg-primary text-background font-bold shadow-sm"
                      : "bg-surface border border-card-border text-text-secondary hover:text-text-primary hover:bg-surface-light"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool.name}
                  className="glass-card p-4 border border-card-border hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                          <ToolLogo name={tool.name} size={30} />
                        </div>
                        <span className="text-sm font-bold text-text-primary truncate">{tool.name}</span>
                      </div>
                      <span className="flex-shrink-0 rounded bg-surface-light px-2 py-0.5 text-[10px] font-mono text-primary-light border border-card-border">
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed pl-[40px]">
                      {tool.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-surface p-5 border border-card-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <span className="text-text-secondary">
                Have a proprietary internal platform or tool not listed above?
              </span>
              <span className="text-primary-light font-semibold">
                &check; Quick learner with new SaaS dashboards and interfaces
              </span>
            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 04: VIDEO EDITING & COMMERCIAL MOTION DESIGN (NEW!)
              ------------------------------------------------------ */}
          <section id="video-edits" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  04 &middot; VIDEO EDITING &amp; MOTION DESIGN
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Video Edits &amp; Commercial Motion Samples
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                High-impact video editing designed for customer retention: kinetic typography, SaaS product walkthroughs, synchronized audio design, and modern brand aesthetic. Press play below to watch.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              
              {/* Video 1: TinyFish Commercial */}
              <div className="glass-card p-6 border border-card-border rounded-xl flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-card-border shadow-lg mb-4">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster="/images/poster-tinyfish-commercial.webp"
                      className="h-full w-full object-cover rounded-xl"
                    >
                      <source src="/videos/tinyfish-commercial.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                        Product Commercial
                      </span>
                      <span className="rounded bg-surface-light border border-card-border px-2 py-0.5 text-[10px] font-mono text-text-muted">
                        Kinetic Typography
                      </span>
                      <span className="rounded bg-surface-light border border-card-border px-2 py-0.5 text-[10px] font-mono text-text-muted">
                        1080p Full HD
                      </span>
                    </div>
                    <div className="relative h-6 w-24 flex-shrink-0">
                      <Image
                        src="/images/logo-tinyfish.webp"
                        alt="TinyFish Logo"
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    TinyFish: AI Agent Web Stack Commercial
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    Fast-paced SaaS launch commercial featuring bold hook architecture (&ldquo;Your agent can think. It just can&apos;t click.&rdquo;), live browser UI screen animations, synchronized sound effects, and benchmark comparisons.
                  </p>

                  {/* Micro-Metrics & Deliverables */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 pt-3 border-t border-card-border/60 text-xs font-mono">
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Retention Hook</span>
                      <span className="text-emerald-400 font-semibold">0-3s Kinetic Pacing</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Deliverables</span>
                      <span className="text-text-primary font-semibold">1080p 60fps + 9:16</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Turnaround</span>
                      <span className="text-primary-light font-semibold">24-48h Draft</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Audio Sync</span>
                      <span className="text-text-primary font-semibold">SFX &amp; Dynamic Ducking</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Duration: 44s &middot; 30 FPS</span>
                  <button
                    onClick={() => setActiveLightbox({
                      src: "/videos/tinyfish-commercial.mp4",
                      title: "TinyFish Product Launch Commercial",
                      subtitle: "Edited by Sergeo · Kinetic Typography & SaaS Walkthrough",
                      isVideo: true
                    })}
                    className="text-primary-light hover:underline font-semibold"
                  >
                    Cinema Mode ↗
                  </button>
                </div>
              </div>

              {/* Video 2: Cambrian DeFi Explainer */}
              <div className="glass-card p-6 border border-card-border rounded-xl flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-card-border shadow-lg mb-4">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster="/images/poster-cambrian-defi.webp"
                      className="h-full w-full object-cover rounded-xl"
                    >
                      <source src="/videos/cambrian-defi-explainer.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                        SaaS Explainer
                      </span>
                      <span className="rounded bg-surface-light border border-card-border px-2 py-0.5 text-[10px] font-mono text-text-muted">
                        2D Motion Design
                      </span>
                      <span className="rounded bg-surface-light border border-card-border px-2 py-0.5 text-[10px] font-mono text-text-muted">
                        UI Component Cards
                      </span>
                    </div>
                    <div className="relative h-6 w-24 flex-shrink-0">
                      <Image
                        src="/images/logo-cambrian.webp"
                        alt="Cambrian Logo"
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    Cambrian: AI Agents x DeFi Explainer
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    Clean 2D motion graphics explainer translating complex decentralized finance infrastructure into clear, digestible visual concepts. Features subtle grid layouts, component cards, and smooth pacing.
                  </p>

                  {/* Micro-Metrics & Deliverables */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 pt-3 border-t border-card-border/60 text-xs font-mono">
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Concept Clarity</span>
                      <span className="text-emerald-400 font-semibold">2D UI Cards</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Deliverables</span>
                      <span className="text-text-primary font-semibold">1080p FinTech Motion</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Turnaround</span>
                      <span className="text-primary-light font-semibold">24-48h Draft</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Aesthetic</span>
                      <span className="text-text-primary font-semibold">Dark Grid &amp; Vectors</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Duration: 32s &middot; 30 FPS</span>
                  <button
                    onClick={() => setActiveLightbox({
                      src: "/videos/cambrian-defi-explainer.mp4",
                      title: "Cambrian AI x DeFi Explainer Video",
                      subtitle: "Edited by Sergeo · 2D Motion Graphics & Explainer Video",
                      isVideo: true
                    })}
                    className="text-primary-light hover:underline font-semibold"
                  >
                    Cinema Mode ↗
                  </button>
                </div>
              </div>

              {/* Video 3: Lebrel AI Commercial */}
              <div className="glass-card p-6 border border-card-border rounded-xl flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-card-border shadow-lg mb-4">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster="/images/poster-lebrel-ai.webp"
                      className="h-full w-full object-cover rounded-xl"
                    >
                      <source src="/videos/lebrel-ai-commercial.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                        Launch Commercial
                      </span>
                      <span className="rounded bg-surface-light border border-card-border px-2 py-0.5 text-[10px] font-mono text-text-muted">
                        3D Motion &amp; VFX
                      </span>
                      <span className="rounded bg-surface-light border border-card-border px-2 py-0.5 text-[10px] font-mono text-text-muted">
                        1080p 60fps
                      </span>
                    </div>
                    <div className="relative h-6 w-20 flex-shrink-0 flex items-center justify-end">
                      <div className="relative h-6 w-6 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src="/images/logo-lebrel.webp"
                          alt="Lebrel AI Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    Lebrel AI: Frontier AI Verification Commercial
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    Fast-paced Web3 &amp; AI product reveal showcasing verifiable inference, Solana cryptographic signing, hardware enclaves, and uncensored models. Built for viral social distribution.
                  </p>

                  {/* Micro-Metrics & Deliverables */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 pt-3 border-t border-card-border/60 text-xs font-mono">
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Hook Cadence</span>
                      <span className="text-emerald-400 font-semibold">High Retention</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Deliverables</span>
                      <span className="text-text-primary font-semibold">1080p 60fps Master</span>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Proof Link</span>
                      <a
                        href="https://x.com/sergeo_n/status/2119070670332076118"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-light font-semibold hover:underline truncate block"
                      >
                        Live on X ↗
                      </a>
                    </div>
                    <div className="rounded bg-surface p-2 border border-card-border">
                      <span className="text-[10px] text-text-muted block">Audio Sync</span>
                      <span className="text-text-primary font-semibold">Sub-Bass &amp; SFX</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <div className="flex items-center gap-2">
                    <span>Duration: 30s &middot; 60 FPS</span>
                    <span>&middot;</span>
                    <a
                      href="https://x.com/sergeo_n/status/2119070670332076118"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-text-primary transition flex items-center gap-1"
                    >
                      <span>X Proof</span> ↗
                    </a>
                  </div>
                  <button
                    onClick={() => setActiveLightbox({
                      src: "/videos/lebrel-ai-commercial.mp4",
                      title: "Lebrel AI Launch Commercial",
                      subtitle: "Edited by Sergeo · Verifiable AI on Solana Commercial",
                      isVideo: true
                    })}
                    className="text-primary-light hover:underline font-semibold"
                  >
                    Cinema Mode ↗
                  </button>
                </div>
              </div>

            </div>

            <div className="rounded-xl bg-surface p-5 border border-card-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <span className="text-text-secondary">
                Need short-form reels, TikToks, YouTube cutdowns, or product video ads?
              </span>
              <a href={calendlyHref} target="_blank" rel="noopener noreferrer" className="text-primary-light font-semibold hover:underline">
                Let&apos;s discuss your video project &rarr;
              </a>
            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 05: COMMUNITY MANAGEMENT & ORGANIC GROWTH PROOF
              ------------------------------------------------------ */}
          <section id="community-ops" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  05 &middot; REAL WORK PROOFS &middot; COMMUNITY
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Community Management, Event Hosting &amp; Growth
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                Real proof of work: enterprise Web3 community moderation, live gaming event hosting, and organic engagement without ad spend.
              </p>
            </div>

            {/* Visual Proof 1: Avocado DAO Enterprise Community Moderation */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-6 w-28 flex-shrink-0">
                    <Image
                      src="/images/logo-avocado-dao.webp"
                      alt="Avocado DAO Official Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <span className="font-mono text-xs text-primary-light font-semibold uppercase">
                    AVOCADO DAO &middot; COMMUNITY MODERATION
                  </span>
                </div>
                <span className="rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs px-3 py-1 font-semibold">
                  &check; Verified Role Proof
                </span>
              </div>

              {/* Exact user-specified block */}
              <p className="text-base md:text-lg text-text-primary leading-relaxed mb-6 font-medium">
                At Avocado DAO, I moderated communities of up to 118,000 members on Discord, 10,000 members on Telegram, and a 90,000 follower account on X, each counted on its own platform. I also ran a 30-day security awareness campaign there.
              </p>

              {/* Platform Scale Breakdown Cards (each counted on its own platform, not added together) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs mb-6">
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-text-primary block mb-1">118,000</span>
                  <span className="text-text-muted text-[11px]">Discord Members</span>
                </div>
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-primary-light block mb-1">10,000</span>
                  <span className="text-text-muted text-[11px]">Telegram Members</span>
                </div>
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-text-primary block mb-1">90,000</span>
                  <span className="text-text-muted text-[11px]">Followers on X</span>
                </div>
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-emerald-400 block mb-1">30 Days</span>
                  <span className="text-text-muted text-[11px]">Security Campaign</span>
                </div>
              </div>

              <div className="pt-4 border-t border-card-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
                <span>Credential: Official Certificate of Employment &amp; Recommendation</span>
                <button
                  type="button"
                  onClick={() => setActiveLightbox({
                    src: "/images/avocado-dao-coe.webp",
                    title: "Avocado DAO · Certificate of Employment & Recommendation",
                    subtitle: "Signed by David Shi, Chief of Operations (COO)"
                  })}
                  className="text-primary-light hover:underline font-semibold"
                >
                  View Signed Recommendation Letter &rarr;
                </button>
              </div>
            </div>

            {/* Visual Proof 2: Prime Nexus Organic Growth Metrics Showcase */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-primary-light font-semibold uppercase block mb-1">
                    REAL WORK ARTIFACT &middot; METRIC AUDIT
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                    100% Organic Growth &middot; Zero Sponsorship
                  </h3>
                </div>
                <span className="rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs px-3 py-1 font-semibold">
                  &check; Verified Campaign Data
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Every event, engagement, and participant below was delivered organically with zero sponsored support. Proof that consistent hosting and attentive community care drive measurable results.
              </p>

              {/* Clickable Image Preview */}
              <div
                className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl border border-card-border bg-black/40 mb-6 cursor-pointer group"
                onClick={() => setActiveLightbox({
                  src: "/images/proof-organic-growth-metrics.webp",
                  title: "100% Organic Growth Campaign Audit",
                  subtitle: "Community Engagement & Game Night Attendance Proof"
                })}
              >
                <Image
                  src="/images/proof-organic-growth-metrics.webp"
                  alt="Organic Growth Metrics Audit"
                  fill
                  className="object-contain p-2 group-hover:scale-[1.02] transition duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="rounded bg-black/80 px-3 py-1.5 text-xs font-mono text-white">
                    Click to inspect full metrics screenshot &rarr;
                  </span>
                </div>
              </div>

              {/* Metric Breakdown Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-text-primary block mb-1">20,511+</span>
                  <span className="text-text-muted text-[11px]">Total Engagements</span>
                </div>
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-primary-light block mb-1">11</span>
                  <span className="text-text-muted text-[11px]">Events Hosted</span>
                </div>
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-text-primary block mb-1">7+ Games</span>
                  <span className="text-text-muted text-[11px]">Titles Covered</span>
                </div>
                <div className="rounded-lg bg-surface p-4 border border-card-border text-center">
                  <span className="text-2xl font-bold text-emerald-400 block mb-1">96 Players</span>
                  <span className="text-text-muted text-[11px]">Active Attendance</span>
                </div>
              </div>
            </div>

            {/* Visual Proof 3: Real Notion Event Execution Tracker */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="font-mono text-xs text-primary-light font-semibold uppercase block mb-1">
                    PROJECT MANAGEMENT PROOF &middot; NOTION
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                    Live Event Execution &amp; Schedule Tracker
                  </h3>
                </div>
                <span className="text-xs font-mono text-text-muted">
                  Organized in Notion
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                A live demonstration of rigorous project tracking: scheduling events (Among Us, Spider Tanks, Treeverse, BloodStrike), assigning hosts, tracking duration, auditing attendance, and logging post-event Twitter reach.
              </p>

              <div
                className="relative aspect-[16/7] w-full overflow-hidden rounded-xl border border-card-border bg-black/40 cursor-pointer group"
                onClick={() => setActiveLightbox({
                  src: "/images/proof-notion-event-tracker.webp",
                  title: "Notion Game Night & Event Execution Tracker",
                  subtitle: "Live event schedule, duration, hosts, and social engagement logs"
                })}
              >
                <Image
                  src="/images/proof-notion-event-tracker.webp"
                  alt="Notion Event Tracker"
                  fill
                  className="object-contain p-2 group-hover:scale-[1.02] transition duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="rounded bg-black/80 px-3 py-1.5 text-xs font-mono text-white">
                    Click to inspect Notion database view &rarr;
                  </span>
                </div>
              </div>
            </div>

          </section>

          {/* ------------------------------------------------------
              SECTION 06: CUSTOM DISCORD BOTS (Ignition & Prime Ops)
              ------------------------------------------------------ */}
          <section id="discord-bots" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  06 &middot; BESPOKE BOT APPLICATIONS
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Custom Discord Bots for Any Server &amp; Task
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                I design, code, and host verified Discord applications for community gamification, onboarding gates, automated ticketing, moderation, and API webhooks.
              </p>
            </div>

            {/* Ignition Bot Card */}
            <div className="glass-card p-8 md:p-10 border border-card-border relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                    <Image
                      src="/images/logo-ignition.webp"
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
                Ignition is an official, verified Discord application that helps community servers educate, engage, and reward members through interactive gamified workflows, trivia tournaments, and a built-in server marketplace.
              </p>

              {/* Core Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 font-mono text-xs">
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
                  <span className="text-primary-light font-semibold block">&bull; Server Marketplace</span>
                  <span className="text-text-muted text-[10px]">Credit redemption</span>
                </div>
              </div>

              {/* Realistic Discord Embed Preview */}
              <div className="rounded-xl border border-card-border bg-[#313338] p-5 font-sans text-xs text-[#dbdee1] shadow-2xl w-full max-w-3xl xl:max-w-4xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-[#1e1f22]">
                    <Image src="/images/logo-ignition.webp" alt="Ignition" fill className="object-cover" />
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

                <div className="rounded border-l-4 border-l-[#5865f2] bg-[#2b2d31] p-4 space-y-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-white block">
                    &bull; Weekly Server Championship &middot; Round 3
                  </span>
                  <p className="text-xs text-[#dbdee1] leading-relaxed">
                    Welcome to the tournament arena! Solve the community riddle to earn <strong>250 Credits</strong> and advance your guild on the leaderboard.
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
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-1">
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
                        &check; SERVER OPERATIONS BOT
                      </span>
                    </div>
                    <span className="text-xs text-text-muted font-mono">Community Security &amp; Triage Shield</span>
                  </div>
                </div>

                <span className="rounded-full border border-card-border bg-surface px-3 py-1 text-xs font-mono text-text-muted">
                  Active Internal Deployment
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Engineered for my own server (Prime Nexus / BlockFrame HQ). Prime Ops handles automated ticket triage, onboarding verification, and malicious link interception to prevent scam air-drops and server raids.
              </p>

              {/* Realistic Security Embed */}
              <div className="rounded-xl border border-card-border bg-[#313338] p-5 font-sans text-xs text-[#dbdee1] shadow-2xl w-full max-w-3xl xl:max-w-4xl">
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
                    <span className="text-[10px] text-[#949ba4]">Incident Shield &middot; Auto-Moderation</span>
                  </div>
                </div>

                <div className="rounded border-l-4 border-l-emerald-500 bg-[#2b2d31] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400">
                      [Security Event] Phishing Link Intercepted &amp; Quarantined
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">AutoMod Rule #04</span>
                  </div>
                  <p className="text-xs text-[#dbdee1] leading-relaxed">
                    Malicious impersonation URL quarantined in <code className="text-primary-light">#general-chat</code>. Sender temporarily muted. Incident logged to Sentry telemetry.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-text-muted border-t border-white/5 flex items-center justify-between">
                    <span>Target: Phish / Fake AirDrop Vector</span>
                    <span className="text-emerald-400 font-semibold">Status: Cleaned (0.3s)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-surface p-4 border border-card-border font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                <span className="text-text-primary">Want a custom bot built for your community server?</span>
                <a href={calendlyHref} target="_blank" rel="noopener noreferrer" className="text-primary-light font-semibold hover:underline">
                  Let&apos;s build it &rarr;
                </a>
              </div>
            </div>

          </section>

          {/* ------------------------------------------------------
              SECTION 07: AI SYSTEMS & PRODUCTION CASE STUDIES
              ------------------------------------------------------ */}
          <section id="systems" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  07 &middot; AI SYSTEMS &amp; AUTOMATION
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Autonomous Software &amp; Content Engines
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                Real code running in production: eliminating manual work and driving measurable business results.
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
                    The Problem
                  </h4>
                  <p>
                    In emerging markets, over 80% of online sales happen inside WhatsApp chats. Answering hundreds of repetitive inquiries, negotiating discounts, and reconciling payments manually exhausts merchants.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                    The Solution
                  </h4>
                  <p>
                    An open-core autonomous AI commerce engine that turns WhatsApp into an automated 24/7 storefront with trilingual fluency (English, French, Cameroonian Pidgin), margin-safe haggling, and mobile money payment verification.
                  </p>
                </div>

                {/* WhatsApp Chat Simulator */}
                <div className="rounded-xl border border-card-border bg-[#0b141a] p-5 shadow-inner">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <span className="text-text-primary font-semibold">WhatsApp Business &middot; Groply AI Sales Rep</span>
                    </div>
                    <span className="text-text-muted">Automated Session #BF-9042</span>
                  </div>

                  <div className="space-y-3 font-sans text-xs max-w-xl xl:max-w-2xl">
                    <div className="flex justify-start">
                      <div className="rounded-lg bg-[#202c33] p-3 text-text-primary max-w-[85%] shadow-sm">
                        <p className="font-semibold text-[10px] text-emerald-400 mb-0.5">Customer &middot; +237 671... </p>
                        <p>Hey boss, how much for the Nike Air sneakers in size 43? Can you do 20,000 FCFA?</p>
                        <span className="text-[9px] text-text-muted float-right mt-1">10:14 PM</span>
                      </div>
                    </div>

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
                        </div>
                        <span className="text-[9px] text-emerald-200/80 float-right">10:14 PM &middot; Automated in 1.4s</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-surface p-4 border border-card-border font-mono text-xs">
                  <span className="text-text-muted block mb-1">// Architecture Stack</span>
                  <span className="text-text-primary">Meta WhatsApp Cloud API &middot; FastAPI (Python) &middot; PostgreSQL &middot; Docker &middot; Ubuntu VPS</span>
                </div>
              </div>
            </div>

            {/* Case Study 2: Blog OS */}
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
                <p>
                  Connecting headless Notion workspaces directly to production Next.js platforms with permanent asset localization, automatic RSS syndication, IndexNow pings, and markdown mirrors for search engine and AI crawler discoverability.
                </p>

                <div className="rounded-lg bg-surface p-4 border border-card-border font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                  <span className="text-text-primary">Canonical Stat: 30 blogs in 30 days, zero manual edits.</span>
                  <span className="text-emerald-400 font-semibold">&check; 100% Asset Uptime Verified</span>
                </div>
              </div>
            </div>

            {/* Artifact: System Readiness Checklist */}
            <div className="glass-card p-8 border border-card-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  DEPLOYMENT VERIFICATION CHECKLIST
                </span>
                <span className="text-[11px] font-mono text-primary-light">Interactive QA Gates</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                System Quality &amp; Reliability Checklist
              </h3>
              <p className="text-xs text-text-secondary mb-6">
                Verification gates executed before any client automation or bot goes live:
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
                    Domain boundary lockdown: prompt strictly forbids hallucinating unlisted dates, prices, or inventory.
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
                    Commercial margin locks: confidential floor prices enforced in code, never overridden.
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
                    Community safety &amp; anti-phishing: link scanners and verified role gates active.
                  </span>
                </label>
              </div>
            </div>

          </section>

          {/* ------------------------------------------------------
              SECTION 08: TEAM FEEDBACK & MANAGER REVIEWS
              ------------------------------------------------------ */}
          <section id="reviews" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  08 &middot; TEAM PRAISE &amp; MANAGER REVIEWS
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Real Feedback &amp; Peer Recognition
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                Unfiltered feedback from team leads, managers, and peers on work ethic, communication, initiative, and problem solving.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Review 1: Avocado DAO Team Kudos */}
              <div className="glass-card p-6 border border-card-border rounded-xl flex flex-col justify-between">
                <div>
                  <div
                    className="relative aspect-[9/16] max-h-80 w-full overflow-hidden rounded-lg border border-card-border mb-4 cursor-pointer group bg-black/40 flex items-center justify-center"
                    onClick={() => setActiveLightbox({
                      src: "/images/proof-team-kudos-avocado.webp",
                      title: "Avocado DAO · Innovation Kudos Workflow",
                      subtitle: "Official Marketing Team Slack/Discord Recognition"
                    })}
                  >
                    <Image
                      src="/images/proof-team-kudos-avocado.webp"
                      alt="Team Kudos Slack Discord Recognition"
                      fill
                      className="object-contain p-1 group-hover:scale-[1.02] transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="rounded bg-black/80 px-3 py-1 text-xs font-mono text-white">
                        Click to enlarge proof &rarr;
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="font-mono text-xs text-primary-light font-semibold">
                      AVOCADO DAO &middot; MARKETING WORKFLOW
                    </div>
                    <div className="relative h-5 w-24 flex-shrink-0">
                      <Image
                        src="/images/logo-avocado-dao.webp"
                        alt="Avocado DAO Official Logo"
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    &ldquo;Living up to our Innovation value!&rdquo;
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed italic mb-4">
                    &ldquo;Sergeo recently joined the marketing team and has already hit the ground running with fresh ideas. Expect to see more in-depth GameFi content on Avocado&apos;s Twitter, all thanks to his initiative. Kudos, Sergeo!&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Recognition: Innovation &amp; Initiative</span>
                  <span className="text-emerald-400 font-semibold">&check; Team Kudos</span>
                </div>
              </div>

              {/* Review 2: Manager Review */}
              <div className="glass-card p-6 border border-card-border rounded-xl flex flex-col justify-between">
                <div>
                  <div
                    className="relative aspect-[9/16] max-h-80 w-full overflow-hidden rounded-lg border border-card-border mb-4 cursor-pointer group bg-black/40 flex items-center justify-center"
                    onClick={() => setActiveLightbox({
                      src: "/images/proof-manager-review.webp",
                      title: "Manager Performance Review",
                      subtitle: "Evaluation of Responsibility, Troubleshooting & Escalation"
                    })}
                  >
                    <Image
                      src="/images/proof-manager-review.webp"
                      alt="Manager Review on Work Ethic"
                      fill
                      className="object-contain p-1 group-hover:scale-[1.02] transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="rounded bg-black/80 px-3 py-1 text-xs font-mono text-white">
                        Click to enlarge proof &rarr;
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-emerald-400 font-semibold mb-1">
                    LEADERSHIP EVALUATION
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    &ldquo;Responsible, on time, good at finding solutions&rdquo;
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed italic mb-4">
                    &ldquo;I&apos;m delighted to have you on board as a team member. You have been responsible so far, being on time for work and all. Good skills in troubleshooting and finding solutions. Follows protocol well and you can make active decisions in escalating issues upwards.&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Evaluation: Punctuality &amp; Troubleshooting</span>
                  <span className="text-emerald-400 font-semibold">&check; Verified Review</span>
                </div>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 09: VERIFIED CERTIFICATIONS & HISTORY
              ------------------------------------------------------ */}
          <section id="credentials" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                09 &middot; VERIFIED CREDENTIALS
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
              Official Certifications &amp; Credentials
            </h2>
            <p className="text-base text-text-secondary mb-10 max-w-4xl">
              Authentic credentials in community management, artificial intelligence, and cybersecurity. Click any certificate to inspect the full document.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              
              {/* 1. Profunda W3 Academy: Community & Collaboration Management */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition"
                onClick={() => setActiveLightbox({
                  src: "/images/cert-profunda-community.webp",
                  title: "Profunda W3 Academy · Certificate of Achievement",
                  subtitle: "Cohort 3.0 'The Soul' · Community & Collaboration Management"
                })}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50 border border-card-border mb-3 group-hover:scale-[1.02] transition">
                    <Image
                      src="/images/cert-profunda-community.webp"
                      alt="Profunda W3 Academy Community Management Certificate"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-primary-light font-semibold mb-1">
                    PROFUNDA W3 ACADEMY &middot; 2024
                  </div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    Community &amp; Collaboration Management
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Certified in community architecture, moderation workflows, and team collaboration fundamentals.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-card-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="text-emerald-400 font-semibold">&check; Official Cert</span>
                  <span className="text-primary-light group-hover:underline">Inspect &rarr;</span>
                </div>
              </div>

              {/* 2. Claude Academy: AI Fluency */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition"
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

              {/* 3. Claude Academy: Human-Agent Teams */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition"
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

              {/* 4. EC-Council: Ethical Hacking Essentials (EHE) */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition"
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

              {/* 5. EC-Council: Network Defense Essentials (NDE) */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition"
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

              {/* 6. Avocado DAO: Proof of Employment & Recommendation */}
              <div
                className="glass-card p-5 border border-card-border rounded-xl flex flex-col justify-between cursor-pointer group hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition"
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
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="font-mono text-[11px] text-text-muted font-semibold">
                      AVOCADO DAO &middot; LEADERSHIP
                    </div>
                    <div className="relative h-4 w-20 flex-shrink-0">
                      <Image
                        src="/images/logo-avocado-dao.webp"
                        alt="Avocado DAO Official Logo"
                        fill
                        className="object-contain object-right"
                      />
                    </div>
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
              SECTION 10: WORK WITH ME / CTA
              ------------------------------------------------------ */}
                    {/* ------------------------------------------------------
              SECTION 10: WAYS TO WORK TOGETHER (ENGAGEMENT MODELS)
              ------------------------------------------------------ */}
          <section id="engagement" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  10 &middot; ENGAGEMENT MODELS &amp; HIRING OPTIONS
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Ways to Work Together
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                Whether you need dedicated monthly capacity, a rapid project sprint, or a high-impact technical audit, choose the engagement format that matches your timeline.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              
              {/* Model 1: Monthly Retainer */}
              <div className="glass-card p-6 md:p-8 border border-card-border rounded-xl flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition relative overflow-hidden group">
                <div className="absolute top-0 right-0 rounded-bl-xl bg-primary/10 border-b border-l border-primary/30 px-3 py-1 font-mono text-[10px] font-semibold text-primary-light">
                  HIGH VELOCITY
                </div>
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">
                    RETAINER PARTNERSHIP
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Dedicated Monthly Retainer
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    Full-spectrum or specialized monthly bandwidth embedded directly with your core team. Ideal for funded startups, Web3 ecosystems, and agencies scaling their digital footprint.
                  </p>
                  
                  <ul className="space-y-2.5 text-xs text-text-secondary mb-6 border-t border-card-border/60 pt-4 font-mono">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Dedicated weekly operational hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Direct Slack / Discord channel integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Fast 24 to 48 hour turnaround on tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Flexible cross-skill allocation as needs evolve</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={calendlyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded bg-text-primary px-4 py-2.5 text-xs font-semibold text-background transition hover:opacity-90 shadow-sm"
                >
                  <span>Inquire About Retainer</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* Model 2: Project Sprint */}
              <div className="glass-card p-6 md:p-8 border border-white/25 bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-xl flex flex-col justify-between hover:border-white/40 transition relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]">
                <div className="absolute top-0 right-0 rounded-bl-xl bg-white/[0.08] border-b border-l border-white/20 px-3 py-1 font-mono text-[10px] font-semibold text-white">
                  POPULAR
                </div>
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">
                    SCOPED DELIVERABLE
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Rapid Project Sprint
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    Fixed-scope milestones with clear deadlines. Perfect for product launch commercials, custom Discord bot creation, server revamps, or automated commerce setups.
                  </p>
                  
                  <ul className="space-y-2.5 text-xs text-text-secondary mb-6 border-t border-card-border/60 pt-4 font-mono">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Clearly defined deliverables &amp; milestones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Kickoff within 24 to 48 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Staged draft reviews with prompt edits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Complete source files &amp; deployment support</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={calendlyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black hover:bg-white/90 px-4 py-2.5 text-xs font-semibold transition shadow-sm font-sans"
                >
                  <span>Book a Project Sprint</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* Model 3: Advisory & Audit */}
              <div className="glass-card p-6 md:p-8 border border-card-border rounded-xl flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition relative overflow-hidden group">
                <div className="absolute top-0 right-0 rounded-bl-xl bg-surface-light border-b border-l border-card-border px-3 py-1 font-mono text-[10px] font-semibold text-text-muted">
                  DISCOVERY
                </div>
                <div>
                  <div className="font-mono text-xs text-primary-light font-semibold mb-2">
                    STRATEGY &amp; REVIEW
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    Advisory &amp; Systems Audit
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    Deep-dive review of your community server architecture, AutoMod filters, content retention hooks, or AI workflow pipelines with an actionable roadmap.
                  </p>
                  
                  <ul className="space-y-2.5 text-xs text-text-secondary mb-6 border-t border-card-border/60 pt-4 font-mono">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>60-minute technical discovery session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Prioritized security &amp; retention audit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Actionable Notion checklist &amp; Loom breakdown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">&check;</span>
                      <span>Complete report delivered within 72 hours</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={calendlyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded border border-card-border bg-surface px-4 py-2.5 text-xs font-semibold text-text-primary transition hover:bg-surface-light hover:border-white/20 hover:bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <span>Request an Audit</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 11: CLIENT FAQ ACCORDION
              ------------------------------------------------------ */}
          <section id="faq" className="scroll-mt-32 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">
                  11 &middot; CLIENT FAQ &middot; COMMON QUESTIONS
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-text-secondary max-w-4xl">
                Direct answers to common questions regarding onboarding, turnaround times, timezone overlap, and trial tasks.
              </p>
            </div>

            <div className="space-y-3">
              
              {/* FAQ 1 */}
              <div className="glass-card rounded-xl border border-card-border overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-text-primary hover:text-primary-light transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary-light font-mono text-xs">01.</span>
                    How fast can you start working on our project?
                  </span>
                  <span className="font-mono text-lg text-primary-light">
                    {openFaq === 0 ? "−" : "+"}
                  </span>
                </button>
                {openFaq === 0 && (
                  <div className="px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-card-border/40 font-mono">
                    <p className="mb-2">
                      <strong className="text-emerald-400">Within 24 to 48 hours.</strong> I keep operational buffer capacity available specifically so priority client sprints, launch campaigns, and retainer onboarding can kick off almost immediately without long waitlists.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="glass-card rounded-xl border border-card-border overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-text-primary hover:text-primary-light transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary-light font-mono text-xs">02.</span>
                    What time zones do you cover?
                  </span>
                  <span className="font-mono text-lg text-primary-light">
                    {openFaq === 1 ? "−" : "+"}
                  </span>
                </button>
                {openFaq === 1 && (
                  <div className="px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-card-border/40 font-mono">
                    <p>
                      <strong className="text-text-primary">Global remote with flexible working overlap.</strong> I routinely sync with teams across US Eastern (EST), US Pacific (PST), Europe (CET/BST), and Asia. I operate on transparent, async-first workflows with guaranteed sub-4-hour response windows during business hours.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="glass-card rounded-xl border border-card-border overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-text-primary hover:text-primary-light transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary-light font-mono text-xs">03.</span>
                    Can we start with a paid test task or trial sprint?
                  </span>
                  <span className="font-mono text-lg text-primary-light">
                    {openFaq === 2 ? "−" : "+"}
                  </span>
                </button>
                {openFaq === 2 && (
                  <div className="px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-card-border/40 font-mono">
                    <p>
                      <strong className="text-text-primary">Yes, absolutely.</strong> I welcome small, paid trial deliverables (such as editing a single video cut, building a scoped Discord bot module, or conducting a community audit) so your team can evaluate turnaround speed, communication style, and execution quality risk-free before committing to a larger scope.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="glass-card rounded-xl border border-card-border overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-text-primary hover:text-primary-light transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary-light font-mono text-xs">04.</span>
                    Do you sign NDAs for unreleased projects and private data?
                  </span>
                  <span className="font-mono text-lg text-primary-light">
                    {openFaq === 3 ? "−" : "+"}
                  </span>
                </button>
                {openFaq === 3 && (
                  <div className="px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-card-border/40 font-mono">
                    <p>
                      <strong className="text-text-primary">Yes.</strong> I routinely handle confidential product roadmaps, unreleased Discord server architectures, API credentials, and private customer databases under standard mutual non-disclosure agreements.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 5 */}
              <div className="glass-card rounded-xl border border-card-border overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-text-primary hover:text-primary-light transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary-light font-mono text-xs">05.</span>
                    What communication tools do you use for daily updates?
                  </span>
                  <span className="font-mono text-lg text-primary-light">
                    {openFaq === 4 ? "−" : "+"}
                  </span>
                </button>
                {openFaq === 4 && (
                  <div className="px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-card-border/40 font-mono">
                    <p>
                      I adapt directly to your team&apos;s preferred workspace: Slack, Discord, Telegram, or WhatsApp Business for daily communication; Loom for async video updates; and Notion, ClickUp, Asana, Jira, or GitHub for transparent task and sprint tracking.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* ------------------------------------------------------
              SECTION 12: WORK WITH ME (CONTACT)
              ------------------------------------------------------ */}
          <section id="contact" className="scroll-mt-32">
            <div className="glass-card p-8 md:p-12 border border-white/10 bg-[#0f1217]/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] rounded-2xl relative overflow-hidden backdrop-blur-md">
              <div className="max-w-4xl">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/90 block mb-3">
                  12 &middot; GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-4">
                  Have work to get done? Let&apos;s make it happen.
                </h2>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
                  Whether you need commercial video editing, community management, custom Discord bots, or streamlined AI workflow automations, I bring hands-on dedication, clear communication, and reliable execution.
                </p>

                {/* Working Availability Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-mono text-xs">
                  <div className="rounded-lg bg-surface p-4 border border-card-border">
                    <span className="text-text-muted block mb-1">// Setup</span>
                    <span className="text-text-primary font-semibold">Global Remote</span>
                  </div>
                  <div className="rounded-lg bg-surface p-4 border border-card-border">
                    <span className="text-text-muted block mb-1">// Schedule</span>
                    <span className="text-text-primary font-semibold">Flexible Overlap (US / EU)</span>
                  </div>
                  <div className="rounded-lg bg-surface p-4 border border-card-border">
                    <span className="text-text-muted block mb-1">// Roles</span>
                    <span className="text-primary-light font-semibold">Video &middot; Community &middot; Bots &middot; AI</span>
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
                    <span>View Public Code</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Dynamic Tailored Resume Modal */}
      <TailoredResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        initialRole={resumeInitialRole}
      />
    </div>
  );
}
