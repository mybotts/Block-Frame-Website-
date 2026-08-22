import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { getApprovedPosts, getCategorySummary } from "@/lib/blogData";
import { CONTENT_TEAM_NAME, postPath } from "@/lib/slug";

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
          alt: "BlockFrame Labs Blog — AI Systems, Automation & Web Engineering",
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

export default async function BlogsPage() {
  const [posts, categories] = await Promise.all([getApprovedPosts(), getCategorySummary()]);
  const visible = posts.filter((p) => p.categorySlug !== "videos");

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

      <main id="main-content" className="relative z-10 w-full min-h-screen flex flex-col items-center pt-40 pb-24 px-6 md:px-12">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary leading-tight mb-4">
              Blogs
            </h1>
            <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto mb-3">
              Practical guides and news on AI agents, automation, and web engineering. Written by the team building these systems daily.
            </p>
            <p className="text-sm text-text-muted">{CONTENT_TEAM_NAME}</p>
          </div>

          {/* Category links */}
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-3" aria-label="Blog categories">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blogs/category/${cat.slug}`}
                  className="rounded px-4 py-2 bg-transparent text-text-secondary transition-all duration-300 hover:bg-primary/10 hover:text-primary-light"
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>
          )}

          {/* Server-rendered posts grid */}
          {visible.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <h2 className="text-lg font-semibold text-text-primary mb-2">No blog posts yet</h2>
              <p className="text-text-secondary">New blog posts are being reviewed and will appear here once approved.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
