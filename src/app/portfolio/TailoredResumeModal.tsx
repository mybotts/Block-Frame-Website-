"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export type ResumeRole = "all" | "video" | "community" | "discord" | "ai";

interface TailoredResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: ResumeRole;
}

interface RoleResumeData {
  id: ResumeRole;
  label: string;
  badge: string;
  targetTitle: string;
  summary: string;
  coreSkills: string[];
  keyTools: string[];
  experience: {
    role: string;
    organization: string;
    period: string;
    highlights: string[];
  }[];
  verifiableProofs: {
    title: string;
    detail: string;
  }[];
  certifications: string[];
}

const resumeRoles: RoleResumeData[] = [
  {
    id: "all",
    label: "Full-Spectrum Operator",
    badge: "Generalist / All-Rounder",
    targetTitle: "Multi-Disciplinary Digital Specialist | Video, Community, Discord Bots & AI",
    summary:
      "High-impact digital generalist who operates across creative media, Web3 community operations, custom Discord bots, and autonomous AI automation. Experienced in taking products from zero to one: editing high-retention video commercials, managing 2,500+ member Web3 communities, developing verified Discord applications, and architecting autonomous AI workflow pipelines. Available within 24 to 48 hours for remote contracts, sprints, or retainers.",
    coreSkills: [
      "Commercial Video Editing & Motion Graphics",
      "Web3 Community & Social Media Operations",
      "Custom Discord Bot Architecture & Verification",
      "Autonomous AI Systems & Workflow Automation",
      "Cross-Functional Project Management (SOPs & Dashboards)",
      "Customer Support Triage & Trust & Safety Defense",
    ],
    keyTools: [
      "Claude", "Codex", "Zapier / N8N", "Antigravity",
      "Discord", "Telegram", "Slack", "Notion",
      "CapCut", "Canva", "Remotion",
      "Python", "Next.js & React", "GitHub", "Airtable",
    ],
    experience: [
      {
        role: "Technical Lead & Autonomous Systems Builder",
        organization: "BlockFrame Labs",
        period: "2024 - Present",
        highlights: [
          "Architected Groply, an open-core autonomous AI commerce engine with multi-tenant inventory syncing across WhatsApp Cloud API and Telegram.",
          "Maintained 24/7 self-healing supervisor infrastructure on Ubuntu Linux VPS with zero unscheduled downtime across multi-agent fleets.",
          "Produced commercial motion design videos (TinyFish SaaS commercial, Cambrian DeFi explainer, and Lebrel AI Solana launch) with 48h turnaround.",
        ],
      },
      {
        role: "Marketing Associate & Community Operations",
        organization: "Avocado DAO",
        period: "2022 - 2024",
        highlights: [
          "Coordinated community onboarding, gaming campaign support, and multi-channel moderation across Discord and Telegram.",
          "Received official internal team kudos for innovation and initiative on community Twitter and Discord campaigns.",
          "Awarded formal Certificate of Employment and Recommendation from Chief of Operations (COO) David Shi.",
        ],
      },
      {
        role: "Founder & Community Lead",
        organization: "Prime Nexus",
        period: "2021 - 2023",
        highlights: [
          "Founded and grew gaming-focused community across Discord and Telegram; organized 11+ live community events and tournaments.",
          "Developed Prime Ops anti-phishing triage shield bot to protect members against scam airdrop raids.",
        ],
      },
      {
        role: "Bot Developer & Creator",
        organization: "Ignition (Discord Bot)",
        period: "2023 - Present",
        highlights: [
          "Built and launched Ignition, an official verified Discord application listed on Top.gg (bot/1388870348841287690).",
          "Engineered interactive trivia tournaments, gamified rewards, and marketplace modules for community engagement.",
        ],
      },
    ],
    verifiableProofs: [
      { title: "EF SET C2 English Proficiency (73/100)", detail: "Official CEFR C2 Proficient credential (Reading C1 68, Listening C2 78) · cert.efset.org/en/SdicSB" },
      { title: "TinyFish SaaS Product Launch Commercial", detail: "1080p Full HD kinetic video with bold hook architecture" },
      { title: "Lebrel AI Verification Commercial", detail: "Fast-paced Solana & verifiable AI product reveal (verified on X: x.com/sergeo_n/status/2119070670332076118)" },
      { title: "Cambrian AI x DeFi Explainer", detail: "2D motion graphics explainer with modern UI component choreography" },
      { title: "Ignition Discord Bot Verification", detail: "Verified badge on Discord & official Top.gg listing" },
      { title: "Avocado DAO COO Recommendation", detail: "Formal letterhead credential signed by COO David Shi" },
      { title: "Groply Autonomous Commerce Engine", detail: "Public open-core repository on GitHub (github.com/Sergeo01)" },
    ],
    certifications: [
      "EF SET English Certificate — C2 Proficient (73/100, CEFR C2) | cert.efset.org/en/SdicSB",
      "Claude Academy - AI Fluency Framework Foundations (Anthropic)",
      "Claude Academy - Building Effective Human-Agent Teams (Anthropic)",
      "EC-Council CSCU - Certified Secure Computer User",
      "EC-Council EHE - Ethical Hacking Essentials",
      "EC-Council NDE - Network Defense Essentials",
      "Profunda - Community Management & Operations Masterclass",
    ],
  },
  {
    id: "video",
    label: "Video Editor & Motion",
    badge: "Video Specialist",
    targetTitle: "Commercial Video Editor & Motion Designer | SaaS, Web3 & Kinetic Typography",
    summary:
      "Video editor and motion designer specializing in high-retention commercial cuts, kinetic typography, SaaS product walkthroughs, and 2D vector explainers. Proven track record turning complex technical products into punchy, broadcast-quality video assets. Fast 24 to 48 hour turnaround on initial drafts with 16:9 desktop and 9:16 mobile cutdowns. Proficient in CapCut, Adobe Premiere Pro, Canva, and programmatic React video (Remotion).",
    coreSkills: [
      "High-Retention Hook Pacing (0-3s retention optimization)",
      "Kinetic Typography & Synchronized Subtitling",
      "SaaS Interface Choreography & Screencast Enhancements",
      "2D Motion Graphics & Vector Component Explanations",
      "Multi-Track Audio Ducking, SFX & Audio Design",
      "Social Cutdowns (16:9 Landscape & 9:16 Vertical for X/TikTok)",
    ],
    keyTools: [
      "CapCut", "Canva", "Remotion",
    ],
    experience: [
      {
        role: "Commercial Video Editor & Motion Designer",
        organization: "BlockFrame Creative Studio",
        period: "2023 - Present",
        highlights: [
          "Edited TinyFish AI Agent SaaS launch commercial featuring bold kinetic text hook architecture, UI screen animations, and audio sync.",
          "Produced Lebrel AI launch commercial highlighting verifiable inference and Solana cryptographic signing with high-retention motion design.",
          "Produced Cambrian DeFi Explainer video, translating complex yield protocols into clean 2D component cards with dark-mode aesthetic.",
          "Delivered client cutdowns within 24 to 48 hours with multiple aspect ratios for social distribution.",
        ],
      },
      {
        role: "Content & Visual Campaign Associate",
        organization: "Avocado DAO & Prime Nexus",
        period: "2022 - 2024",
        highlights: [
          "Created video teasers, event announcement graphics, and community tournament recaps.",
          "Supported viral social campaigns resulting in over 20,500 organic engagements.",
        ],
      },
    ],
    verifiableProofs: [
      { title: "TinyFish SaaS Launch Commercial", detail: "1080p kinetic typography commercial (viewable at blockframe.cloud/portfolio)" },
      { title: "Lebrel AI Frontier Verification", detail: "1080p 60fps high-retention commercial (verified on X: x.com/sergeo_n/status/2119070670332076118)" },
      { title: "Cambrian AI x DeFi Explainer", detail: "2D FinTech motion graphics explainer with layered UI components" },
      { title: "Multi-Format Deliverables", detail: "16:9 YouTube/Website cuts + 9:16 vertical TikTok/Reels edits" },
    ],
    certifications: [
      "EF SET English Certificate — C2 Proficient (73/100, CEFR C2) | cert.efset.org/en/SdicSB",
      "Profunda - Media Production & Content Engagement",
      "Claude Academy - Visual & Prompt Architecture",
    ],
  },
  {
    id: "community",
    label: "Community & Social Ops",
    badge: "Community Specialist",
    targetTitle: "Community Operations Lead, Social Media Manager & Trust & Safety Specialist",
    summary:
      "Web3-native Community Operations and Social Media professional with hands-on experience managing Discord, Telegram, and X (Twitter) ecosystems. Proven ability to architect onboarding funnels, organize live virtual events, coordinate marketing campaigns, enforce AutoMod security against phishing raids, and drive user engagement. Recognized by executive leadership for innovation and reliable execution.",
    coreSkills: [
      "Community Server Architecture (Discord & Telegram)",
      "Trust & Safety, Anti-Phishing Defense & Raid Mitigation",
      "Social Media Content Strategy & KOL Campaign Coordination",
      "Live Virtual Event Planning & Hosting (11+ Hosted Events)",
      "Customer Support Queue Management (Zendesk, Bitrix24, Intercom)",
      "Standard Operating Procedures (SOPs) & Notion Knowledge Bases",
    ],
    keyTools: [
      "Discord", "Telegram", "Slack", "WhatsApp Business",
      "Notion", "ClickUp", "Asana", "Airtable", "Trello",
      "Zendesk", "HubSpot", "Bitrix24", "Intercom",
      "Microsoft Excel & Word", "Google Docs & Sheets",
    ],
    experience: [
      {
        role: "Marketing Associate & Community Operations",
        organization: "Avocado DAO",
        period: "2022 - 2024",
        highlights: [
          "Moderated large-scale Web3 gaming community channels across Discord and Telegram.",
          "Assisted users with wallet onboarding, campaign mechanics, and support queries.",
          "Awarded official Kudos by marketing team for driving fresh GameFi content initiatives.",
          "Received formal Letter of Recommendation from COO David Shi for reliability and team execution.",
        ],
      },
      {
        role: "Founder & Community Lead",
        organization: "Prime Nexus",
        period: "2021 - 2023",
        highlights: [
          "Built and managed independent gaming community across Discord and Telegram.",
          "Hosted 11+ live community game nights, tournaments, and AMA sessions.",
          "Designed comprehensive Notion event trackers and campaign calendars.",
        ],
      },
    ],
    verifiableProofs: [
      { title: "Avocado DAO COO Recommendation Letter", detail: "Official signed letter from COO David Shi recognizing community reliability" },
      { title: "Marketing Innovation Kudos Proof", detail: "Internal Slack/Discord recognition for high-impact social initiatives" },
      { title: "20,500+ Organic Social Engagements", detail: "Documented social campaign metrics and community growth" },
      { title: "Profunda Community Management Certificate", detail: "Certified in community strategy, retention, and crisis management" },
    ],
    certifications: [
      "EF SET English Certificate — C2 Proficient (73/100, CEFR C2) | cert.efset.org/en/SdicSB",
      "Profunda - Community Management & Operations Masterclass",
      "EC-Council CSCU - Certified Secure Computer User",
      "Claude Academy - Building Effective Human-Agent Teams",
    ],
  },
  {
    id: "discord",
    label: "Custom Discord Bots",
    badge: "Bot Engineer",
    targetTitle: "Custom Discord Bot Engineer & Community Security Developer",
    summary:
      "Developer specializing in custom Discord bots for server gamification, automated moderation, role-gating, ticket triage, and anti-phishing shield defense. Creator of Ignition, an official verified Discord application listed on Top.gg, and Prime Ops, an automated incident response bot for server triage. Capable of building custom Discord bot architectures tailored to any community or enterprise server requirement.",
    coreSkills: [
      "Discord Developer Portal & Discord API Integration",
      "Slash Commands, Interactive Buttons & Modal Forms",
      "AutoMod Filters, Malicious Link Interception & Anti-Raid Defense",
      "Gamified Trivia Tournaments, XP Leaderboards & Server Markets",
      "Role Gating, Token Verification & Onboarding Automation",
      "Webhook Integrations, Logging & Automated Support Ticketing",
    ],
    keyTools: [
      "Discord API", "Top.gg API", "Node.js / TypeScript", "Python",
      "Redis", "Docker", "Linux Ubuntu VPS", "GitHub CI/CD",
    ],
    experience: [
      {
        role: "Lead Discord Application Architect",
        organization: "Ignition Discord Bot",
        period: "2023 - Present",
        highlights: [
          "Built and launched Ignition, successfully passing Discord's official developer verification.",
          "Published and maintained on Top.gg (bot/1388870348841287690) serving multiple community servers.",
          "Engineered interactive trivia modules, automated reward distribution, and community retention loops.",
        ],
      },
      {
        role: "Security & Operations Bot Engineer",
        organization: "Prime Ops (Internal Shield)",
        period: "2023 - Present",
        highlights: [
          "Engineered Prime Ops for Prime Nexus and BlockFrame HQ servers.",
          "Automated suspicious link detection to eliminate scam airdrops and malicious token lures.",
          "Implemented ticket triage queues to route member inquiries directly to staff.",
        ],
      },
      {
        role: "Custom Bot Development for Clients",
        organization: "BlockFrame Labs",
        period: "2024 - Present",
        highlights: [
          "Constructs custom bots for clients: custom announcement webhooks, ticketing systems, and community commerce.",
        ],
      },
    ],
    verifiableProofs: [
      { title: "Ignition Verified Discord Application", detail: "Official verified badge from Discord & Top.gg listing" },
      { title: "Prime Ops Incident Shield", detail: "Real-time scam interception and automated onboarding verification" },
      { title: "Top.gg Directory Profile", detail: "Live public listing: top.gg/bot/1388870348841287690" },
    ],
    certifications: [
      "EF SET English Certificate — C2 Proficient (73/100, CEFR C2) | cert.efset.org/en/SdicSB",
      "EC-Council CSCU - Certified Secure Computer User",
      "EC-Council NDE - Network Defense Essentials",
      "Claude Academy - AI Fluency Framework Foundations",
    ],
  },
  {
    id: "ai",
    label: "AI Systems & Automation",
    badge: "AI Engineer",
    targetTitle: "AI Systems Architect & Autonomous Workflow Automation Builder",
    summary:
      "AI systems engineer specializing in autonomous multi-agent pipelines, conversational commerce engines, and self-hosted cloud automation. Lead architect of Groply, an open-core autonomous AI commerce engine with multi-tenant inventory synchronization and WhatsApp Cloud API integration. Deep experience deploying self-healing Linux VPS infrastructure, Docker stacks, and LLM API orchestrations.",
    coreSkills: [
      "Autonomous Multi-Agent Fleet Orchestration",
      "Conversational Commerce & WhatsApp Cloud API",
      "Frontier LLM Reasoning & Agentic Tool Calling (Claude 3.7 Sonnet, OpenAI o3-mini, DeepSeek-R1)",
      "Workflow Automations (Make, Zapier, Webhooks, Cron Jobs)",
      "Docker Containerization & Self-Hosted Ubuntu Linux VPS",
      "Reverse Proxying (Caddy / Nginx) & High-Reliability Supervisor Daemons",
    ],
    keyTools: [
      "Claude", "Codex", "Zapier / N8N", "Antigravity",
      "Python", "Next.js & React", "GitHub", "Linux VPS",
    ],
    experience: [
      {
        role: "Lead Systems Architect & Founder",
        organization: "BlockFrame Labs",
        period: "2024 - Present",
        highlights: [
          "Developed Groply Open-Core Autonomous AI Commerce Engine (public repository: github.com/Sergeo01).",
          "Engineered multi-agent supervisor systems operating 24/7 with persistent memory and skill learning loops.",
          "Deployed marketing automation and lead routing workflows with zero data loss.",
        ],
      },
      {
        role: "Automation & Infrastructure Lead",
        organization: "Prime Nexus & Client Portals",
        period: "2023 - 2024",
        highlights: [
          "Built automated Notion CMS pipelines and social publishing hooks.",
          "Configured secure VPS infrastructure, SSL automation, and DNS routing.",
        ],
      },
    ],
    verifiableProofs: [
      { title: "Groply Autonomous AI Commerce Engine", detail: "Open-source core available on GitHub (github.com/Sergeo01)" },
      { title: "Multi-Agent Fleet Supervisor", detail: "24/7 automated fleet with self-healing systemd process supervisor" },
      { title: "EC-Council & Claude Academy Credentials", detail: "Certified in AI Fluency, Human-Agent Teams, and Network Defense" },
    ],
    certifications: [
      "EF SET English Certificate — C2 Proficient (73/100, CEFR C2) | cert.efset.org/en/SdicSB",
      "Claude Academy - AI Fluency Framework Foundations (Anthropic)",
      "Claude Academy - Building Effective Human-Agent Teams (Anthropic)",
      "EC-Council CSCU - Certified Secure Computer User",
      "EC-Council EHE - Ethical Hacking Essentials",
      "EC-Council NDE - Network Defense Essentials",
    ],
  },
];

