import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import {
  getApprovedPosts,
  getCategorySummary,
  getTagSummary,
  getPopularPosts,
  getArchiveMonths,
} from "@/lib/blogData";
import { readingTimeMinutes } from "@/lib/postView";
import { categoryName, postPath } from "@/lib/slug";

const BASE_URL = "https://www.blockframe.cloud";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const categories = await getCategorySummary();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryName(slug);
  return {
    title: `${name} Articles`,
    description: `Practical ${name.toLowerCase()} articles on AI systems, automation, and web engineering from the BlockFrame Labs blog.`,
    alternates: {
      canonical: `${BASE_URL}/blogs/category/${slug}`,
    },
    openGraph: {
      title: `${name} Articles | BlockFrame Labs`,
      description: `Practical ${name.toLowerCase()} articles on AI systems, automation, and web engineering.`,
      url: `${BASE_URL}/blogs/category/${slug}`,
      siteName: "BlockFrame Labs",
      images: [
        {
          url: `${BASE_URL}/images/og-preview.png`,
          width: 1200,
          height: 630,
          alt: `BlockFrame Labs Blog : ${name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = (await getApprovedPosts()).filter((p) => p.categorySlug === slug);

  if (posts.length === 0) {
    return (
      <>
        <Navigation />
        <PremiumBackground />
        <main className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-40 pb-24 px-6">
          <div className="glass-card p-12 text-center max-w-lg">
            <h1 className="text-2xl font-semibold text-text-primary mb-3">Category not found</h1>
            <p className="text-text-secondary mb-6">
              No articles in this category yet. Browse everything on the main blog index.
            </p>
            <Link
              href="/blogs"
              className="inline-block rounded px-5 py-2.5 bg-accent/15 text-accent-light hover:bg-accent/25 transition"
            >
              All blogs
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const name = categoryName(slug);
  const allCategories = await getCategorySummary();
  const [tags, popularRaw, months] = await Promise.all([
    getTagSummary(),
    getPopularPosts(5),
    getArchiveMonths(),
  ]);
  // On a category page the featured slot IS the page, so exclude nothing from
  // popular except posts already shown at the top of this list.
  const firstIds = new Set(posts.slice(0, 2).map((p) => p.id));
  const popular = popularRaw
    .filter((p) => !firstIds.has(p.id))
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      title: p.title,
      href: postPath(p.title, p.id),
      minutes: readingTimeMinutes(p),
    }));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${name} Articles`,
    url: `${BASE_URL}/blogs/category/${slug}`,
    isPartOf: { "@id": `${BASE_URL}/blogs#blog` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navigation />
      <PremiumBackground />

      <main id="main-content" className="relative z-10 w-full min-h-screen pt-40 pb-24 px-6 md:px-12">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-primary-light transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blogs" className="hover:text-primary-light transition-colors">Blogs</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text-secondary">{name}</li>
            </ol>
          </nav>

          <div className="blog-layout">
            {/* Main column */}
            <div className="min-w-0">
              <header className="mb-10">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-4">
                  {name}
                </h1>
                <p className="text-xl text-text-secondary font-light">
                  {posts.length} article{posts.length === 1 ? "" : "s"} in this category.
                </p>
              </header>

              {/* Cross-category navigation */}
              {allCategories.length > 1 && (
                <div className="mb-10 flex flex-wrap gap-2" aria-label="Other categories">
                  <Link href="/blogs" className="blog-pill">
                    All
                  </Link>
                  {allCategories
                    .filter((c) => c.slug !== slug)
                    .map((c) => (
                      <Link key={c.slug} href={`/blogs/category/${c.slug}`} className="blog-pill">
                        {c.name} <span className="blog-pill-count">{c.count}</span>
                      </Link>
                    ))}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Discovery rail */}
            <Suspense fallback={null}>
              <BlogSidebar
                categories={allCategories}
                tags={tags}
                popular={popular}
                months={months}
                totalPosts={posts.length}
                basePath={`/blogs/category/${slug}`}
              />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
