"use client";

import Image from "next/image";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

const priorityServices = [
  "ai-systems",
  "voice-agent",
  "web-apps",
  "managed-agent-services",
  "social-media",
  "ugc-video-production",
];

const serviceNotes: Record<string, string> = {
  "ai-systems": "AI systems and services for support, data, and operations.",
  "voice-agent": "24/7 voice AI that answers calls, qualifies callers, and books meetings.",
  "web-apps": "Full-stack web platforms and mobile apps, built to scale.",
  "managed-agent-services": "We run and maintain your systems. You get the results.",
  "social-media": "Content systems and posting infrastructure that runs itself.",
  "ugc-video-production": "UGC, explainers, and video ads. From script to publish.",
};

const serviceImages: Record<string, string> = {
  "ai-systems": "/images/ai-agent-development.png",
  "voice-agent": "/images/voice-agent.png",
  "web-apps": "/images/uiux-design.png",
  "managed-agent-services": "/images/managed-agent-services.png",
  "social-media": "/images/social-media.png",
  "ugc-video-production": "/images/ugc-video-production.png",
};

const proofProducts = [
  {
    id: "proposal-led-agentic-outreach",
    title: "Proposal-Led Agentic Outreach",
    description: "Researches prospects, creates personalized sample assets, and sends proof-led outreach through your existing CRM.",
    category: "Growth Automation",
    href: "/marketplace/products/proposal-led-agentic-outreach",
    badge: "1 Month Free Trial",
  },
  {
    id: "blog-os-automated-notion-cms",
    title: "Blog OS: Automated Content Pipeline",
    description: "37 posts published in 90 days with zero manual editing. The same Notion-backed pipeline we use for our own blog, now available for yours.",
    category: "Content Systems",
    href: "/marketplace/products/blog-os-automated-notion-cms",
    badge: "1 Month Free Trial",
    stats: [{ label: "Posts", value: "37" }, { label: "Days", value: "90" }, { label: "Manual edits", value: "0" }],
  },
  {
    id: "social-agent-multi-platform",
    title: "Social Agent: AI Multi-Platform Posting and Lead Qualification",
    description: "Posts across 15 platforms, auto-replies to comments and DMs, qualifies inbound leads, and routes them to your CRM.",
    category: "Growth Systems",
    href: "/marketplace/products/social-agent-multi-platform",
  },
];

export default function Services() {
  const visibleServices = priorityServices
    .map((id) => services.find((service) => service.id === id))
    .filter(Boolean) as typeof services;

  return (
    <section id="services" className="relative w-full border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 md:px-12">
        <div className="py-24 md:py-32">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="section-kicker mb-4">Core services</p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
                What we build and ship.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-text-secondary md:justify-self-end">
              From AI systems and services to web platforms to video. Packaged for teams that need results, not experiments.
            </p>
          </div>

          <div className="mb-10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker mb-2">Case studies</p>
                <h3 className="text-2xl font-semibold tracking-tight text-text-primary md:text-4xl">Built and deployed</h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-text-secondary">
                Real systems we operate daily. Not demos, not slide decks.
              </p>
            </div>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {proofProducts.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="glass-card group overflow-hidden p-6 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="category-pill bg-primary/15 text-primary-light">{product.category}</span>
                      {product.badge && (
                        <span className="category-pill border border-emerald-400/30 bg-emerald-50 text-emerald-700">{product.badge}</span>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-text-primary group-hover:text-primary-light transition-colors">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary italic">
                      {product.description}
                    </p>
                    {"stats" in product && product.stats && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {(product.stats as { label: string; value: string }[]).map((stat) => (
                          <div key={stat.label} className="bg-surface-light p-2.5 text-center">
                            <p className="text-xl font-bold text-primary-light">{stat.value}</p>
                            <p className="text-xs text-text-secondary">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group overflow-hidden bg-surface-light"
              >
                <Link href={`/services/${service.id}`} className="block">
                  <div className="relative h-52 overflow-hidden bg-surface">
                    <Image
                      src={serviceImages[service.id] || service.image}
                      alt={service.title}
                      fill
                      className="professional-image object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-light">
                      {service.team}
                    </p>
                    <h3 className="text-xl font-semibold tracking-tight text-text-primary group-hover:text-primary-light transition-colors">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary italic">
                      {serviceNotes[service.id] || service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:text-primary-light transition-colors">
                      Learn more
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