export default function TailoredResumeModal({
  isOpen,
  onClose,
  initialRole = "all",
}: TailoredResumeModalProps) {
  const [selectedRole, setSelectedRole] = useState<ResumeRole>(initialRole);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const activeData = resumeRoles.find((r) => r.id === selectedRole) || resumeRoles[0];

  const handlePrint = () => {
    trackEvent("resume_print_pdf", {
      role: selectedRole,
      target_title: activeData.targetTitle,
    });
    window.print();
  };

  const handleCopyMarkdown = () => {
    trackEvent("resume_copy_markdown", {
      role: selectedRole,
      target_title: activeData.targetTitle,
    });
    const md = `
# SERGEO
**${activeData.targetTitle}**
- Email: contactsergeo@gmail.com
- Portfolio: https://www.blockframe.cloud/portfolio
- Location / Setup: Global Remote (Flexible Overlap for US & EU)
- Start Availability: Within 24 to 48 Hours

---

## EXECUTIVE SUMMARY
${activeData.summary}

---

## CORE COMPETENCIES
${activeData.coreSkills.map((s) => `- ${s}`).join("\n")}

---

## SOFTWARE & TECHNICAL STACK
${activeData.keyTools.join(" · ")}

---

## EXPERIENCE & TRACK RECORD
${activeData.experience
  .map(
    (exp) => `
### ${exp.role} — ${exp.organization} (${exp.period})
${exp.highlights.map((h) => `- ${h}`).join("\n")}`
  )
  .join("\n")}

---

## VERIFIABLE DELIVERABLES & PROOFS
${activeData.verifiableProofs.map((p) => `- **${p.title}**: ${p.detail}`).join("\n")}

---

## CERTIFICATIONS
${activeData.certifications.map((c) => `- ${c}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 md:p-6 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-h-[94vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0c0e12] text-text-primary shadow-2xl shadow-black/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-card-border bg-surface/80 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-widest text-primary-light">
                Tailored 1-Page Resume Generator
              </span>
              <span className="rounded-md bg-white/[0.06] border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                Live Dynamic
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-text-primary">
              Choose the role you are hiring for:
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-surface-light border border-card-border px-3 py-1.5 text-xs font-semibold text-text-secondary hover:text-white transition"
          >
            Close &times;
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-4 bg-surface/40 border-b border-card-border flex-shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {resumeRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  setSelectedRole(role.id);
                  trackEvent("resume_role_tab_click", { role: role.id, label: role.label });
                }}
                className={`p-2.5 rounded-xl border text-left transition text-xs flex flex-col justify-between ${
                  selectedRole === role.id
                    ? "bg-white/[0.08] border-white/30 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)]"
                    : "bg-white/[0.02] border-white/[0.06] text-text-secondary hover:border-white/15 hover:bg-white/[0.04]"
                }`}
              >
                <span className="font-bold block truncate">{role.label}</span>
                <span className="text-[10px] text-text-muted font-mono block mt-1">
                  {role.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar (Print & Copy) */}
        <div className="px-5 py-3 bg-[#111418] border-b border-card-border flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex items-center gap-2 text-text-muted font-mono">
            <span>Viewing:</span>
            <span className="text-primary-light font-semibold">{activeData.label} 1-Page Format</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-surface px-3 py-1.5 font-mono text-text-secondary hover:text-text-primary hover:bg-surface-light transition"
            >
              <span>{copied ? "Copied to Clipboard" : "Copy Plaintext / Markdown"}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 font-semibold text-black hover:bg-white/90 transition shadow-sm font-sans"
            >
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet Preview */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 bg-[#08090b]">
          <div
            id="printable-resume"
            className="mx-auto max-w-3xl rounded-xl border border-card-border bg-[#0f1115] p-6 md:p-8 shadow-xl text-text-primary text-xs leading-relaxed print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print:m-0"
          >
            {/* Resume Header */}
            <div className="border-b border-card-border pb-5 mb-5 print:border-black/20">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary print:text-black mb-1">
                    SERGEO
                  </h1>
                  <p className="text-xs md:text-sm font-semibold text-primary-light print:text-black/80 font-mono">
                    {activeData.targetTitle}
                  </p>
                </div>
                <div className="text-right text-[11px] font-mono text-text-muted print:text-black/70 space-y-0.5">
                  <div>contactsergeo@gmail.com</div>
                  <div>blockframe.cloud/portfolio</div>
                  <div>Global Remote (US &amp; EU Overlap)</div>
                  <div className="text-emerald-400 print:text-black font-semibold">Start: Within 24-48 Hours</div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-5">
              <h2 className="text-[11px] font-mono uppercase tracking-widest text-primary-light print:text-black/80 font-bold mb-2">
                Executive Profile
              </h2>
              <p className="text-text-secondary print:text-black/90 leading-relaxed text-xs">
                {activeData.summary}
              </p>
            </div>

            {/* Core Competencies & Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 border-t border-card-border/60 pt-4 print:border-black/20">
              <div>
                <h2 className="text-[11px] font-mono uppercase tracking-widest text-primary-light print:text-black/80 font-bold mb-2">
                  Core Competencies
                </h2>
                <ul className="space-y-1 text-text-secondary print:text-black/90">
                  {activeData.coreSkills.map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-primary-light print:text-black">&bull;</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[11px] font-mono uppercase tracking-widest text-primary-light print:text-black/80 font-bold mb-2">
                  Software Stack &amp; Tools
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {activeData.keyTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-surface-light px-2 py-0.5 text-[10px] font-mono text-text-primary border border-card-border print:border-black/20 print:bg-transparent print:text-black"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience & Track Record */}
            <div className="mb-5 border-t border-card-border/60 pt-4 print:border-black/20">
              <h2 className="text-[11px] font-mono uppercase tracking-widest text-primary-light print:text-black/80 font-bold mb-3">
                Professional Experience &amp; Deliverables
              </h2>
              <div className="space-y-4">
                {activeData.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                      <span className="font-bold text-text-primary print:text-black">
                        {exp.role} &middot; <span className="text-primary-light print:text-black">{exp.organization}</span>
                      </span>
                      <span className="text-text-muted print:text-black/60">{exp.period}</span>
                    </div>
                    <ul className="space-y-1 text-text-secondary print:text-black/90 pl-3">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="list-disc">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Verifiable Deliverables & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-card-border/60 pt-4 print:border-black/20">
              <div>
                <h2 className="text-[11px] font-mono uppercase tracking-widest text-primary-light print:text-black/80 font-bold mb-2">
                  Verifiable Work Proofs
                </h2>
                <ul className="space-y-1 text-text-secondary print:text-black/90">
                  {activeData.verifiableProofs.map((proof, idx) => (
                    <li key={idx}>
                      <span className="font-semibold text-text-primary print:text-black">{proof.title}:</span>{" "}
                      <span className="text-text-muted print:text-black/70">{proof.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[11px] font-mono uppercase tracking-widest text-primary-light print:text-black/80 font-bold mb-2">
                  Credentials &amp; Certifications
                </h2>
                <ul className="space-y-1 text-text-secondary print:text-black/90">
                  {activeData.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-6 pt-3 border-t border-card-border/40 text-[10px] font-mono text-text-muted print:text-black/50 flex justify-between items-center print:border-black/20">
              <span>Interactive verification links available online at blockframe.cloud/portfolio</span>
              <span>Tailored for immediate recruitment · 24-48h start</span>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface/80 border-t border-card-border flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <span className="text-text-muted font-mono">
            Need custom contract terms or an NDA? Email <a href="mailto:contactsergeo@gmail.com" className="text-primary-light hover:underline font-semibold">contactsergeo@gmail.com</a>
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:text-white transition"
            >
              Done
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90 transition shadow-sm font-sans"
            >
              Print / Save as PDF &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
