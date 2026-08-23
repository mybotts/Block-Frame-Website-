// ============================================
// Server-rendered blog post card.
// Used by the blog index, explorer island,
// and category pages.
//
// Variants:
//  - "default": standard grid card
//  - "compact": one-line-ish list row for the
//    list view toggle and dense contexts
// ============================================
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { postPath } from "@/lib/slug";
import { getPostThumbnail, getPreview, readingTimeMinutes } from "@/lib/postView";

const FALLBACK_LABELS: Record<string, string> = {
  "ai-news": "AI NEWS",
  guides: "GUIDES",
  educational: "EDUCATIONAL",
};

function FallbackPanel({ categorySlug }: { categorySlug: string }) {
  const label = FALLBACK_LABELS[categorySlug] || (categorySlug || "BLOG").toUpperCase();
  return (
    <div
      aria-hidden="true"
      className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-[#101214]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.14) 0%, transparent 70%)" }}
      />
      <span className="font-mono text-xs tracking-[0.3em] text-[#849495]">{label}</span>
    </div>
  );
}

/** Freshness badges computed server-side so the client gets plain strings. */
export function freshness(post: BlogPost): "new" | "updated" | null {
  const now = Date.now();
  const published = new Date(post.date).getTime();
  if (now - published <= 48 * 60 * 60 * 1000) return "new";
  const updated = post.updatedAt ? new Date(post.updatedAt).getTime() : 0;
  // Only badge as Updated when the edit happened at least an hour after publish.
  if (updated && updated - published > 60 * 60 * 1000) return "updated";
  return null;
}

function FreshnessBadge({ post }: { post: BlogPost }) {
  const state = freshness(post);
  if (!state) return null;
  return (
    <span className="freshness-badge" data-state={state}>
      {state === "new" ? "New" : "Updated"}
    </span>
  );
}

export default function PostCard({ post, variant = "default" }: { post: BlogPost; variant?: "default" | "compact" }) {
  const thumbnail = getPostThumbnail(post);
  const minutes = readingTimeMinutes(post);
  const href = postPath(post.title, post.id);

  if (variant === "compact") {
    return (
      <Link href={href} className="blog-row group" aria-label={post.title}>
        <div className="blog-row-main">
          <div className="flex flex-wrap items-center gap-2">
            <span className="category-pill bg-accent/15 text-accent-light">{post.category}</span>
            <FreshnessBadge post={post} />
          </div>
          <h3 className="text-base font-semibold text-text-primary mb-1.5 group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 hidden sm:block">
            {getPreview(post)}
          </p>
        </div>
        <div className="blog-row-meta">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </time>
          <span aria-hidden="true">•</span>
          <span>{minutes} min read</span>
        </div>
        {thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element -- remote Notion/YouTube URLs are unoptimized by design here
          <img src={thumbnail} alt="" loading="lazy" className="blog-row-thumb" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="glass-card group block overflow-hidden p-6 fade-in-up cursor-pointer transition hover:border-primary-light"
    >
      {thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote Notion/YouTube URLs are unoptimized by design here
        <img
          src={thumbnail}
          alt=""
          loading="lazy"
          className="mb-4 h-48 w-full rounded-lg object-cover transition duration-500 group-hover:opacity-90"
        />
      ) : (
        <FallbackPanel categorySlug={post.categorySlug} />
      )}

      <div className="mb-3 flex items-center gap-2">
        <span className="category-pill bg-accent/15 text-accent-light">{post.category}</span>
        <FreshnessBadge post={post} />
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
        {post.title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">{getPreview(post)}</p>

      <div className="flex items-center justify-end text-xs text-text-muted">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span aria-hidden="true" className="mx-2">•</span>
        <span>{minutes} min read</span>
      </div>
    </Link>
  );
}
