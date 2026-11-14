// ============================================
// /blogs — The BlockFrame Intelligence Hub.
// Server Component: reads posts directly from Notion,
// builds metadata and canonical tags, pre-populates
// categories and tags, and renders the editorial cover
// + stream + sticky discovery rail.
// ============================================

import { Suspense } from "react";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import EditorialCover from "@/components/blog/EditorialCover";
import BlogExplorer from "@/components/blog/BlogExplorer";
import BlogSidebar from "@/components/blog/BlogSidebar";
import {
  getApprovedPosts,
  getCategorySummary,
  getTagSummary,
  getPopularPosts,
  getArchiveMonths,
} from "@/lib/blogData";
import { postPath } from "@/lib/slug";
import { readingTimeMinutes } from "@/lib/postView";

export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockframe.cloud";

export const metadata: Metadata = {
  title: "BlockFrame Intelligence | AI Agents, Systems & Automation",
  description:
    "Daily technical dispatches on autonomous agents, enterprise automation, and systems architecture. Written by engineers building them daily.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
      "application/feed+json": `${SITE_URL}/feed.json`,
    },
  },
  openGraph: {
    title: "BlockFrame Intelligence | AI Agents, Systems & Automation",
    description:
      "Daily technical dispatches on autonomous agents, enterprise automation, and systems architecture.",
    url: `${SITE_URL}/blogs`,
    type: "website",
    images: [{ url: `${SITE_URL}/images/og-preview.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockFrame Intelligence | AI Agents & Systems",
    description:
      "Daily technical dispatches on autonomous agents, enterprise automation, and systems architecture.",
    images: [`${SITE_URL}/images/og-preview.png`],
  },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const [allPosts, categories, tags, popularRaw, months] = await Promise.all([
    getApprovedPosts(),
    getCategorySummary(),
    getTagSummary(),
    getPopularPosts(5),
    getArchiveMonths(),
  ]);

  // Videos live in their own tab; everything else flows through the index.
  const visible = allPosts.filter((p) => p.categorySlug !== "videos");
  const featured = visible[0];
  const briefings = visible.slice(1, 4);
  const rest = visible.slice(4);
  const totalPosts = visible.length;

  const popular = popularRaw
    .filter((p) => p.categorySlug !== "videos")
    .map((p) => ({
      id: p.id,
      title: p.title,
      href: postPath(p.title, p.id),
      minutes: readingTimeMinutes(p),
    }));

  const hasFilterParams = Boolean(
    (typeof sp.q === "string" && sp.q.trim()) ||
    (typeof sp.category === "string" && sp.category.trim()) ||
    (typeof sp.tag === "string" && sp.tag.trim())
  );

  return (
    <>
      <Navigation />
      <PremiumBackground />

      <main id="main-content" className="relative z-10 w-full min-h-screen pt-28 sm:pt-32 md:pt-36 pb-24 px-4 sm:px-6 md:px-12">
        <div className="hero-radial-glow opacity-30 z-[-1]" />

        <div className="w-full max-w-7xl mx-auto">
          {/* Masthead */}
          <header className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-card-border/60">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-primary-light font-bold flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
                  Live Wire • Daily Technical Dispatches
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
                  BlockFrame Intelligence
                </h1>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                <span className="px-3 py-1.5 rounded-full border border-card-border bg-card-bg/60">
                  {totalPosts} Dispatches
                </span>
                <a
                  href="/rss.xml"
                  className="px-3 py-1.5 rounded-full border border-card-border bg-card-bg/60 hover:border-primary-light hover:text-primary-light transition-colors"
                >
                  RSS
                </a>
                <a
                  href="/llms.txt"
                  className="px-3 py-1.5 rounded-full border border-card-border bg-card-bg/60 hover:border-primary-light hover:text-primary-light transition-colors hidden sm:inline"
                >
                  llms.txt
                </a>
              </div>
            </div>
          </header>

          {visible.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <h2 className="text-lg font-semibold text-text-primary mb-2">No dispatches yet</h2>
              <p className="text-text-secondary">New articles are currently being processed and will appear shortly.</p>
            </div>
          ) : (
            <>
              {/* Asymmetric Editorial Cover: Lead Dispatch (8 cols) + Top 3 Briefings (4 cols) */}
              {featured && !hasFilterParams && (
                <EditorialCover featured={featured} briefings={briefings} />
              )}

              {/* Main Section: Explorer Grid (8 cols) + Sticky Discovery Rail (4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 min-w-0">
                  <Suspense fallback={<div className="glass-card p-8 text-center text-text-muted">Loading articles…</div>}>
                    <BlogExplorer
                      posts={hasFilterParams ? visible : rest}
                      categories={categories}
                      tags={tags}
                    />
                  </Suspense>
                </div>

                <div className="lg:col-span-4 hidden lg:block">
                  <Suspense fallback={null}>
                    <BlogSidebar
                      categories={categories}
                      tags={tags}
                      popular={popular}
                      months={months}
                      totalPosts={totalPosts}
                      initialCategory={typeof sp.category === "string" ? sp.category : ""}
                      initialQuery={typeof sp.q === "string" ? sp.q : ""}
                      initialTag={typeof sp.tag === "string" ? sp.tag : ""}
                      basePath="/blogs"
                    />
                  </Suspense>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
