// ============================================
// Server-side blog data layer with in-process caching
// All blog pages and feeds read through here so
// Notion is hit at most once per TTL per surface.
// ============================================
import { queryPosts, fetchBlogPostWithBlocks, notionPageToBlogPost } from "./notionClient";
import { BlogPost } from "./types";
import { postPath, categoryName } from "./slug";

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
    let posts = rawPages.map(notionPageToBlogPost).filter((p) => p.status === "approved");
    // Newest first everywhere.
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
