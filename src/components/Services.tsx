"use client";

import Image from "next/image";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

const priorityServices = [
  "ai-systems",
  "web-apps",
  "managed-agent-services",
  "social-media",
  "ugc-video-production",
];

const serviceNotes: Record<string, string> = {
  "ai-systems": "Agent workflows, tool access, monitoring, and deployment.",
  "web-apps": "Frontend, dashboards, booking funnels, and production deployment.",
  "managed-agent-services": "Ongoing operation, updates, QA, and usage reporting.",
  "social-media": "Content systems and channel operations for creator-led growth.",
  "ugc-video-production": "Long and short-form UGC and explainer videos for YouTube, TikTok, and your funnel.",
};

const serviceImages: Record<string, string> = {
  "ai-systems": "/images/ai-agent-development.png",
  "web-apps": "/images/uiux-design.png",
  "managed-agent-services": "/images/ai-agent-development.png",
  "social-media": "/images/cms-content-pipelines.png",
  "ugc-video-production": "/images/ai-agent-development.png",
};

const proofProducts = [
  {
    id: "proposal-led-agentic-outreach",
    title: "Proposal-Led Agentic Outreach System",
    description: "Research, personalization, private proposal pages, and controlled outreach.",
    category: "Growth Automation",
    price: "Starting at $1,250",
    href: "/marketplace/products/proposal-led-agentic-outreach",
  },
  {
    id: "blog-os-automated-notion-cms",
    title: "Blog OS Automated Notion CMS Blog Publishing System",
    description: "Notion-backed research, drafting, approvals, scheduling, and publishing.",
    category: "Content Systems",
    price: "Starting at $5,000",
    href: "/marketplace/products/blog-os-automated-notion-cms",
  },
];

export default function Services() {
  const visibleServices = priorityServices
    .map((id) => services.find((service) => service.id === id))
    .filter(Boolean) as typeof services;

  return (
    <section id="services" className="relative w-full border-t border-white/10 bg-[#07090d]">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 md:px-12">
        <div className="py-24 md:py-32">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="section-kicker mb-4">Core services</p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Packaged AI delivery, built for business workflows.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-text-secondary md:justify-self-end">
              Choose the outcome first, then we map the workflow, build the useful front end, and connect the right agent layer behind it.
            </p>
          </div>

          <div className="mb-10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker mb-2">Proof of Work</p>
                <h3 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">Selected implementations</h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-text-secondary">
                Production systems we have already delivered. Not concept work.
              </p>
            </div>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Link
              href="/marketplace/products/proposal-led-agentic-outreach"
              className="glass-card group overflow-hidden rounded-3xl border border-white/10 p-6 transition hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="category-pill bg-primary/15 text-primary-light">Growth Automation</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-white group-hover:text-primary-light transition-colors">
                    Proposal Led Agentic Outreach System
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    Research, personalization, private proposal pages, and controlled outreach tied to your mailbox and CRM.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-surface/90 backdrop-blur-sm border border-primary/30 px-3 py-1.5 text-sm font-bold text-primary-light">
                  Starting at $1,250
                </span>
              </div>
            </Link>

            <Link
              href="/marketplace/products/blog-os-automated-notion-cms"
              className="glass-card group overflow-hidden rounded-3xl border border-white/10 p-6 transition hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="category-pill bg-primary/15 text-primary-light">Content Systems</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-white group-hover:text-primary-light transition-colors">
                    Blog OS Automated Notion CMS Blog Publishing System
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    Notion-backed research, drafting, approvals, scheduling, and publishing on a reliable cadence.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-surface/90 backdrop-blur-sm border border-primary/30 px-3 py-1.5 text-sm font-bold text-primary-light">
                  Starting at $450
                </span>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]"
              >
                <div className="relative h-52 overflow-hidden bg-surface">
                  <Image
                    src={serviceImages[service.id] || service.image}
                    alt={service.title}
                    fill
                    className="professional-image object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/20 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-light">
                    {service.team}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {serviceNotes[service.id] || service.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
