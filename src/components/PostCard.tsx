// ============================================
// Server-rendered blog post card.
// Editorial-first layout: clean typography, scannable
// meta, high readability, and responsive mobile feed.
// ============================================
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { postPath } from "@/lib/slug";
import { getPostThumbnail, getPreview, readingTimeMinutes } from "@/lib/postView";

/** Freshness badges computed server-side so the client gets plain strings. */
export function freshness(post: BlogPost): "new" | "updated" | null {
  const now = Date.now();
  const published = new Date(post.date).getTime();
  if (now - published <= 48 * 60 * 60 * 1000) return "new";
  const updated = post.updatedAt ? new Date(post.updatedAt).getTime() : 0;
  if (updated && updated - published > 60 * 60 * 1000) return "updated";
  return null;
}

function FreshnessBadge({ post }: { post: BlogPost }) {
  const state = freshness(post);
  if (!state) return null;
  return (
    <span className="freshness-badge text-[10px] py-0.5 px-2" data-state={state}>
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
            <span className="category-pill bg-accent/15 text-accent-light text-[10px] py-0.5 px-2 font-medium">
              {post.category}
            </span>
            <FreshnessBadge post={post} />
          </div>
          <h3 className="text-base font-bold text-text-primary mb-1 group-hover:text-primary-light transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 hidden sm:block font-light">
            {getPreview(post)}
          </p>
        </div>
        <div className="blog-row-meta text-xs text-text-muted">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </time>
          <span aria-hidden="true">•</span>
          <span>{minutes}m read</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="glass-card group flex flex-col justify-between rounded-xl border border-card-border p-5 sm:p-6 hover:border-primary-light hover:shadow-[0_0_25px_rgba(0,179,191,0.12)] transition duration-300"
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
          <h3 className="text-base font-bold text-text-primary leading-snug mb-2 group-hover:text-primary-light transition-colors line-clamp-2">
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
          <div className="w-16 h-16 shrink-0 overflow-hidden rounded-lg border border-card-border bg-[#101214]">
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

      {/* Desktop / Tablet Card (>= sm): High-density editorial layout */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="category-pill text-xs py-0.5 px-2.5 bg-accent/15 text-accent-light font-medium">
              {post.category}
            </span>
            <FreshnessBadge post={post} />
          </div>
          <span className="text-xs font-mono text-text-muted">
            {minutes} min read
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2.5 group-hover:text-primary-light transition-colors duration-300 line-clamp-2 leading-snug">
          {post.title}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed font-light mb-4 line-clamp-2">
          {getPreview(post)}
        </p>
      </div>

      <div className="hidden sm:flex items-center justify-between pt-3.5 border-t border-card-border/60 text-xs text-text-muted">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <div className="flex items-center gap-1.5 font-medium group-hover:text-primary-light transition-colors">
          <span>Read story</span>
          <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
