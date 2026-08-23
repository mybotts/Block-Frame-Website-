"use client";

// ============================================
// BlogExplorer — client island for the /blogs index.
// Owns search, category filter, tag filter, sort,
// grid/list toggle, and progressive reveal.
//
// Design: the URL query string is the SINGLE source
// of truth for category/q/tag/sort. This island READS
// them via useSearchParams and WRITES them via
// router.replace on user interaction. No mirrored
// state, so sidebar- and explorer-driven changes can
// never drift or loop. First page of cards renders
// inside this island on the server for SEO.
// ============================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { BlogPost } from "@/lib/types";

export type SortKey = "newest" | "oldest" | "longest";
export type ViewMode = "grid" | "list";

const PAGE_SIZE = 12;

export interface ExplorerCategory {
  slug: string;
  name: string;
  count: number;
}

export interface ExplorerTag {
  tag: string;
  count: number;
}

interface Props {
  /** Visible posts (videos excluded), newest first, server-fetched. */
  posts: BlogPost[];
  categories: ExplorerCategory[];
  tags: ExplorerTag[];
}

function wordCountOf(post: BlogPost): number {
  return (
    post.blocks
      ?.filter((b) => b.type === "text" || b.type === "markdown")
      .reduce((n, b) => n + b.content.split(/\s+/).filter(Boolean).length, 0) || 0
  );
}

