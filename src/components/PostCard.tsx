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
      className="glass-card group flex flex-col justify-between overflow-hidden p-4 sm:p-6 fade-in-up cursor-pointer transition hover:border-primary-light hover:shadow-[0_0_25px_rgba(0,179,191,0.12)] duration-300"
    >
      {/* Mobile Feed Row (< sm): Compact horizontal layout for quick scanning */}
      <div className="flex sm:hidden items-start gap-3.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="category-pill text-[10px] py-0.5 px-2 bg-accent/15 text-accent-light font-medium tracking-wide">
              {post.category}
            </span>
            <FreshnessBadge post={post} />
          </div>
          <h3 className="text-base font-semibold text-text-primary leading-snug mb-2 group-hover:text-primary-light transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center text-xs text-text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true" className="mx-1.5">•</span>
            <span>{minutes}m read</span>
          </div>
        </div>
        {thumbnail && (
          <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg border border-card-border bg-[#101214]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </div>

      {/* Desktop / Tablet Card (>= sm): Full visual presentation */}
      <div className="hidden sm:block">
        {thumbnail ? (
          <div className="relative mb-4 overflow-hidden rounded-lg border border-card-border aspect-[16/9] bg-[#101214]">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote Notion/YouTube URLs are unoptimized by design here */}
            <img
              src={thumbnail}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>
        ) : (
          <FallbackPanel categorySlug={post.categorySlug} />
        )}

        <div className="mb-3 flex items-center gap-2">
          <span className="category-pill bg-accent/15 text-accent-light">{post.category}</span>
          <FreshnessBadge post={post} />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-2.5 group-hover:text-primary-light transition-colors duration-300 line-clamp-2 leading-snug">
          {post.title}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">{getPreview(post)}</p>
      </div>

      <div className="hidden sm:flex items-center justify-between pt-3 border-t border-card-border/60 text-xs text-text-muted">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <div className="flex items-center gap-1.5 font-medium group-hover:text-primary-light transition-colors">
          <span>{minutes} min read</span>
          <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
