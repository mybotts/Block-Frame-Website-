"use client";

import { motion } from "framer-motion";

const tech = [
  "OpenClaw",
  "Next.js",
  "LangChain",
  "Notion API",
  "Vercel",
  "Docker",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "React 19",
];

export default function TechMarquee() {
  return (
    <div className="w-full h-24 border-y border-border bg-surface/50 backdrop-blur-sm overflow-hidden flex items-center relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-20"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...tech, ...tech].map((item, index) => (
          <div key={index} className="flex items-center gap-4 text-xs font-bold tracking-[0.3em] text-text-muted uppercase">
            <div className="h-1 w-1 bg-accent rounded shadow-[0_0_8px_var(--color-accent)]" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
