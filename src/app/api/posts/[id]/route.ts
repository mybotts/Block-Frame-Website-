import { NextRequest, NextResponse } from "next/server";
import { retrievePostPage, notionPageToBlogPost, updatePostPage } from "@/lib/notionClient";

/**
 * GET /api/posts/[id]
 * Returns a single post by Notion page ID.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const page = await retrievePostPage(id);
    const post = notionPageToBlogPost(page);
    return NextResponse.json({ post });
  } catch (error: any) {
    console.error("Error fetching post by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch post", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/posts/[id]
 * Update a post (title, excerpt, blocks, etc.). Requires Authorization: Bearer <HANS_API_KEY>.
 * Accepts partial updates. Blocks are provided as array; they replace the entire content.
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Authorize Hans
  const authHeader = request.headers.get("authorization");
  const expectedKey = process.env.HANS_API_KEY;
  if (!expectedKey || !authHeader || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const { title, excerpt, category, status, date, author, blocks } = body;

    // Fetch the current page to preserve unchanged properties
    const currentPage = await retrievePostPage(id);
    const currentProps = currentPage.properties;
    const getText = (prop: any) => {
      if (!prop) return ''
      if (prop.title) return prop.title[0]?.plain_text || ''
      if (prop.rich_text) return prop.rich_text[0]?.plain_text || ''
      if (prop.select) return prop.select.name
      if (prop.date) return prop.date.start
      return ''
    }

    // Build updated properties
    const newProperties: any = { ...currentProps };

    if (title !== undefined) {
      newProperties.Title = { title: [{ text: { content: title } }] };
    }
    if (category !== undefined) {
      newProperties.Category = { select: { name: category } };
    }
    if (status !== undefined) {
      newProperties.Status = { select: { name: status } };
    }
    if (excerpt !== undefined) {
      newProperties.Excerpt = { rich_text: [{ text: { content: excerpt } }] };
    }
    if (author !== undefined) {
      newProperties.Author = { rich_text: [{ text: { content: author } }] };
    }
    if (date !== undefined) {
      newProperties.Date = { date: { start: date } };
    }
    if (blocks !== undefined) {
      // blocks is an array of Block
      const json = JSON.stringify(blocks);
      newProperties.Content = { rich_text: [{ text: { content: json } }] };
    }

    await updatePostPage(id, newProperties);

    return NextResponse.json({ id, updated: true });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post", details: error.message },
      { status: 500 }
    );
  }
}
