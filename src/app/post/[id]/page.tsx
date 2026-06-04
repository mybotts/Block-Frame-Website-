import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBlogPostWithBlocks } from "@/lib/notionClient";
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
    const ogImage = imageBlock?.content || "/images/og-preview.png";

    return {
      title: post.title,
      description,
      alternates: {
        canonical: `/post/${id}`,
      },
      openGraph: {
        title: post.title,
        description,
        url: `/post/${id}`,
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
        authors: [post.author],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: [ogImage],
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

  // Build Article structured data
  const imageBlock = post.blocks?.find((b) => b.type === "image");
  const videoBlock = post.blocks?.find((b) => b.type === "video");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description:
      post.excerpt ||
      post.content?.substring(0, 200) ||
      undefined,
    image: imageBlock?.content || undefined,
    datePublished: post.date,
    dateModified: post.date,
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

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(articleSchema));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
      />
      <PostContent initialPost={post} />
    </>
  );
}
