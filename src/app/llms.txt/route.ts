import { NextResponse } from "next/server";
import { getApprovedPosts, getCategorySummary } from "@/lib/blogData";
import { CONTENT_TEAM_NAME, BASE_URL, postPath, postSlug, categoryName } from "@/lib/slug";

// llms.txt manifest with full markdown bodies.
// AI agents get the complete content of every post in one plain-text document.
export async function GET() {
  try {
    const posts = (await getApprovedPosts()).filter((p) => p.categorySlug !== "videos");
    const categories = await getCategorySummary();

    const sections: string[] = [
      "# BlockFrame Labs Blog",
      "",
      `AI systems and services blog by BlockFrame Labs. Practical guides and news on AI automation, web engineering, and content systems. Written daily by the ${CONTENT_TEAM_NAME}.`,
      "",
      "Every article below is included in full as markdown. Each block starts with a link to the canonical page.",
      `Machine-readable mirrors: ${BASE_URL}/rss.xml, ${BASE_URL}/feed.json, ${BASE_URL}/sitemap.xml. Single-post markdown: append /markdown to any /api/posts/<slug> URL pattern shown per entry below.`,
      "",
    ];

    if (categories.length > 0) {
      sections.push("## Collections", "");
      sections.push(`- [All Posts](${BASE_URL}/blogs)`);
      for (const c of categories) {
        sections.push(`- [${c.name}](${BASE_URL}/blogs/category/${c.slug}) (${c.count} articles)`);
      }
      sections.push(
        `- [Marketplace Products](${BASE_URL}/marketplace/products)`,
        `- [Services](${BASE_URL}/services)`,
        ""
      );
    }

    sections.push("## Posts", "");

    for (const post of posts) {
      const url = `${BASE_URL}${postPath(post.title, post.id)}`;
      const mdSlug = postSlug(post.title, post.id);
      const date = new Date(post.date).toISOString().split("T")[0];
      const updated = post.updatedAt ? new Date(post.updatedAt).toISOString().split("T")[0] : date;

      const body = post.blocks
        .slice()
        .sort((a, b) => a.order - b.order)
        .filter((b) => b.type === "text" || b.type === "markdown")
        .map((b) => b.content)
        .join("\n\n");

      sections.push(`### [${post.title}](${url})`);
      sections.push("");
      sections.push(
        `- Canonical: ${url}`,
        `- Markdown: ${BASE_URL}/api/posts/${mdSlug}/markdown`,
        `- Published: ${date}`,
        `- Updated: ${updated}`,
        `- Category: ${categoryName(post.categorySlug)}`,
        `- Author: ${CONTENT_TEAM_NAME}`
      );
      if (post.excerpt) sections.push(`- Summary: ${post.excerpt}`);
      sections.push("");
      if (body) {
        sections.push(body);
        sections.push("");
      }
      sections.push("---", "");
    }

    sections.push(
      "## About",
      "",
      `- [BlockFrame Labs](${BASE_URL}) — AI agency building practical automation systems and services.`,
      `- [Blog OS product](${BASE_URL}/marketplace/products/blog-os-automated-notion-cms) — the system that runs this blog.`,
      ""
    );

    return new NextResponse(sections.join("\n"), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Failed to generate llms.txt:", error);
    return new NextResponse("# BlockFrame Labs Blog\n\nError generating manifest.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
