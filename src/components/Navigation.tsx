"use client";

import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="w-full flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo + Brand */}
        <a href="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white logo-hover transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Image
              src="/images/logo.png"
              alt="BlockFrameLabs Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary group-hover:text-gradient transition-all duration-300">
            BlockFrameLabs
          </span>
        </a>

        {/* Right Nav */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
          >
            Services
          </a>
          <a
            href="/ai-news"
            className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
          >
            AI News
          </a>
          <a
            href="/guides"
            className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
          >
            Guides
          </a>
          <a
            href="/marketplace/products"
            className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
          >
            Marketplace/Products
          </a>
          <a
            href="https://x.com/blockframelabs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-text-secondary hover:border-accent/50 hover:text-white hover:bg-accent/10 transition-all duration-300"
          >
            X
          </a>
        </div>
      </div>
    </nav>
  );
}
