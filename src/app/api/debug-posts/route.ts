import { NextRequest, NextResponse } from "next/server";
import { queryPosts, notionPageToBlogPost } from "@/lib/notionClient";

export async function GET(request: NextRequest) {
  try {
    // Fetch a couple posts
    const raw = await queryPosts({ property: "Status", select: { equals: "approved" } }, [
      { property: "Date", direction: "descending" }
    ]);
    // Transform
    const posts = raw.map(notionPageToBlogPost);
    return NextResponse.json({ posts, rawCount: raw.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
