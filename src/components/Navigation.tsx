"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/marketplace/products" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "mailto:contact@blockframe.cloud?subject=Project%20inquiry%20for%20BlockFrame%20Labs" },
];

const businessMailHref = "mailto:contact@blockframe.cloud?subject=Project%20inquiry%20for%20BlockFrame%20Labs";
const calendlyHref = "https://calendly.com/blockframemedia/30min";

function isActive(href: string, pathname: string): boolean {
  if (href.startsWith("/#")) {
    return pathname === "/";
  }
  if (href === "/blogs") {
    return pathname === "/blogs" || pathname.startsWith("/post/");
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap for mobile menu
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-text-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to main content
      </a>

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-nav-bg backdrop-blur-xl" aria-label="Main navigation">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-12">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden bg-surface p-1 shadow-[0_0_18px_rgba(0,0,0,0.08)]">
              <Image src="/images/logo.png" alt="BlockFrame Labs Logo" fill className="object-contain p-1" priority sizes="40px" />
            </div>
            <span className="text-base font-semibold tracking-tight text-text-primary transition-colors group-hover:text-primary-light">
              BlockFrame Labs
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href, pathname);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={"nav-link" + (active ? " text-primary-light" : "")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
              href="/marketplace/products/voice-agent-24-7"
              className="nav-link text-primary-light hover:text-primary-light/80"
            >
              Voice Agent
            </Link>
            <a
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center bg-text-primary px-5 text-sm font-semibold text-background transition hover:opacity-85"
            >
              Book a Call
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className="inline-flex h-11 w-11 items-center justify-center text-text-secondary transition hover:text-text-primary md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <button
            className="fixed inset-0 z-40 bg-overlay md:hidden"
            onClick={closeMobileMenu}
            aria-label="Close menu backdrop"
            tabIndex={-1}
          />
          <aside
            className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-border bg-background p-6 shadow-2xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">Menu</span>
              <button
                className="inline-flex h-10 w-10 items-center justify-center text-text-secondary"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              {navItems.map((item) => {
                const active = isActive(item.href, pathname);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={"text-lg font-medium " + (active ? "text-primary-light" : "text-text-primary")}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/marketplace/products/voice-agent-24-7"
                className="text-lg font-medium text-primary-light"
                onClick={closeMobileMenu}
              >
                Voice Agent
              </Link>
              <a
                href={calendlyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-12 items-center justify-center bg-text-primary px-5 text-sm font-semibold text-background"
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
