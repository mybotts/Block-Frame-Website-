"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Videos", href: "/videos" },
  { label: "Marketplace/Products", href: "/marketplace/products" },
];

const businessMailHref = "mailto:contact@blockframe.cloud?subject=Project%20inquiry%20for%20BlockFrame%20Labs";
const calendlyHref = "https://calendly.com/blockframemedia/30min";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#06070a]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-12">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white p-1 shadow-[0_0_18px_rgba(255,255,255,0.10)]">
              <Image src="/images/logo.png" alt="BlockFrame Labs Logo" fill className="object-contain p-1" priority />
            </div>
            <span className="text-base font-semibold tracking-tight text-white transition-colors group-hover:text-primary-light">
              BlockFrame Labs
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href={businessMailHref} className="nav-link">
              Contact
            </a>
            <a
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-primary-light"
            >
              Book a Call
            </a>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-text-secondary transition hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <button
            className="fixed inset-0 z-40 bg-black/70 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />
          <aside className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-white/10 bg-[#06070a] p-6 shadow-2xl md:hidden">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">Menu</span>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text-secondary"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a href={businessMailHref} className="text-lg font-medium text-white" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
              <a
                href={calendlyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black"
              >
                Book a Call
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
