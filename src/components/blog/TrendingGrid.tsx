import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { postPath } from "@/lib/slug";
import { getPreview, readingTimeMinutes } from "@/lib/postView";

interface Props {
  posts: BlogPost[];
}

export default function TrendingGrid({ posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <section aria-label="Trending articles" className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <span className="blog-hero-kicker flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-light" />
          Trending Dispatches
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {posts.map((post, idx) => {
          const minutes = readingTimeMinutes(post);
          const href = postPath(post.title, post.id);

          return (
            <Link
              key={post.id}
              href={href}
              className="glass-card group p-5 sm:p-6 rounded-xl border border-card-border hover:border-primary-light hover:shadow-[0_0_25px_rgba(0,179,191,0.12)] transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold tracking-wider text-primary-light">
                    #{String(idx + 1).padStart(2, "0")} TRENDING
                  </span>
                  <span className="category-pill text-[10px] py-0.5 px-2 bg-accent/15 text-accent-light">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary-light transition-colors line-clamp-2 mb-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-4 italic font-light">
                  {getPreview(post)}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-card-border/60 text-xs text-text-muted">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <div className="flex items-center gap-1.5 font-medium group-hover:text-primary-light transition-colors">
                  <span>{minutes} min read</span>
                  <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
