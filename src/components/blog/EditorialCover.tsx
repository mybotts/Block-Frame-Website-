import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { postPath } from "@/lib/slug";
import { getPostThumbnail, getPreview, readingTimeMinutes } from "@/lib/postView";
import { freshness } from "@/components/PostCard";

interface Props {
  featured: BlogPost;
  briefings: BlogPost[];
}

export default function EditorialCover({ featured, briefings }: Props) {
  if (!featured) return null;

  const featuredThumb = getPostThumbnail(featured);
  const featuredMinutes = readingTimeMinutes(featured);
  const featuredState = freshness(featured);
  const featuredHref = postPath(featured.title, featured.id);

  return (
    <section aria-label="Editorial Cover" className="mb-12 sm:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (8 cols): Lead Dispatch */}
        <div className="lg:col-span-8 flex flex-col">
          <Link
            href={featuredHref}
            className="group relative flex-1 flex flex-col justify-between rounded-2xl border border-primary/30 bg-card-bg overflow-hidden p-6 sm:p-8 md:p-10 hover:border-primary-light hover:shadow-[0_0_35px_rgba(0,179,191,0.18)] transition-all duration-300"
          >
            {/* Atmospheric branded cover artwork as ambient right bleed */}
            {featuredThumb && (
              <div className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 pointer-events-none opacity-20 sm:opacity-30 group-hover:opacity-45 transition-opacity duration-500 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredThumb}
                  alt=""
                  className="w-full h-full object-cover object-right"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card-bg via-card-bg/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent" />
              </div>
            )}

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary-light border border-primary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
                  LEAD DISPATCH
                </span>
                <span className="category-pill bg-accent/15 text-accent-light">
                  {featured.category}
                </span>
                {featuredState && (
                  <span className="freshness-badge" data-state={featuredState}>
                    {featuredState === "new" ? "New" : "Updated"}
                  </span>
                )}
                <span className="text-xs text-text-muted ml-auto font-mono hidden sm:inline">
                  {featuredMinutes} min read
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15] mb-4 group-hover:text-primary-light transition-colors duration-300">
                {featured.title}
              </h2>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-light mb-6">
                {getPreview(featured)}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-5 border-t border-card-border/80 text-sm">
              <div className="flex items-center gap-2 text-text-muted">
                <time dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span aria-hidden="true">•</span>
                <span>{featuredMinutes} min read</span>
              </div>

              <span className="button-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold group-hover:shadow-[0_0_20px_rgba(0,179,191,0.35)] transition-all">
                Read Full Dispatch
                <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Right (4 cols): Top 3 Briefings Stack */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg/60 p-5 sm:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-card-border">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-light font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-light" />
              Top Briefings
            </span>
            <span className="text-[11px] font-mono text-text-muted uppercase">This Week</span>
          </div>

          <div className="flex-1 flex flex-col justify-around divide-y divide-card-border/60">
            {briefings.slice(0, 3).map((post, idx) => {
              const minutes = readingTimeMinutes(post);
              const href = postPath(post.title, post.id);

              return (
                <Link
                  key={post.id}
                  href={href}
                  className="group py-3.5 first:pt-2 last:pb-1 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold tracking-wider text-primary-light">
                      #{String(idx + 1).padStart(2, "0")} TRENDING
                    </span>
                    <span className="category-pill text-[10px] py-0.5 px-2 bg-accent/15 text-accent-light">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-text-primary group-hover:text-primary-light transition-colors line-clamp-2 leading-snug mb-1">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-text-muted mt-2">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="group-hover:text-primary-light font-medium transition-colors">
                      {minutes}m read →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
