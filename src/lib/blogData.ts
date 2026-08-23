// ============================================
// Server-side blog data layer with in-process caching
// All blog pages and feeds read through here so
// Notion is hit at most once per TTL per surface.
// ============================================
import { queryPosts, fetchBlogPostWithBlocks, notionPageToBlogPost } from "./notionClient";
import { BlogPost } from "./types";
import { postPath, categoryName } from "./slug";
import { wordCount } from "./postView";

const APPROVED_FILTER = {
  property: "Status",
  select: { equals: "approved" },
};

// 5-minute cache. Long enough to absorb a burst of traffic
// (and AI crawler storms), short enough that new Notion posts appear fast.
const TTL_MS = 5 * 60 * 1000;

type CacheShape = {
  list: BlogPost[] | null;
  listAt: number;
  full: Map<string, { at: number; post: BlogPost }>;
};

// Survives across requests in the server runtime (per lambda/instance).
const g = globalThis as unknown as { __bflBlogCache?: CacheShape };
const cache: CacheShape = (g.__bflBlogCache ||= {
  list: null,
  listAt: 0,
  full: new Map(),
});

/** Approved posts, newest first. Cached. Excludes the Videos category (has its own tab). */
export async function getApprovedPosts(): Promise<BlogPost[]> {
  const now = Date.now();
  if (cache.list && now - cache.listAt < TTL_MS) return cache.list;
  try {
    const rawPages = await queryPosts(APPROVED_FILTER);
    const posts = rawPages.map(notionPageToBlogPost).filter((p) => p.status === "approved");
    // Newest first everywhere. Tie-break same-day posts by Notion last-edit time
    // (minute precision) so "latest post at the top" matches reality.
    posts.sort((a, b) => {
      const d = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (d !== 0) return d;
      const au = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bu = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bu - au;
    });
    cache.list = posts;
    cache.listAt = now;
    return posts;
  } catch (err) {
    console.error("[blogData] Failed to query posts:", err);
    return cache.list || [];
  }
}

/**
 * Full post (with child blocks: images, videos, code) by slug or legacy UUID id.
 * Cached independently of the list because it is much heavier to build.
 */
export async function getPostBySlug(slugOrId: string): Promise<BlogPost | null> {
  const now = Date.now();
  const cached = cache.full.get(slugOrId);
  if (cached && now - cached.at < TTL_MS) return cached.post;

  const posts = await getApprovedPosts();

  // 1) slug match
  const match = posts.find((p) => postPath(p.title, p.id) === `/blog/${slugOrId}`);
  // 2) legacy UUID match (also covers non-UUID ids used by static fallback data)
  const byId = match ? null : posts.find((p) => p.id === slugOrId);

  const target = match || byId;

  if (!target) {
    // Cache negative lookups briefly to blunt repeated 404 probing.
    cache.full.set(slugOrId, { at: now - TTL_MS + 60 * 1000, post: null as unknown as BlogPost });
    return null;
  }

  try {
    const full = await fetchBlogPostWithBlocks(target.id);
    cache.full.set(slugOrId, { at: now, post: full });
    return full;
  } catch (err) {
    console.error("[blogData] Failed to fetch full post:", err);
    return target; // degraded but usable
  }
}

/** Distinct categories among approved posts, with counts, most posts first. */
export async function getCategorySummary(): Promise<Array<{ slug: string; name: string; count: number }>> {
  const posts = await getApprovedPosts();
  const counts = new Map<string, number>();
  for (const p of posts) {
    if (p.categorySlug === "videos") continue;
    counts.set(p.categorySlug, (counts.get(p.categorySlug) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, name: categoryName(slug), count }))
    .sort((a, b) => b.count - a.count);
}

// ============================================
// Discovery helpers for the blog index
// (tags, popular, archive). All derive from the
// cached approved list — no extra Notion calls.
// ============================================

/** Keywords auto-extracted from title + excerpt. Frequency-ranked, minus stopwords. Top N per post. */
export function getPostTags(post: BlogPost, limit = 3): string[] {
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

/** Tag cloud across all visible posts with post counts, most used first. */
export async function getTagSummary(limit = 14): Promise<Array<{ tag: string; count: number }>> {
  const posts = (await getApprovedPosts()).filter((p) => p.categorySlug !== "videos");
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of new Set(getPostTags(p))) {
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);
}

/**
 * Popular picks: highest word-count posts from the last 30 days, then most recent.
 * Honest default until real usage analytics exist; deterministic, no fake counters.
 */
export async function getPopularPosts(limit = 5): Promise<BlogPost[]> {
  const posts = (await getApprovedPosts()).filter((p) => p.categorySlug !== "videos");
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return posts
    .filter((p) => new Date(p.date).getTime() >= cutoff)
    .sort((a, b) => wordCount(b) - wordCount(a) || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/** Month buckets (YYYY-MM) for the archive timeline, newest first. */
export async function getArchiveMonths(): Promise<Array<{ key: string; label: string; count: number }>> {
  const posts = (await getApprovedPosts()).filter((p) => p.categorySlug !== "videos");
  const counts = new Map<string, number>();
  for (const p of posts) {
    const key = p.date.slice(0, 7);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, count]) => {
      const [y, m] = key.split("-").map(Number);
      const label = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
      return { key, label, count };
    });
}

/**
 * Series grouping: groups posts whose titles share an identical bracket prefix,
 * e.g. "[SEO for AI Search] Part 2: ...". A post is only in a series when the
 * bracket prefix appears on at least two posts — no guessing from loose wording.
 */
export function getSeriesGroups(posts: BlogPost[]): Map<string, { name: string; posts: BlogPost[] }> {
  const groups = new Map<string, BlogPost[]>();
  for (const p of posts) {
    const m = p.title.match(/^\[([^\]]+)\]/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }
  const result = new Map<string, { name: string; posts: BlogPost[] }>();
  for (const [key, groupPosts] of groups) {
    if (groupPosts.length < 2) continue;
    const m = groupPosts[0].title.match(/^\[([^\]]+)\]/);
    const name = m ? m[1].trim() : key;
    groupPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    result.set(key, { name, posts: groupPosts });
  }
  return result;
}
