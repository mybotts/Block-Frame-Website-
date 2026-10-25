import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import FeaturedHero from "@/components/blog/FeaturedHero";
import BlogExplorer from "@/components/blog/BlogExplorer";
import BlogSidebar from "@/components/blog/BlogSidebar";
import {
  getApprovedPosts,
  getCategorySummary,
  getTagSummary,
  getPopularPosts,
  getArchiveMonths,
} from "@/lib/blogData";
import { readingTimeMinutes } from "@/lib/postView";
import { postPath, CONTENT_TEAM_NAME } from "@/lib/slug";

const BASE_URL = "https://www.blockframe.cloud";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getApprovedPosts();
  return {
    title: "Blogs",
    description:
      "Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.",
    alternates: {
      canonical: `${BASE_URL}/blogs`,
    },
    openGraph: {
      title: "Blogs | BlockFrame Labs",
      description:
        "Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.",
      url: `${BASE_URL}/blogs`,
      siteName: "BlockFrame Labs",
      images: [
        {
          url: `${BASE_URL}/images/og-preview.png`,
          width: 1200,
          height: 630,
          alt: "BlockFrame Labs Blog : AI Systems, Automation & Web Engineering",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blogs | BlockFrame Labs",
      description:
        "Practical guides and news on AI systems, automation, and web engineering.",
      images: [`${BASE_URL}/images/og-preview.png`],
    },
    keywords: [
      "AI automation blog",
      "AI systems guide",
      "web engineering",
      "AI agents",
      "Notion CMS automation",
      "content automation",
    ],
    robots: posts.length === 0 ? { index: false } : { index: true, follow: true },
  };
}

type Props = {
  // Next 15+/16: searchParams is a Promise in server components.
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogsPage({ searchParams }: Props) {
  const [allPosts, categories, tags, popularRaw, months] = await Promise.all([
    getApprovedPosts(),
    getCategorySummary(),
    getTagSummary(),
    getPopularPosts(5),
    getArchiveMonths(),
  ]);

  const sp = await searchParams;
  // When a filter param is present we skip the hero and hand the island every
  // post, so filtered views never silently hide the featured article.
  const hasFilterParams = Boolean(sp.category || sp.q || sp.sort || sp.tag);

  // Videos live in their own tab; everything else flows through the index.
  const visible = allPosts.filter((p) => p.categorySlug !== "videos");
  const [featured, ...rest] = visible;
  const totalPosts = visible.length;

  const popular = popularRaw
    .filter((p) => p.id !== featured?.id)
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      title: p.title,
      href: postPath(p.title, p.id),
      minutes: readingTimeMinutes(p),
    }));

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/blogs#blog`,
    name: "BlockFrame Labs Blog",
    description:
      "Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.",
    url: `${BASE_URL}/blogs`,
    publisher: {
      "@type": "Organization",
      name: "BlockFrame Labs",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    author: {
      "@type": "Organization",
      name: CONTENT_TEAM_NAME,
    },
    blogPosts: {
      "@type": "ItemList",
      itemListElement: visible.slice(0, 50).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}${postPath(p.title, p.id)}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Navigation />
      <PremiumBackground />

      <main id="main-content" className="relative z-10 w-full min-h-screen pt-40 pb-24 px-6 md:px-12">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary leading-tight mb-4">
              Blogs
            </h1>
            <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto mb-3">
              Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.
            </p>
            <p className="text-sm text-text-muted">{CONTENT_TEAM_NAME}</p>
          </div>

          {/* Proof strip : live counter + cadence claim */}
          <div className="blog-proof-strip mb-12" role="status" aria-label="Publishing cadence">
            <div className="blog-proof-item">
              <span className="blog-proof-number">{totalPosts}</span>
              <span className="blog-proof-label">live articles</span>
            </div>
            <span className="blog-proof-divider" aria-hidden="true" />
            <div className="blog-proof-item">
              <span className="blog-proof-number">30 in 30</span>
              <span className="blog-proof-label">days, zero manual edits</span>
            </div>
            <span className="blog-proof-divider" aria-hidden="true" />
            <div className="blog-proof-item">
              <span className="blog-proof-number">Notion</span>
              <span className="blog-proof-label">straight to published</span>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <h2 className="text-lg font-semibold text-text-primary mb-2">No blog posts yet</h2>
              <p className="text-text-secondary">New blog posts are being reviewed and will appear here once approved.</p>
            </div>
          ) : (
            <div className="blog-layout">
              {/* Main column: hero + explorer + entry points */}
              <div className="min-w-0">
                {featured && !hasFilterParams && <FeaturedHero post={featured} />}

                <Suspense fallback={<div className="glass-card p-8 text-center text-text-muted">Loading articles…</div>}>
                  <BlogExplorer
                    posts={hasFilterParams ? visible : rest}
                    categories={categories}
                    tags={tags}
                  />
                </Suspense>

                {/* Deep links: AI-agent surface + category directory */}
                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                  <div className="glass-card p-6">
                    <h2 className="blog-side-heading mb-3">For AI agents and LLM readers</h2>
                    <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
                      Reading this blog programmatically? Every article ships a full-text markdown mirror, and the whole blog is one manifest.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a href="/llms.txt" className="button-secondary px-4 py-2 text-sm">llms.txt manifest</a>
                      <a href="/rss.xml" className="button-secondary px-4 py-2 text-sm">RSS feed</a>
                      <Link href="/api/posts" className="button-secondary px-4 py-2 text-sm">JSON API</Link>
                    </div>
                  </div>
                  <div className="glass-card p-6">
                    <h2 className="blog-side-heading mb-3">Browse by category</h2>
                    <div className="flex flex-col gap-1.5">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/blogs/category/${cat.slug}`}
                          className="group flex items-center justify-between text-sm text-text-secondary hover:text-primary-light transition-colors py-1"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-text-muted group-hover:text-primary-light transition-colors">
                            {cat.count} article{cat.count === 1 ? "" : "s"} →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discovery rail */}
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
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
