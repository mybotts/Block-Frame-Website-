"use client";

// ============================================
// BlogSidebar — the focused discovery & subscription
// rail for /blogs.
// Desktop (lg+): sticky aside. Mobile: hidden.
// ============================================

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ExplorerCategory, ExplorerTag } from "./BlogExplorer";

export interface SidebarPost {
  id: string;
  title: string;
  href: string;
  minutes: number;
}

export interface SidebarMonth {
  key: string;
  label: string;
  count: number;
}

interface Props {
  categories: ExplorerCategory[];
  tags: ExplorerTag[];
  popular: SidebarPost[];
  months: SidebarMonth[];
  totalPosts: number;
  initialCategory?: string;
  initialQuery?: string;
  initialTag?: string;
  basePath?: string;
}

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-card-border bg-card-bg/70 p-5 backdrop-blur-sm ${className}`} aria-label={title}>
      <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function SidebarNewsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("done");
        setMessage(data.message || "You're on the list. Watch your inbox.");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <div className="relative rounded-xl border border-primary/40 bg-gradient-to-b from-primary/10 via-card-bg to-card-bg p-5 overflow-hidden shadow-[0_0_25px_rgba(0,179,191,0.08)]">
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-primary/20 blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary-light animate-pulse" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-light">
            BlockFrame Dispatch
          </span>
        </div>

        <h3 className="text-lg font-bold text-text-primary tracking-tight mb-1.5 leading-snug">
          Get Daily AI Trends
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">
          Zero sponsored noise. Technical breakdowns of autonomous agents, automation workflows, and live benchmarks straight from our labs.
        </p>

        {state === "done" ? (
          <div className="rounded-lg border border-primary/40 bg-primary/10 p-3 text-xs text-primary-light">
            ✓ {message}
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-2">
            <input
              type="email"
              required
              className="blog-search-input text-xs px-3 py-2 rounded-lg"
              placeholder="you@company.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="button-primary w-full py-2 text-xs font-semibold"
              disabled={state === "sending"}
            >
              {state === "sending" ? "Subscribing…" : "Subscribe Free"}
            </button>
            {state === "error" && (
              <p className="text-[11px] text-red-400 mt-1">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default function BlogSidebar({
  categories,
  popular,
  initialCategory = "",
  initialQuery = "",
  initialTag = "",
  basePath = "/blogs",
}: Props) {
  const router = useRouter();
  const category = initialCategory;

  function pushCategory(slug: string) {
    const params = new URLSearchParams();
    if (initialQuery) params.set("q", initialQuery);
    if (initialTag) params.set("tag", initialTag);
    if (slug) params.set("category", slug);
    const qs = params.toString();
    router.replace(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
  }

  return (
    <aside className="blog-sidebar sticky top-28 flex flex-col gap-5 w-full lg:w-[320px] shrink-0" aria-label="Blog discovery">
      {/* 1. High-Converting Email Subscription Card (TOP) */}
      <SidebarNewsletter />

      {/* 2. Popular Deep Dives */}
      {popular && popular.length > 0 && (
        <Section title="Trending Deep Dives">
          <ol className="space-y-3">
            {popular.slice(0, 4).map((p, i) => (
              <li key={p.id} className="flex items-start gap-2.5">
                <span className="font-mono text-xs font-bold text-primary-light/80 shrink-0 pt-0.5">
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <Link href={p.href} className="group min-w-0">
                  <span className="block text-xs sm:text-sm font-medium leading-snug text-text-secondary group-hover:text-primary-light transition-colors line-clamp-2">
                    {p.title}
                  </span>
                  <span className="text-[11px] text-text-muted">{p.minutes} min read</span>
                </Link>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* 3. Topics / Categories */}
      <Section title="Topics">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            className={`blog-pill text-xs py-1 px-2.5 ${category === "" ? "is-active" : ""}`}
            onClick={() => pushCategory("")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={`blog-pill text-xs py-1 px-2.5 ${category === cat.slug ? "is-active" : ""}`}
              onClick={() => pushCategory(category === cat.slug ? "" : cat.slug)}
              aria-pressed={category === cat.slug}
            >
              {cat.name} <span className="blog-pill-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* 4. Developer & Agent Console */}
      <Section title="Agent & API Access">
        <p className="text-xs text-text-secondary leading-relaxed mb-3 font-light">
          Reading programmatically? Full-text markdown mirrors, feeds, and schema:
        </p>
        <div className="flex flex-col gap-1.5 text-xs">
          <a href="/llms.txt" className="blog-subscribe-link py-1 hover:text-primary-light flex items-center justify-between">
            <span>llms.txt manifest</span>
            <span className="text-[10px] font-mono text-text-muted">LLM</span>
          </a>
          <a href="/rss.xml" className="blog-subscribe-link py-1 hover:text-primary-light flex items-center justify-between">
            <span>RSS Feed</span>
            <span className="text-[10px] font-mono text-text-muted">XML</span>
          </a>
          <a href="/feed.json" className="blog-subscribe-link py-1 hover:text-primary-light flex items-center justify-between">
            <span>JSON Feed</span>
            <span className="text-[10px] font-mono text-text-muted">API</span>
          </a>
        </div>
      </Section>
    </aside>
  );
}
