"use client";

import Image from "next/image";
import { services } from "@/lib/data";
import { motion } from "framer-motion";

const priorityServices = [
  "ai-systems",
  "community-moderator-agents",
  "web-apps",
  "managed-agent-services",
  "social-media",
  "marketing-advisory",
];

const serviceNotes: Record<string, string> = {
  "ai-systems": "Agent workflows, tool access, monitoring, and deployment.",
  "community-moderator-agents": "Discord and Telegram support agents for fast response and safer communities.",
  "web-apps": "Frontend, dashboards, booking funnels, and production deployment.",
  "managed-agent-services": "Ongoing operation, updates, QA, and usage reporting.",
  "social-media": "Content systems and channel operations for creator-led growth.",
  "marketing-advisory": "Positioning, launch planning, and offer architecture.",
};

export default function Services() {
  const visibleServices = priorityServices
    .map((id) => services.find((service) => service.id === id))
    .filter(Boolean) as typeof services;

  return (
    <section id="services" className="relative w-full border-t border-white/10 bg-[#07090d] py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 md:px-12">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="section-kicker mb-4">Core services</p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Packaged AI delivery, built for business workflows.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-text-secondary md:justify-self-end">
            The site still keeps Blogs, Videos, and Marketplace as live product areas. The services are reframed as clear offers a buyer can understand in one scan.
          </p>
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
                  src={service.image}
                  alt={service.title}
                  fill
                  className="professional-image object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/35 to-transparent" />
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
    </section>
  );
}
