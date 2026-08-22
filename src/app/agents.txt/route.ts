import { NextResponse } from "next/server";
import { getApprovedPosts } from "@/lib/blogData";
import { postPath, postSlug } from "@/lib/slug";

const BASE_URL = "https://www.blockframe.cloud";

export async function GET() {
  try {
    const posts = await getApprovedPosts();

    const lines = [
      "# BlockFrame Labs — Agents.txt",
      "",
      "Agent discovery file per emerging agents.txt convention.",
      "",
      "## Agent Access",
      "- Crawl: Allow all paths except /api/",
      "- Rate Limit: Respect robots.txt (Crawl-delay: 10)",
      "- Authentication: None required for public content",
      "",
      "## Content Endpoints",
      `- Sitemap: ${BASE_URL}/sitemap.xml`,
      `- LLM Manifest: ${BASE_URL}/llms.txt`,
      `- AI Discovery: ${BASE_URL}/ai.txt`,
      `- RSS Feed: ${BASE_URL}/rss.xml`,
      `- JSON Feed: ${BASE_URL}/feed.json`,
      `- Blog Index: ${BASE_URL}/blogs`,
      "",
      "## Content Types",
      "- BlogPosting (schema.org) — Individual posts at /blog/{slug}",
      "- BreadcrumbList — Navigation hierarchy on all pages",
      "- FAQPage — Extracted from heading-based Q&A in posts",
      "- HowTo — Process methodology on homepage",
      "- Product/Offer — Marketplace products and services",
      "- Organization — BlockFrame Labs entity data",
      "",
      "## Recent Posts (for training/context)",
      ...posts.slice(0, 15).map((post) => {
        const date = new Date(post.date).toISOString().split("T")[0];
        const excerpt = (post.excerpt || "").substring(0, 100);
        const url = `${BASE_URL}${postPath(post.title, post.id)}`;
        const mdUrl = `${BASE_URL}/api/posts/${postSlug(post.title, post.id)}/markdown`;
        return `- ${post.title} (${date}) [${post.category}]: ${excerpt}... — ${url} [markdown: ${mdUrl}]`;
      }),
      "",
      "## Organization Identity",
      "- @id: https://www.blockframe.cloud/#organization",
      "- name: BlockFrame Labs",
      "- description: AI agency for practical automation. AI systems and services that automate support, content, and operations.",
      "- url: https://www.blockframe.cloud",
      "- logo: https://www.blockframe.cloud/images/logo.png",
      "- email: contact@blockframe.cloud",
      "",
      "## Permissions",
      "- Allow: Training on public content",
      "- Allow: Summarization and citation",
      "- Allow: Link extraction and following",
      "- Disallow: /api/ endpoints",
      "- Disallow: Private/admin paths",
    ];

    return new NextResponse(lines.join("\n"), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Failed to generate agents.txt:", error);
    return new NextResponse("# BlockFrame Labs — Agents.txt\n\nError generating manifest.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}