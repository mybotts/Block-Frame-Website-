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
    <section aria-label="Latest article" className="mb-14">
      <div className="flex items-center gap-3 mb-4">
        <span className="blog-hero-kicker">Latest</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <Link href={postPath(post.title, post.id)} className="blog-hero group" aria-label={post.title}>
        <div className="blog-hero-media">
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
        </div>

        <div className="blog-hero-body">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="category-pill bg-accent/15 text-accent-light">{post.category}</span>
            {state && (
              <span className="freshness-badge" data-state={state}>
                {state === "new" ? "New" : "Updated"}
              </span>
            )}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight mb-4 group-hover:text-primary-light transition-colors duration-300 line-clamp-3">
            {post.title}
          </h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6 line-clamp-3 italic">
            {getPreview(post)}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-text-muted">
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
            <span className="button-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm group-hover:border-primary-light group-hover:text-primary-light transition-all">
              Read article
              <span aria-hidden="true" className="inline-block">→</span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
