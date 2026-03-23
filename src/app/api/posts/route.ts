import { NextRequest, NextResponse } from "next/server";
import { samplePosts } from "@/lib/data";

/**
 * GET /api/posts?category=ai-news|guides
 * Returns only approved posts, optionally filtered by category.
 * In a production setup, this would query a database.
 * Posts with status="pending" are only visible in Mission Control's Approvals tab.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  // Only return approved posts
  let filteredPosts = samplePosts.filter((post) => post.status === "approved");

  // Filter by category if provided
  if (category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.categorySlug === category
    );
  }

  // Sort by date (newest first)
  filteredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return NextResponse.json({
    posts: filteredPosts,
    total: filteredPosts.length,
  });
}
