import { NextRequest, NextResponse } from "next/server";
import { queryPosts, createPostPage, notionPageToBlogPost } from "@/lib/notionClient";

/**
 * GET /api/posts?category=ai-news|guides
 * Returns only approved posts, optionally filtered by category.
 * Queries Notion database.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    // Build filter: Status = 'approved'
    const filter: any = {
      property: "Status",
      select: { equals: "approved" },
    };

    // If category provided, add Category filter
    if (category) {
      const categoryName = category === 'ai-news' ? 'AI News' : category === 'guides' ? 'Guides' : category;
      filter.and = [
        { property: "Category", select: { equals: categoryName } },
      ];
    }

    // Query Notion
    const results = await queryPosts(filter);

    // Map to BlogPost shape
    const posts = results.map(page => notionPageToBlogPost(page));

    return NextResponse.json({
      posts,
      total: posts.length,
    });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * Create a new blog post draft (or directly approved if status=approved).
 * Requires Authorization: Bearer <HANS_API_KEY>
 */
export async function POST(request: NextRequest) {
  // Authorize Hans
  const authHeader = request.headers.get("authorization");
  const expectedKey = process.env.HANS_API_KEY;
  if (!expectedKey || !authHeader || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, category, status = 'pending', date, author } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, category" },
        { status: 400 }
      );
    }

    // Determine Notion status: default pending/draft; if status is 'approved', set directly.
    const notionStatus = status === 'approved' ? 'approved' : 'pending';

    const properties: any = {
      Title: { title: [{ text: { content: title } }] },
      Category: { select: { name: category } },
      Status: { select: { name: notionStatus } },
    };

    if (excerpt) {
      properties.Excerpt = { rich_text: [{ text: { content: excerpt } }] };
    }
    if (content) {
      properties.Content = { rich_text: [{ text: { content: content } }] };
    }
    // Date: fallback to today
    const postDate = date || new Date().toISOString().split('T')[0];
    properties.Date = { date: { start: postDate } };
    if (author) {
      properties.Author = { rich_text: [{ text: { content: author } }] };
    }

    const page = await createPostPage(properties);

    return NextResponse.json({ id: page.id, status: notionStatus }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post", details: error.message }, { status: 500 });
  }
}
