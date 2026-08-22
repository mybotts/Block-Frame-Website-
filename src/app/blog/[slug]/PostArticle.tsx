"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import BlockRenderer from "@/components/BlockRenderer";
import ThumbnailPlayer from "@/components/ThumbnailPlayer";
import { BlogPost } from "@/lib/types";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButton from "@/components/ShareButton";
import { CONTENT_TEAM_NAME } from "@/lib/slug";
import { readingTimeMinutes } from "@/lib/postView";

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
}

interface TocEntry {
  level: 2 | 3;
  text: string;
  id: string;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?\s]+)/,
    /youtu\.be\/([^?\s]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function PostArticle({
  post,
  canonicalPath,
  ogImage,
  toc,
  relatedPosts = [],
  newer,
  older,
}: {
  post: BlogPost;
  canonicalPath: string;
  ogImage?: string;
  toc?: TocEntry[];
  relatedPosts?: RelatedPost[];
  newer?: { title: string; href: string } | null;
  older?: { title: string; href: string } | null;
}) {
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
          const headerHeight = header ? header.getBoundingClientRect().height : 0;
          const elTop = el.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          window.scrollTo({ top: elTop, behavior: "smooth" });
          history.pushState(null, "", href);
        }
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const heroVideoBlock = post.blocks?.find((b) => b.type === "video");
  const heroVideoId = heroVideoBlock ? extractYouTubeId(heroVideoBlock.content) : null;

  const heroImage =
    post.blocks?.find((b) => b.type === "image")?.content ||
    (heroVideoId ? `https://img.youtube.com/vi/${heroVideoId}/hqdefault.jpg` : undefined);

  const minutes = readingTimeMinutes(post);

  return (
    <>
      <Navigation />
      <PremiumBackground />

      <ReadingProgress />
      <main id="main-content" className="relative z-10 w-full min-h-screen flex flex-col items-center pt-40 pb-24 px-6 md:px-12 pointer-events-none">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-7xl mx-auto pointer-events-auto px-4 md:px-0">
          <ErrorBoundary>
            <article>
              {heroVideoId && (
                <div className="mb-10 rounded overflow-hidden">
                  <ThumbnailPlayer
                    src={`https://img.youtube.com/vi/${heroVideoId}/hqdefault.jpg`}
                    embedSrc={`https://www.youtube-nocookie.com/embed/${heroVideoId}`}
                  />
                </div>
              )}

              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
                  <li>
                    <Link href="/" className="hover:text-primary-light transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/blogs" className="hover:text-primary-light transition-colors">
                      Blogs
                    </Link>
                  </li>
                  {post.category && (
                    <>
                      <li aria-hidden="true">/</li>
                      <li>
                        <Link
                          href={`/blogs/category/${post.categorySlug || ""}`}
                          className="hover:text-primary-light transition-colors"
                        >
                          {post.category}
                        </Link>
                      </li>
                    </>
                  )}
                  <li aria-hidden="true">/</li>
                  <li className="text-text-secondary truncate max-w-[200px]" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>

              <header className="mb-10">
                <span className="category-pill bg-accent/15 text-accent-light mb-4">{post.category}</span>
                <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
                  <span>{CONTENT_TEAM_NAME}</span>
                  <span aria-hidden="true">•</span>
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
              </header>

              <div className="mb-8 flex items-center justify-between gap-4">
                <ShareButton
                  url={canonicalPath}
                  title={post.title}
                  description={post.excerpt}
                  image={heroImage}
                  variant="default"
                />
              </div>

              {/* Body + optional table of contents */}
              <div className={toc && toc.length >= 3 ? "xl:flex xl:gap-12" : ""}>
                {toc && toc.length >= 3 && (
                  <aside className="hidden xl:block xl:w-64 shrink-0" aria-label="Table of contents">
                    <nav className="sticky top-40 max-h-[70vh] overflow-y-auto border border-card-border bg-card-bg rounded p-5">
                      <p className="text-xs uppercase tracking-wider text-text-muted mb-4">On this page</p>
                      <ul className="space-y-2 text-sm">
                        {toc.map((entry, i) => (
                          <li key={`${entry.id}-${i}`} className={entry.level === 3 ? "pl-4" : ""}>
                            <a
                              href={`#${entry.id}`}
                              className="text-text-secondary hover:text-primary-light transition-colors line-clamp-2"
                            >
                              {entry.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </aside>
                )}

                <div className="prose max-w-none min-w-0 flex-1">
                  {post.blocks
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((block) => (
                      <BlockRenderer key={block.id || block.order} block={block} />
                    ))}
                </div>
              </div>

              {/* Author / team bio */}
              <section className="mt-14 border border-card-border bg-card-bg rounded p-6 md:p-8" aria-label="About the author">
                <div className="flex items-start gap-5">
                  <div
                    aria-hidden="true"
                    className="h-14 w-14 shrink-0 rounded bg-accent/15 text-accent-light flex items-center justify-center font-bold text-lg"
                  >
                    CT
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-2">{CONTENT_TEAM_NAME}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      The content team at BlockFrame Labs writes about AI systems and services we actually ship:
                      automation pipelines, agent infrastructure, and the web engineering behind them. Every guide
                      comes from a system running in production.
                    </p>
                    <div className="mt-4 flex gap-4 text-sm">
                      <Link href="/blogs" className="text-accent hover:text-primary-light underline">
                        More articles
                      </Link>
                      <a href="/rss.xml" className="text-accent hover:text-primary-light underline">
                        RSS feed
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Work with us */}
              <section className="mt-8 glass-card p-6 md:p-8" aria-label="Work with BlockFrame Labs">
                <p className="text-sm uppercase tracking-wider text-text-muted mb-2">Work with us</p>
                <p className="text-lg text-text-primary mb-4">
                  This blog runs itself. Our Blog OS publishes daily from Notion with zero manual edits, and we build
                  the same system for clients.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/marketplace/products/blog-os-automated-notion-cms"
                    className="rounded px-5 py-2.5 bg-accent/15 text-accent-light hover:bg-accent/25 transition"
                  >
                    See Blog OS
                  </Link>
                  <Link
                    href="/#contact"
                    className="rounded px-5 py-2.5 bg-transparent border border-card-border text-text-secondary hover:bg-primary/10 hover:text-primary-light transition"
                  >
                    Book a call
                  </Link>
                </div>
              </section>
            </article>

            {/* Prev / Next */}
            {(newer || older) && (
              <nav aria-label="More posts" className="mt-12 grid gap-4 sm:grid-cols-2">
                {older ? (
                  <Link
                    href={older.href}
                    className="glass-card p-5 group transition hover:border-primary-light"
                  >
                    <p className="text-xs uppercase tracking-wider text-text-muted mb-2">← Older</p>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                      {older.title}
                    </p>
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
                {newer && (
                  <Link
                    href={newer.href}
                    className="glass-card p-5 group transition hover:border-primary-light sm:text-right"
                  >
                    <p className="text-xs uppercase tracking-wider text-text-muted mb-2">Newer →</p>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                      {newer.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 border-t border-border pt-12" aria-label="Related articles">
                <h2 className="text-2xl font-semibold text-text-primary mb-8">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relPost) => (
                    <Link
                      key={relPost.id}
                      href={`/blog/${relPost.slug}`}
                      className="group block bg-surface-light p-6 transition hover:border hover:border-card-border"
                    >
                      <span className="category-pill bg-accent/15 text-accent-light text-xs">{relPost.category}</span>
                      <h3 className="mt-3 text-base font-semibold text-text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                        {relPost.title}
                      </h3>
                      {relPost.excerpt && (
                        <p className="mt-2 text-sm text-text-secondary line-clamp-2">{relPost.excerpt}</p>
                      )}
                      <time className="mt-3 block text-xs text-text-muted" dateTime={relPost.date}>
                        {new Date(relPost.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </ErrorBoundary>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
