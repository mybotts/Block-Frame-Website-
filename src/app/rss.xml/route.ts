import { NextResponse } from "next/server";
import { getApprovedPosts } from "@/lib/blogData";
import { CONTENT_TEAM_NAME, BASE_URL, postPath, categoryName } from "@/lib/slug";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const posts = await getApprovedPosts();

    const rssItems = posts
      .slice(0, 50)
      .map((post) => {
        const postUrl = `${BASE_URL}${postPath(post.title, post.id)}`;
        const pubDate = new Date(post.date).toUTCString();
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
          : "";

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${escapeXml(post.excerpt || content.substring(0, 300))}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <category>${categoryName(post.categorySlug)}</category>
      <dc:creator><![CDATA[${CONTENT_TEAM_NAME}]]></dc:creator>
      ${imageUrl ? `<enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />` : ""}
    </item>`;
      })
      .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BlockFrame Labs Blog</title>
    <link>${BASE_URL}/blogs</link>
    <description>Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>BlockFrame Labs / Next.js</generator>
    <ttl>60</ttl>
    <image>
      <url>${BASE_URL}/images/logo.png</url>
      <title>BlockFrame Labs</title>
      <link>${BASE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Failed to generate RSS feed:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>BlockFrame Labs Blog</title><description>Error generating feed</description></channel></rss>`,
      { status: 500, headers: { "Content-Type": "application/rss+xml; charset=utf-8" } }
    );
  }
}
