"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import CustomCursor from "@/components/CustomCursor";
import BlockRenderer from "@/components/BlockRenderer";
import { BlogPost } from "@/lib/types";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import ReadingProgress from "@/components/ReadingProgress";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        setPost(data.post);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  // Handle hash anchor clicks for smooth scroll
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          // Adjust for fixed header height
          const header = document.querySelector('nav');
          const headerHeight = header ? header.getBoundingClientRect().height : 0;
          const elTop = el.getBoundingClientRect().top + window.scrollY - headerHeight - 20; // 20px offset
          window.scrollTo({ top: elTop, behavior: 'smooth' });
          // Update URL hash without jumping
          history.pushState(null, '', href);
        }
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />
      <PremiumBackground />

      <ReadingProgress />
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center pt-40 pb-24 px-6 md:px-12 pointer-events-none">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-7xl mx-auto pointer-events-auto px-4 md:px-0">
          <ErrorBoundary>
          {loading && (
            <div className="text-center text-text-secondary">Loading post…</div>
          )}

          {error && (
            <div className="text-center text-red-400">{error}</div>
          )}

          {post && (
            <article>
              {/* Header */}
              <header className="mb-12">
                <span className="category-pill bg-accent/15 text-accent-light mb-4">
                  {post.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
              </header>

              {/* Blocks */}
              <div className="prose prose-invert max-w-none">
                {post.blocks
                  .sort((a, b) => a.order - b.order)
                  .map((block) => (
                    <BlockRenderer key={block.id || block.order} block={block} />
                  ))}
              </div>
            </article>
          )}
          </ErrorBoundary>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
