import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blogData";
import { postToMarkdown } from "@/lib/markdown";

// GET /api/posts/<slug-or-id>/markdown
// Plain-markdown mirror of a single post, for AI agents and LLM crawlers.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawSlug } = await params;
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // keep raw
  }

  try {
    const post = await getPostBySlug(slug);
    if (!post || post.status !== "approved") {
      return new NextResponse("Post not found", { status: 404 });
    }
    return new NextResponse(postToMarkdown(post), {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("[markdown mirror] Failed:", error);
    return new NextResponse("Failed to generate markdown", { status: 500 });
  }
}
