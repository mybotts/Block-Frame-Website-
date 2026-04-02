import { NextRequest, NextResponse } from "next/server";
import { queryPosts, fetchBlogPostWithBlocks, createPostPage, serializeBlocks } from "@/lib/notionClient";
import { Block } from "@/lib/types";

/**
 * GET /api/posts?category=ai-news|guides&status=approved
 * Returns posts filtered by status (default: approved) and optional category.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status") || "approved";

  try {
    let notionFilter: any;
    if (category) {
      const categoryName = category === 'ai-news' ? 'AI News' : category === 'guides' ? 'Guides' : category;
      notionFilter = {
        and: [
          { property: "Status", select: { equals: status } },
          { property: "Category", select: { equals: categoryName } },
        ]
      };
    } else {
      notionFilter = {
        property: "Status",
        select: { equals: status },
      };
    }

    const rawPages = await queryPosts(notionFilter);
    // Fetch full BlogPost for each page (includes children if Content empty)
    const posts = await Promise.all(rawPages.map(p => fetchBlogPostWithBlocks(p.id)));
    const response = NextResponse.json({ posts });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Authorize Hans
  const authHeader = request.headers.get("authorization");
  const expectedKey = process.env.HANS_API_KEY;
  if (!expectedKey || !authHeader || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, category, status = 'pending', date, author, blocks } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "Missing required fields: title, category" },
        { status: 400 }
      );
    }

    const notionStatus = status === 'approved' ? 'approved' : 'pending';

    const properties: any = {
      Title: { title: [{ text: { content: title } }] },
      Category: { select: { name: category } },
      Status: { select: { name: notionStatus } },
    };

    if (excerpt) {
      properties.Excerpt = { rich_text: [{ text: { content: excerpt } }] };
    }

    // Content: store blocks as JSON. If blocks provided, serialize; else if content provided, wrap as single block; else empty array.
    if (blocks) {
      properties.Content = { rich_text: [{ text: { content: serializeBlocks(blocks) } }] };
    } else if (content) {
      const singleBlock: Block[] = [{ type: 'text', content, order: 0, id: `block-${Date.now()}` }];
      properties.Content = { rich_text: [{ text: { content: serializeBlocks(singleBlock) } }] };
    } else {
      // No content blocks; store empty array
      properties.Content = { rich_text: [{ text: { content: '[]' } }] };
    }

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