function sortPosts(posts: BlogPost[], sort: SortKey): BlogPost[] {
  const copy = [...posts];
  if (sort === "oldest") {
    copy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else if (sort === "longest") {
    copy.sort(
      (a, b) =>
        wordCountOf(b) - wordCountOf(a) || new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  // "newest" keeps the server order (date desc, updatedAt tie-break).
  return copy;
}

function matchesQuery(post: BlogPost, q: string): boolean {
  const needle = q.toLowerCase();
  return (
    post.title.toLowerCase().includes(needle) ||
    (post.excerpt || "").toLowerCase().includes(needle) ||
    post.category.toLowerCase().includes(needle)
  );
}

/** Client copy of getPostTags() from blogData (pure function, no server deps). */
function getPostTagsClient(post: BlogPost, limit = 3): string[] {
  const text = `${post.title} ${post.excerpt}`.toLowerCase();
  const words = text.match(/[a-z][a-z0-9-]{2,}/g) || [];
  const STOP = new Set([
    "the", "and", "for", "with", "how", "why", "what", "when", "that", "this", "you",
    "your", "are", "not", "can", "into", "from", "instead", "than", "them", "they",
    "its", "it's", "his", "her", "who", "who's", "new", "part", "parts", "complete",
    "guide", "simple", "explained", "explainer", "everything", "nobody", "demos",
    "using", "use", "get", "out", "about", "more", "most", "best", "top", "vs",
    "will", "just", "like", "real", "our", "their", "has", "have", "was", "were",
  ]);
  const freq = new Map<string, number>();
  for (const w of words) {
    if (STOP.has(w)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, limit)
    .map(([w]) => w);
}

function normalizeSort(v: string | null): SortKey {
  return v === "oldest" || v === "longest" ? v : "newest";
}

export default function BlogExplorer({ posts, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const query = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";
  const sort = normalizeSort(searchParams.get("sort"));

  const [view, setView] = useState<ViewMode>("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [queryDraft, setQueryDraft] = useState(query);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const resultsStartRef = useRef<HTMLDivElement>(null);

  // Keep the search box in sync when q changes from elsewhere (sidebar, chips).
  useEffect(() => {
    setQueryDraft(query);
  }, [query]);

  // New filter combination → collapse back to the first page.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchParams]);

  // "/" focuses search (ignored while typing in an input).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (e.key === "/" && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /** Single param writer used by every control in this island. */
  const setParam = useCallback(
    (key: "category" | "q" | "sort" | "tag", value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      const qs = params.toString();
      setVisibleCount(PAGE_SIZE);
      router.replace(qs ? `/blogs?${qs}` : "/blogs", { scroll: false });
    },
    [router, searchParams]
  );

  const filtered = useMemo(() => {
    let list = posts;
    if (category) list = list.filter((p) => p.categorySlug === category);
    if (tag) {
      const needle = tag.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(needle) || getPostTagsClient(p).includes(tag)
      );
    }
    if (query.trim()) list = list.filter((p) => matchesQuery(p, query.trim()));
    return sortPosts(list, sort);
  }, [posts, category, tag, query, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  // Infinite scroll via IntersectionObserver, plus the Load more button fallback.
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, filtered.length]);

  const activeFilters = (category ? 1 : 0) + (query.trim() ? 1 : 0) + (tag ? 1 : 0);

  return (
    <div className="blog-explorer">
      {/* Toolbar: visible on mobile/tablet where the sidebar is hidden */}
      <div className="blog-toolbar lg:hidden" role="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setParam("q", queryDraft.trim() || null);
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            className="blog-search-input"
            placeholder="Search articles…"
            aria-label="Search articles"
            value={queryDraft}
            onChange={(e) => setQueryDraft(e.target.value)}
          />
        </form>
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter by category">
          <button
            type="button"
            className={`blog-pill ${category === "" ? "is-active" : ""}`}
            onClick={() => setParam("category", null)}
          >
            All <span className="blog-pill-count">{posts.length}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={`blog-pill ${category === cat.slug ? "is-active" : ""}`}
              onClick={() => setParam("category", category === cat.slug ? null : cat.slug)}
            >
              {cat.name} <span className="blog-pill-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results header */}
      <div className="blog-results-header">
        <p className="text-sm text-text-secondary" aria-live="polite">
          Showing {visible.length} of {filtered.length} article{filtered.length === 1 ? "" : "s"}
          {category ? ` in ${categories.find((c) => c.slug === category)?.name ?? category}` : ""}
          {tag ? ` tagged “${tag}”` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-wider text-text-muted" htmlFor="explorer-sort">
            Sort
          </label>
          <select
            id="explorer-sort"
            className="blog-select"
            value={sort}
            onChange={(e) => setParam("sort", e.target.value === "newest" ? null : e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="longest">Longest read</option>
          </select>
          <div className="blog-view-toggle" role="group" aria-label="Layout">
            <button
              type="button"
              className={view === "grid" ? "is-active" : ""}
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              title="Grid view"
            >
              ▦
            </button>
            <button
              type="button"
              className={view === "list" ? "is-active" : ""}
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              title="List view"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilters > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {category && (
            <button
              type="button"
              className="blog-chip"
              onClick={() => setParam("category", null)}
              aria-label={`Clear category filter ${category}`}
            >
              {categories.find((c) => c.slug === category)?.name ?? category} ✕
            </button>
          )}
          {tag && (
            <button type="button" className="blog-chip" onClick={() => setParam("tag", null)}>
              #{tag} ✕
            </button>
          )}
          {query.trim() && (
            <button type="button" className="blog-chip" onClick={() => setParam("q", null)}>
              “{query.trim()}” ✕
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center" data-testid="empty-state">
          <h2 className="text-lg font-semibold text-text-primary mb-2">Nothing matches that yet</h2>
          <p className="text-text-secondary mb-6">
            No articles match your filters. Clear them or browse everything.
          </p>
          <button
            type="button"
            className="button-primary px-5 py-2.5"
            onClick={() => router.replace("/blogs", { scroll: false })}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                : "blog-list"
            }
          >
            {visible.map((post) => (
              <PostCard key={post.id} post={post} variant={view === "list" ? "compact" : "default"} />
            ))}
          </div>

          <div ref={sentinelRef} aria-hidden="true" />

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                type="button"
                className="button-secondary px-8 py-3"
                onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length))}
              >
                Load more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* SEO/crawlable fallback links when filters hide posts */}
      <noscript>
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/blogs/category/${cat.slug}`} className="blog-pill">
              {cat.name} ({cat.count})
            </Link>
          ))}
        </div>
      </noscript>
    </div>
  );
}
