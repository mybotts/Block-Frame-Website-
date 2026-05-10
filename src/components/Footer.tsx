"use client";

import { FiYoutube, FiInstagram, FiTv } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-12 md:py-16 bg-black/50 backdrop-blur-md border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-3 mb-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white logo-hover transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img
              src="/images/logo.png"
              alt="BlockFrameLabs Logo"
              className="object-contain p-1"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary group-hover:text-gradient transition-all duration-300">
            BlockFrameLabs
          </span>
        </a>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://www.tiktok.com/@blockframe_labs?_r=1&_t=ZN-96Et1Hif4j8"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none group shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-500 tiktok-footer"
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050507_0%,#00f0ff_50%,#050507_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-surface-light px-4 py-2 text-sm font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-black/80 duration-500">
              <FiTv className="h-5 w-5" />
              TikTok
            </span>
          </a>
          
          <a
            href="https://youtube.com/@blockframelabs?si=Z2MnWDopzMohKjXd"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none group shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-500 youtube-footer"
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050507_0%,#00f0ff_50%,#050507_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-surface-light px-4 py-2 text-sm font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-black/80 duration-500">
              <FiYoutube className="h-5 w-5" />
              YouTube
            </span>
          </a>
          
          <a
            href="https://www.instagram.com/blockframelabs?igsh=MWtwYWQycHR3cXJlYw=="
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none group shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-500 instagram-footer"
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050507_0%,#00f0ff_50%,#050507_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-surface-light px-4 py-2 text-sm font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-black/80 duration-500">
              <FiInstagram className="h-5 w-5" />
              Instagram
            </span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} BlockFrame Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}