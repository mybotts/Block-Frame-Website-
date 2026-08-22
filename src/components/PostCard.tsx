// ============================================
// Server-rendered blog post card.
// Used by the blog index and category pages.
// ============================================
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { postPath, CONTENT_TEAM_NAME } from "@/lib/slug";
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

export default function PostCard({ post }: { post: BlogPost }) {
  const thumbnail = getPostThumbnail(post);
  const minutes = readingTimeMinutes(post);

  return (
    <Link
      href={postPath(post.title, post.id)}
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

      <span className="category-pill bg-accent/15 text-accent-light mb-4">{post.category}</span>

      <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
        {post.title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">{getPreview(post)}</p>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{CONTENT_TEAM_NAME}</span>
        <div className="flex items-center gap-2">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span aria-hidden="true">•</span>
          <span>{minutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
