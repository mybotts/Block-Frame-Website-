// ============================================
// Server-rendered blog post card.
// Used by the blog index and category pages.
// ============================================
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { postPath, CONTENT_TEAM_NAME } from "@/lib/slug";
import { getPostThumbnail, getPreview, readingTimeMinutes } from "@/lib/postView";

export default function PostCard({ post }: { post: BlogPost }) {
  const thumbnail = getPostThumbnail(post);
  const minutes = readingTimeMinutes(post);

  return (
    <Link
      href={postPath(post.title, post.id)}
      className="glass-card group block overflow-hidden p-6 fade-in-up cursor-pointer transition hover:border-primary-light"
    >
      {thumbnail && (
        <div
          className="w-full h-48 bg-cover bg-center mb-4 rounded-lg"
          style={{ backgroundImage: `url(${thumbnail})` }}
          role="img"
          aria-label={post.title}
        />
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
