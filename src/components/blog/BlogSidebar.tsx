"use client";

// ============================================
// BlogSidebar — the discovery rail for /blogs
// and category pages.
// Desktop (lg+): sticky aside. Mobile: hidden —
// the BlogExplorer toolbar covers search + pills.
//
// Filter state lives in the URL. The server page
// passes the CURRENT filter values in as props
// (initialCategory/initialQuery/initialTag) so this
// component prerenders fully without useSearchParams
// (which bails out of static generation). Clicks
// write params; BlogExplorer reads params from its
// own props on navigation.
// ============================================

import { useEffect, useRef, useState } from "react";
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
  /** Current filter values, passed from the server so SSR matches client state. */
  initialCategory?: string;
  initialQuery?: string;
  initialTag?: string;
  /** Base path for param pushes (/blogs or /blogs/category/<slug>). */
  basePath?: string;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="blog-side-section" aria-label={title}>
      <h2 className="blog-side-heading">{title}</h2>
      {children}
    </section>
  );
}

export default function BlogSidebar({
  categories,
  tags,
  popular,
  months,
  totalPosts,
  initialCategory = "",
  initialQuery = "",
  initialTag = "",
  basePath = "/blogs",
}: Props) {
  const router = useRouter();

  const category = initialCategory;
  const tag = initialTag;
  const [queryDraft, setQueryDraft] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" focuses search.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (e.key === "/" && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function pushParams(mutate: (p: URLSearchParams) => void) {
    const params = new URLSearchParams();
    if (initialQuery) params.set("q", initialQuery);
    if (initialCategory) params.set("category", initialCategory);
    if (initialTag) params.set("tag", initialTag);
    mutate(params);
    const qs = params.toString();
    router.replace(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
  }

  return (
    <aside className="blog-sidebar" aria-label="Blog discovery">
      <Section title="Search">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            pushParams((p) => {
              const value = (document.getElementById("blog-side-search") as HTMLInputElement | null)?.value ?? queryDraft;
              setQueryDraft(value);
              if (value.trim()) p.set("q", value.trim());
              else p.delete("q");
            });
          }}
        >
          <input
            id="blog-side-search"
            ref={inputRef}
            type="search"
            className="blog-search-input"
            placeholder="Search articles…  ( / )"
            aria-label="Search articles"
            defaultValue={initialQuery}
          />
        </form>
      </Section>

      <Section title="Categories">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`blog-pill ${category === "" ? "is-active" : ""}`}
            onClick={() => pushParams((p) => p.delete("category"))}
          >
            All <span className="blog-pill-count">{totalPosts}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={`blog-pill ${category === cat.slug ? "is-active" : ""}`}
              onClick={() =>
                pushParams((p) => {
                  if (category === cat.slug) p.delete("category");
                  else p.set("category", cat.slug);
                })
              }
              aria-pressed={category === cat.slug}
            >
              {cat.name} <span className="blog-pill-count">{cat.count}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-text-muted">
          Prefer full pages?{" "}
          {categories.map((cat, i) => (
            <span key={cat.slug}>
              <Link href={`/blogs/category/${cat.slug}`} className="hover:text-primary-light transition-colors">
                {cat.name}
              </Link>
              {i < categories.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </Section>

      {tags.length > 0 && (
        <Section title="Tags">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t.tag}
                type="button"
                className={`blog-tag ${tag === t.tag ? "is-active" : ""}`}
                onClick={() =>
                  pushParams((p) => {
                    if (tag === t.tag) p.delete("tag");
                    else p.set("tag", t.tag);
                  })
                }
                aria-pressed={tag === t.tag}
              >
                #{t.tag} <span className="blog-pill-count">{t.count}</span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {popular.length > 0 && (
        <Section title="Popular this month">
          <ol className="blog-popular-list">
            {popular.map((p, i) => (
              <li key={p.id} className="flex gap-3">
                <span className="blog-popular-rank" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <Link href={p.href} className="group min-w-0">
                  <span className="block text-sm font-medium leading-snug text-text-secondary group-hover:text-primary-light transition-colors line-clamp-2">
                    {p.title}
                  </span>
                  <span className="text-xs text-text-muted">{p.minutes} min read</span>
                </Link>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {months.length > 1 && (
        <Section title="Archive">
          <ul className="blog-archive-list">
            {months.map((m) => (
              <li key={m.key}>
                <span>{m.label}</span>
                <span className="blog-archive-count">{m.count}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Newsletter">
        <NewsletterForm />
      </Section>

      <Section title="About this blog">
        <p className="text-sm text-text-secondary leading-relaxed mb-3 italic">
          Practical guides and news on AI systems and automation, published straight from our Notion workspace by the team building them daily.
        </p>
        <div className="flex flex-col gap-1.5 text-sm">
          <a href="/rss.xml" className="blog-subscribe-link">RSS feed</a>
          <a href="/feed.json" className="blog-subscribe-link">JSON Feed</a>
          <a href="/llms.txt" className="blog-subscribe-link">llms.txt manifest</a>
        </div>
      </Section>
    </aside>
  );
}

function NewsletterForm() {
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

  if (state === "done") {
    return (
      <p className="text-sm text-text-primary leading-relaxed border border-card-border bg-surface-light p-4" data-testid="newsletter-success">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <p className="text-xs text-text-muted mb-2 leading-relaxed">
        One email when a new guide or deep dive lands. No noise.
      </p>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          required
          className="blog-search-input"
          placeholder="you@company.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Honeypot — real users never see or fill this */}
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
        <button type="submit" className="button-primary px-4 py-2.5 text-sm" disabled={state === "sending"}>
          {state === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-xs text-red-400" role="alert">{message}</p>
      )}
    </form>
  );
}
