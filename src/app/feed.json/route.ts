import { NextResponse } from "next/server";
import { getApprovedPosts } from "@/lib/blogData";
import { CONTENT_TEAM_NAME, BASE_URL, postPath, categoryName } from "@/lib/slug";

export async function GET() {
  try {
    const posts = await getApprovedPosts();

    const items = posts.slice(0, 50).map((post) => {
      const postUrl = `${BASE_URL}${postPath(post.title, post.id)}`;
      const content =
        post.blocks
          ?.filter((b) => b.type === "text" || b.type === "markdown")
          .map((b) => b.content)
          .join("\n\n") || post.excerpt || "";

      const imageBlock = post.blocks?.find((b) => b.type === "image");
      const imageUrl = imageBlock?.content
        ? imageBlock.content.startsWith("http")
          ? imageBlock.content
          : `${BASE_URL}${imageBlock.content.startsWith("/") ? "" : "/"}${imageBlock.content}`
        : `${BASE_URL}/images/og-preview.png`;

      return {
        id: postUrl,
        url: postUrl,
        title: post.title,
        content_html: content,
        summary: post.excerpt || content.substring(0, 300),
        date_published: post.date,
        date_modified: post.updatedAt || post.date,
        authors: [{ name: CONTENT_TEAM_NAME }],
        tags: [categoryName(post.categorySlug)],
        image: imageUrl,
      };
    });

    const feed = {
      version: "https://jsonfeed.org/version/1.1",
      title: "BlockFrame Labs Blog",
      home_page_url: `${BASE_URL}/blogs`,
      feed_url: `${BASE_URL}/feed.json`,
      description:
        "Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.",
      language: "en-US",
      icon: `${BASE_URL}/images/logo.png`,
      favicon: `${BASE_URL}/favicon.ico`,
      authors: [{ name: CONTENT_TEAM_NAME, url: BASE_URL }],
      items,
    };

    return new NextResponse(JSON.stringify(feed, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Failed to generate JSON feed:", error);
    return new NextResponse(
      JSON.stringify({
        version: "https://jsonfeed.org/version/1.1",
        title: "BlockFrame Labs Blog",
        home_page_url: `${BASE_URL}/blogs`,
        feed_url: `${BASE_URL}/feed.json`,
        description: "Error generating feed",
        items: [],
      }),
      { status: 500, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }
}
