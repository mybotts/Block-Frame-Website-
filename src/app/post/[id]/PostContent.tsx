"use client";

import { useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import BlockRenderer from "@/components/BlockRenderer";
import ThumbnailPlayer from "@/components/ThumbnailPlayer";
import { BlogPost } from "@/lib/types";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import ReadingProgress from "@/components/ReadingProgress";

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?&\s]+)/,
    /youtu\.be\/([^?&\s]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function PostContent({ initialPost }: { initialPost: BlogPost }) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          const header = document.querySelector("nav");
          const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;
          const elTop =
            el.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          window.scrollTo({ top: elTop, behavior: "smooth" });
          history.pushState(null, "", href);
        }
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const heroVideo = useMemo(() => {
    if (!initialPost?.blocks) return null;
    for (const block of initialPost.blocks) {
      if (block.type === "video") {
        const videoId = extractYouTubeId(block.content);
        if (videoId) {
          return {
            src: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            videoId,
          };
        }
      }
    }
    return null;
  }, [initialPost]);

  return (
    <>
      <Navigation />
      <PremiumBackground />

      <ReadingProgress />
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center pt-40 pb-24 px-6 md:px-12 pointer-events-none">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-7xl mx-auto pointer-events-auto px-4 md:px-0">
          <ErrorBoundary>
            <article>
              {heroVideo && (
                <div className="mb-10 rounded overflow-hidden">
                  <ThumbnailPlayer
                    src={heroVideo.src}
                    embedSrc={`https://www.youtube-nocookie.com/embed/${heroVideo.videoId}`}
                  />
                </div>
              )}

              <header className="mb-12">
                <span className="category-pill bg-accent/15 text-accent-light mb-4">
                  {initialPost.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-6">
                  {initialPost.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>
                    {new Date(initialPost.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{initialPost.author}</span>
                </div>
              </header>

              <div className="prose max-w-none">
                {initialPost.blocks
                  .sort((a, b) => a.order - b.order)
                  .map((block) => (
                    <BlockRenderer
                      key={block.id || block.order}
                      block={block}
                    />
                  ))}
              </div>
            </article>
          </ErrorBoundary>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
