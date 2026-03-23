"use client";

import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";

export default function MarketplaceProductsPage() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <ParticleBackground />

      <SmoothScroller>
        <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-40 pb-24 px-6 md:px-12 text-center pointer-events-none">
          <div className="hero-radial-glow opacity-40 z-[-1]" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col items-center gap-6 max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-semibold tracking-widest text-text-secondary uppercase">
                Systems initializing
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Marketplace <span className="text-gradient">Coming Soon.</span>
            </h1>
            
            <p className="text-xl text-text-secondary font-light leading-relaxed mt-4">
              We are finalizing our first deployment of enterprise AI templates and high-performance protocols. Reach out to get notified when the first module launches.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 pointer-events-auto">
              <a href="/#contact" className="relative inline-flex h-16 w-full md:w-auto overflow-hidden rounded-full p-[1px] focus:outline-none group shadow-[0_0_40px_rgba(0,240,255,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all duration-500">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050507_0%,#00f0ff_50%,#050507_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-surface-light px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-3xl transition-all group-hover:bg-black/80 duration-500">
                  Join the Waitlist
                </span>
              </a>
              <a href="/" className="button-secondary px-8 py-4 h-16 flex items-center text-sm font-semibold tracking-wide text-center">
                Return Home
              </a>
            </div>
          </motion.div>
        </main>
      </SmoothScroller>
    </>
  );
}
