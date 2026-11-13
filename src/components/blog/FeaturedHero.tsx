// ============================================
// FeaturedHero — full-width split card for the
// newest post at the top of /blogs.
// Server component: no client JS.
// ============================================
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { postPath } from "@/lib/slug";
import { getPostThumbnail, getPreview, readingTimeMinutes } from "@/lib/postView";
import { freshness } from "@/components/PostCard";

export default function FeaturedHero({ post }: { post: BlogPost }) {
  const thumbnail = getPostThumbnail(post);
  const minutes = readingTimeMinutes(post);
  const state = freshness(post);

  return (
    <section aria-label="Latest article" className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <span className="blog-hero-kicker flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary-light animate-pulse" />
          Lead Story
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <Link
        href={postPath(post.title, post.id)}
        className="blog-hero group rounded-xl border border-card-border overflow-hidden hover:border-primary-light hover:shadow-[0_0_30px_rgba(0,179,191,0.15)] transition duration-300"
        aria-label={post.title}
      >
        <div className="blog-hero-media min-h-[200px] sm:min-h-[260px] md:min-h-[320px]">
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote Notion/YouTube URLs are unoptimized by design here
            <img
              src={thumbnail}
              alt=""
              loading="eager"
              fetchPriority="high"
              className="blog-hero-img"
            />
          ) : (
            <div className="blog-hero-img blog-hero-fallback" aria-hidden="true">
              <span className="font-mono text-xs tracking-[0.3em] text-[#849495]">
                {(post.category || "BLOG").toUpperCase()}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
        </div>

        <div className="blog-hero-body p-5 sm:p-7 md:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
            <span className="category-pill bg-accent/15 text-accent-light">{post.category}</span>
            {state && (
              <span className="freshness-badge" data-state={state}>
                {state === "new" ? "New" : "Updated"}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-3 sm:mb-4 group-hover:text-primary-light transition-colors duration-300 line-clamp-3">
            {post.title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 italic font-light">
            {getPreview(post)}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-card-border/60">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden="true">•</span>
              <span>{minutes} min read</span>
            </div>
            <span className="button-secondary inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm group-hover:border-primary-light group-hover:text-primary-light transition-all">
              Read article
              <span aria-hidden="true" className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
