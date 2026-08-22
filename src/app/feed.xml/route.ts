import { getApprovedPosts } from "@/lib/blogData";
import { postPath, categoryName } from "@/lib/slug";

export const dynamic = "force-dynamic";

type FeedPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content?: string;
};

export async function GET() {
  const baseUrl = "https://www.blockframe.cloud";

  let posts: FeedPost[] = [];

  try {
    const live = await getApprovedPosts();
    posts = live
      .filter((p) => p.categorySlug !== "videos")
      .slice(0, 50)
      .map((p) => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        category: p.category,
        content: p.content,
      }));
  } catch {
    // Leave empty; the feed renders with no items rather than crashing.
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>BlockFrame Labs</title>
    <link>${baseUrl}</link>
    <description>AI systems and services, automation, and web engineering. Practical guides and news from the team building these systems daily.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <category>AI Systems</category>
    <category>AI Automation</category>
    <category>Web Engineering</category>
    ${posts
      .map((post) => {
        const url = `${baseUrl}${postPath(post.title, post.id)}`;
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category || "AI Systems"}]]></category>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      <content:encoded><![CDATA[${post.excerpt || ""}<p><a href="${url}">Read full article →</a></p>]]></content:encoded>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
