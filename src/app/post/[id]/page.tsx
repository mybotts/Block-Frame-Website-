"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import BlockRenderer from "@/components/BlockRenderer";
import { BlogPost } from "@/lib/types";
import ErrorBoundary from "@/components/ErrorBoundary";

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

  return (
    <>
      <CustomCursor />
      <Navigation />
      <PremiumBackground />

      <SmoothScroller>
        <main className="relative z-10 w-full min-h-screen flex flex-col items-center pt-40 pb-24 px-6 md:px-12 pointer-events-none">
          <div className="hero-radial-glow opacity-40 z-[-1]" />

          <div className="w-full max-w-4xl mx-auto pointer-events-auto">
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
      </SmoothScroller>
    </>
  );
}
