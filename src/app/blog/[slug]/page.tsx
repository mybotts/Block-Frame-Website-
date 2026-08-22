import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getApprovedPosts, getPostBySlug } from "@/lib/blogData";
import { CONTENT_TEAM_NAME, BASE_URL, looksLikeUuid, postPath, postSlug, categoryName } from "@/lib/slug";
import { getPostThumbnail, wordCount, readingTimeMinutes, getTableOfContents } from "@/lib/postView";
import PostArticle from "./PostArticle";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

// Prerender the newest posts at build time; everything else renders on demand (ISR).
export async function generateStaticParams() {
  try {
    const posts = await getApprovedPosts();
    return posts.slice(0, 12).map((p) => ({ slug: postSlug(p.title, p.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // keep raw
  }

  const post = await getPostBySlug(slug);
  if (!post || post.status !== "approved") {
    return { title: "Post not found", description: "This blog post could not be found." };
  }

  const canonicalPath = postPath(post.title, post.id);
  const description =
    post.excerpt || post.content?.substring(0, 160) || `Read ${post.title} on BlockFrame Labs`;
  const ogImage = getPostThumbnail(post) || `${BASE_URL}/images/og-preview.png`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      types: { "text/markdown": `${BASE_URL}/api/posts/${postSlug(post.title, post.id)}/markdown` },
    },
    openGraph: {
      title: post.title,
      description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "BlockFrame Labs",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [CONTENT_TEAM_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // keep raw
  }

  // Legacy Notion UUID links resolve to the canonical slug URL.
  if (looksLikeUuid(slug)) {
    const posts = await getApprovedPosts();
    const target = posts.find((p) => p.id === slug);
    if (!target) notFound();
    redirect(postPath(target.title, target.id));
  }

  const post = await getPostBySlug(slug);
  if (!post || post.status !== "approved") notFound();

  // Non-canonical slug (e.g. old title) → redirect to the current canonical URL.
  const canonicalPath = postPath(post.title, post.id);
  if (`/blog/${slug}` !== canonicalPath) {
    redirect(canonicalPath);
  }

  const all = await getApprovedPosts().then((list) =>
    list.filter((p) => p.categorySlug !== "videos")
  );
  const index = all.findIndex((p) => p.id === post.id);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  const relatedPosts = all
    .filter((p) => p.id !== post.id)
    .sort((a, b) => {
      const aSame = a.category === post.category ? 0 : 1;
      const bSame = b.category === post.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      category: p.category,
      slug: postSlug(p.title, p.id),
    }));

  const toc = getTableOfContents(post);

  // ---- Structured data ----
  const imageBlock = post.blocks?.find((b) => b.type === "image");
  const videoBlock = post.blocks?.find((b) => b.type === "video");
  const ogImage = getPostThumbnail(post) || `${BASE_URL}/images/og-preview.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.content?.substring(0, 200) || undefined,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    wordCount: wordCount(post),
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: CONTENT_TEAM_NAME,
      url: `${BASE_URL}/blogs`,
    },
    publisher: {
      "@type": "Organization",
      name: "BlockFrame Labs",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${canonicalPath}`,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${BASE_URL}/blogs#blog`,
      name: "BlockFrame Labs Blog",
    },
    articleSection: post.category,
    keywords: post.category,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article header h1", "article .prose p:first-of-type"],
    },
    ...(videoBlock?.content
      ? {
          video: {
            "@type": "VideoObject",
            embedUrl: videoBlock.content,
            name: post.title,
          },
        }
      : {}),
  };

  const faqSchema = buildFaqSchema(post.blocks);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blogs", item: `${BASE_URL}/blogs` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category || "Articles",
        item: `${BASE_URL}/blogs/category/${post.categorySlug}`,
      },
      { "@type": "ListItem", position: 4, name: post.title, item: `${BASE_URL}${canonicalPath}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <PostArticle
        post={post}
        canonicalPath={canonicalPath}
        ogImage={imageBlock?.content || ogImage}
        toc={toc}
        relatedPosts={relatedPosts}
        newer={newer ? { title: newer.title, href: postPath(newer.title, newer.id) } : null}
        older={older ? { title: older.title, href: postPath(older.title, older.id) } : null}
      />
    </>
  );
}

function buildFaqSchema(blocks: any[]) {
  if (!blocks) return null;

  const faqs: Array<{ question: string; answer: string }> = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "markdown" && block.content?.startsWith("## ")) {
      const question = block.content.replace(/^##\s*/, "").trim();
      const nextBlock = blocks[i + 1];
      if (
        nextBlock &&
        (nextBlock.type === "text" || nextBlock.type === "markdown") &&
        nextBlock.content?.length > 20
      ) {
        faqs.push({ question, answer: nextBlock.content.substring(0, 300) });
      }
    }
  }

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
