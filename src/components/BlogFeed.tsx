"use client";

import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/types";

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts?category=ai-news");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch AI News posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="ai-news">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="shimmer h-5 w-20 rounded-full mb-4" />
                <div className="shimmer h-6 w-full rounded mb-3" />
                <div className="shimmer h-4 w-full rounded mb-2" />
                <div className="shimmer h-4 w-3/4 rounded mb-4" />
                <div className="shimmer h-4 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="ai-news">
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">🔬</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No articles yet</h3>
          <p className="text-text-secondary">New AI news articles are being reviewed and will appear here once approved.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="ai-news">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className={`glass-card group overflow-hidden p-6 fade-in-up fade-in-up-delay-${index + 1}`}
          >
            {/* Category Pill */}
            <span className="category-pill bg-accent/15 text-accent-light mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
