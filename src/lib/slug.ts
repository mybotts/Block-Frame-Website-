// ============================================
// Shared slug + identity utilities for the blog
// Single source of truth: every surface (pages,
// feeds, sitemap, llms.txt) computes post URLs
// through these helpers.
// ============================================

export const CONTENT_TEAM_NAME = "Blockframe Labs Content Team";
export const BASE_URL = "https://www.blockframe.cloud";

/** Kebab-case slug from a post title. Falls back to a short stable id fragment when the title has no usable characters. */
export function slugifyTitle(title: string): string {
  const base = slugifyHeading(title).slice(0, 80).replace(/-+$/g, "");
  return base || "post";
}

/** Kebab-case anchor id for markdown headings. Must stay in sync with heading rendering. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Canonical slug for a post, derived deterministically from its title. */
export function postSlug(title: string, _id?: string): string {
  return slugifyTitle(title);
}

/** Canonical URL path for a post: /blog/<slug> */
export function postPath(title: string, _id?: string): string {
  return `/blog/${postSlug(title, _id)}`;
}

/** Absolute canonical URL for a post. */
export function postUrl(title: string, _id?: string): string {
  return `${BASE_URL}${postPath(title, _id)}`;
}

/** True when a route param looks like a Notion UUID (legacy /post/<id> links). */
export function looksLikeUuid(param: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param);
}

/** Display names for category slugs, shared by filters, category pages, and breadcrumbs. */
export const CATEGORY_NAMES: Record<string, string> = {
  "ai-news": "AI News",
  "guides": "Guides",
  "educational": "Educational",
  "tech": "Tech",
  "explanatory": "Explanations",
  "tips": "Tips & Tricks",
  "updates": "Updates",
  "news": "News",
};

export function categoryName(slug: string): string {
  return (
    CATEGORY_NAMES[slug] ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}
