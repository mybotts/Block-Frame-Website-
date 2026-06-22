"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

export default function BlogsFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allRes = await fetch("/api/posts");
        if (allRes.ok) {
          const allData = await allRes.json();
          let allPosts: BlogPost[] = allData.posts;

          allPosts = allPosts.filter(post => post.categorySlug !== "videos");

          const uniqueCategories = [...new Set(allPosts.map((p) => p.categorySlug))];
          if (!uniqueCategories.includes("educational")) {
            uniqueCategories.push("educational");
          }
          if (!uniqueCategories.includes("tech")) {
            uniqueCategories.push("tech");
          }
          setCategories(uniqueCategories);

          let filteredPosts = allPosts;
          if (filter) {
            filteredPosts = allPosts.filter((p) => p.categorySlug === filter);
          }

          setPosts(filteredPosts);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filter]);

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [/youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?&\s]+)/, /youtu\.be\/([^?&\s]+)/];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  };

  const getPostThumbnail = (post: BlogPost): string | undefined => {
    if (!post.blocks || post.blocks.length === 0) return undefined;

    for (const block of post.blocks) {
      if (block.type === "image") {
        return block.content as string;
      }
    }

    for (const block of post.blocks) {
      if (block.type === "video") {
        const videoId = extractYouTubeId(block.content);
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
      }
    }

    return undefined;
  };

  const getPreview = (post: BlogPost) => {
    if (post.excerpt && post.excerpt.trim().length > 0) return post.excerpt;
    if (post.content && post.content.trim().length > 0) {
      return post.content.trim().substring(0, 150) + (post.content.length > 150 ? '...' : '');
    }
    return 'No preview available.';
  };

  if (loading) {
    return (
      <section id="blogs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="shimmer h-5 w-20 rounded mb-4" />
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
      <section id="blogs">
        <div className="glass-card p-12 text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-2">No blog posts yet</h3>
          <p className="text-text-secondary">New blog posts are being reviewed and will appear here once approved.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs">
      {/* Filter Controls */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setFilter(null)}
          className={`rounded px-4 py-2 transition-all duration-300 hover:bg-primary/10 ${
            filter === null ? "bg-primary/20 text-primary-light" : "bg-transparent text-text-secondary"
          }`}
        >
          All Blogs
        </button>
        {categories.map((catSlug) => {
          const categoryNames: Record<string, string> = {
            'ai-news': 'AI News',
            'guides': 'Guides',
            'educational': 'Educational',
            'tech': 'Tech',
            'explanatory': 'Explanations',
            'tips': 'Tips/Tricks',
            'updates': 'Updates',
            'news': 'News'
          };
          const displayName = categoryNames[catSlug] || catSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

          return (
            <button
              key={catSlug}
              onClick={() => setFilter(catSlug)}
              className={`rounded px-4 py-2 transition-all duration-300 hover:bg-primary/10 ${
                filter === catSlug ? "bg-primary/20 text-primary-light" : "bg-transparent text-text-secondary"
              }`}
            >
              {displayName}
            </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          const thumbnail = getPostThumbnail(post);
          return (
            <article
              key={post.id}
              className={`glass-card group overflow-hidden p-6 fade-in-up fade-in-up-delay-${index + 1}`}
            >
              {thumbnail && (
                <div className="w-full h-48 bg-cover bg-center mb-4 rounded-lg"
                     style={{ backgroundImage: `url(${thumbnail})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>
              )}

              <span className="category-pill bg-accent/15 text-accent-light mb-4">
                {post.category}
              </span>

              <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                {getPreview(post)}
              </p>

              <div className="flex items-center justify-between">
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
                <Link
                  href={`/post/${post.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:text-primary-light transition-colors duration-300"
                >
                  Read Article
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
