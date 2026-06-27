import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBlogPostWithBlocks, queryPosts, notionPageToBlogPost } from "@/lib/notionClient";
import PostContent from "./PostContent";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await fetchBlogPostWithBlocks(id);
    if (!post) return notFound();

    const description =
      post.excerpt ||
      post.content?.substring(0, 160) ||
      `Read ${post.title} on BlockFrame Labs`;

    // Find first image for OG
    const imageBlock = post.blocks?.find((b) => b.type === "image");
    const rawImage = imageBlock?.content || "/images/og-preview.png";
    const ogImage = rawImage.startsWith("http") ? rawImage : `https://www.blockframe.cloud${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

    const keywords = [
      "AI systems",
      "AI automation",
      post.category?.toLowerCase() || "technology",
      ...(post.title?.split(" ").filter(w => w.length > 4).slice(0, 4) || []),
    ].filter(Boolean);

    return {
      title: `${post.title} | BlockFrame Labs`,
      description,
      keywords,
      alternates: {
        canonical: `https://www.blockframe.cloud/post/${id}`,
      },
      openGraph: {
        title: post.title,
        description,
        url: `https://www.blockframe.cloud/post/${id}`,
        siteName: "BlockFrame Labs",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: post.date,
        authors: [post.author || "BlockFrame Labs"],
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
  } catch {
    return {
      title: "Post not found",
      description: "This blog post could not be found.",
    };
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  let post;
  try {
    post = await fetchBlogPostWithBlocks(id);
  } catch {
    notFound();
  }

  if (!post) notFound();

  // Fetch related posts (same category, excluding current)
  let relatedPosts: Array<{ id: string; title: string; excerpt: string; date: string; category: string }> = [];
  try {
    const allPages = await queryPosts({
      property: "Status",
      select: { equals: "approved" },
    });
    const allPosts = allPages
      .map(notionPageToBlogPost)
      .filter(p => p.id !== id && p.status === "approved");

    // Prioritize same category, then take latest
    const sameCategory = allPosts.filter(p => p.category === post!.category);
    const others = allPosts.filter(p => p.category !== post!.category);
    relatedPosts = [...sameCategory, ...others]
      .slice(0, 3)
      .map(p => ({ id: p.id, title: p.title, excerpt: p.excerpt, date: p.date, category: p.category }));
  } catch {
    // Silently fail — related posts are optional
  }

  // Build enhanced structured data
  const imageBlock = post.blocks?.find((b) => b.type === "image");
  const videoBlock = post.blocks?.find((b) => b.type === "video");
  const textContent = post.blocks
    ?.filter(b => b.type === "text" || b.type === "markdown")
    .map(b => b.content)
    .join(" ") || "";
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.content?.substring(0, 200) || undefined,
    image: imageBlock?.content || undefined,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: wordCount > 0 ? wordCount : undefined,
    author: {
      "@type": "Organization",
      name: post.author || "BlockFrame Labs",
      url: "https://www.blockframe.cloud",
    },
    publisher: {
      "@type": "Organization",
      name: "BlockFrame Labs",
      logo: {
        "@type": "ImageObject",
        url: "https://www.blockframe.cloud/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.blockframe.cloud/post/${id}`,
    },
    articleSection: post.category,
    keywords: post.category,
    about: {
      "@type": "Thing",
      name: post.category || "AI Systems",
    },
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

  // FAQ schema — extract from content if it has heading-based Q&A patterns
  const faqSchema = buildFaqSchema(post.title, post.blocks);

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.blockframe.cloud",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://www.blockframe.cloud/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category || "Article",
        item: `https://www.blockframe.cloud/blogs?filter=${post.categorySlug || ""}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://www.blockframe.cloud/post/${id}`,
      },
    ],
  };

  // Remove undefined values
  const cleanArticle = JSON.parse(JSON.stringify(articleSchema));
  const cleanBreadcrumb = JSON.parse(JSON.stringify(breadcrumbSchema));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanBreadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <PostContent initialPost={post} relatedPosts={relatedPosts} />
    </>
  );
}

function buildFaqSchema(title: string, blocks: any[]) {
  if (!blocks) return null;

  const faqs: Array<{ question: string; answer: string }> = [];

  // Extract Q&A from heading + paragraph patterns
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "markdown" && block.content?.startsWith("## ")) {
      const question = block.content.replace(/^##\s*/, "").trim();
      // Look for next text block as answer
      const nextBlock = blocks[i + 1];
      if (nextBlock && (nextBlock.type === "text" || nextBlock.type === "markdown") && nextBlock.content?.length > 20) {
        faqs.push({
          question,
          answer: nextBlock.content.substring(0, 300),
        });
      }
    }
  }

  // If no heading-based FAQs found, generate from title
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
