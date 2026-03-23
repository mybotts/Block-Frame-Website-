import { NextRequest, NextResponse } from "next/server";
import { samplePosts } from "@/lib/data";

/**
 * POST /api/admin/posts/:id/approve
 * Approves a pending blog post (admin only).
 * In production, this would:
 * 1. Authenticate the admin via session/token
 * 2. Update the post status in the database
 * 3. Be called from Mission Control's Approvals tab
 * 
 * Currently uses in-memory data for demonstration.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Find the post
  const post = samplePosts.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  if (post.status === "approved") {
    return NextResponse.json(
      { message: "Post is already approved", post },
      { status: 200 }
    );
  }

  // In production, update the database record
  // For now, mutate the in-memory sample data
  post.status = "approved";

  return NextResponse.json({
    message: "Post approved successfully",
    post,
  });
}
