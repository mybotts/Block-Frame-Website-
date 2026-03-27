"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="w-full flex items-center justify-between px-6 md:px-12 py-4">
          {/* Logo */}
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

          {/* Desktop Right Nav */}
          <div className="hidden md:flex items-center gap-6">
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
              Marketplace
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-text-secondary hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden flex flex-col">
            <div className="flex items-center justify-end p-4">
              <button
                className="text-text-secondary hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-4 px-6 py-4">
              <a
                href="/"
                className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/ai-news"
                className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI News
              </a>
              <a
                href="/guides"
                className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guides
              </a>
              <a
                href="/marketplace/products"
                className="text-sm font-semibold tracking-widest uppercase text-text-secondary hover:text-white transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}