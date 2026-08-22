import { NextRequest, NextResponse } from "next/server";
import { queryPosts, fetchBlogPostWithBlocks, createPostPage, appendBlocksToPage } from "@/lib/notionClient";
import { Block } from "@/lib/types";

const BASE_URL = "https://www.blockframe.cloud";

/**
 * POST /api/posts
 * Creates a new blog post in Notion and pings IndexNow for instant indexing
 */
async function pingIndexNow(url: string): Promise<void> {
  const indexNowKey = process.env.INDEXNOW_KEY;
  const indexNowHost = process.env.INDEXNOW_HOST || "www.blockframe.cloud";
  
  if (!indexNowKey) {
    console.log("IndexNow key not configured, skipping ping");
    return;
  }

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: indexNowHost,
        key: indexNowKey,
        keyLocation: `https://${indexNowHost}/${indexNowKey}.txt`,
        urlList: [url],
      }),
    });
    
    if (!response.ok) {
      console.warn("IndexNow ping failed:", response.status, await response.text());
    } else {
      console.log("IndexNow ping successful for:", url);
    }
  } catch (error) {
    console.warn("IndexNow ping error:", error);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status") || "approved";

  try {
    let notionFilter: any;
    if (category) {
      let categoryName: string;
      if (category === 'ai-news') {
        categoryName = 'AI News';
      } else if (category === 'guides') {
        categoryName = 'Guides';
      } else if (category === 'videos') {
        categoryName = 'Videos';
      } else if (category === 'educational') {
        categoryName = 'Educational';
      } else if (category === 'tech') {
        categoryName = 'Tech';
      } else {
        categoryName = category;
      }
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
    const { title, excerpt, content, category, status = 'pending', date, author } = body;
    let { blocks } = body as { blocks?: Block[] };

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

    // Content: leave Content property empty, store blocks as child blocks in Notion
    if (!blocks && content) {
      // Wrap plain text as a single text block
      blocks = [{ type: 'text' as const, content, order: 0, id: `block-${Date.now()}` }];
    }

    const postDate = date || new Date().toISOString().split('T')[0];
    properties.Date = { date: { start: postDate } };
    if (author) {
      properties.Author = { rich_text: [{ text: { content: author } }] };
    }

    const page = await createPostPage(properties);

    // Append blocks as child blocks (not Content property)
    if (blocks && blocks.length > 0) {
      await appendBlocksToPage(page.id, blocks);
    }

    // Ping IndexNow for instant indexing if post is approved
    if (notionStatus === 'approved') {
      const slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') || 'post';
      const postUrl = `${BASE_URL}/blog/${slug}`;
      await pingIndexNow(postUrl);
    }

    return NextResponse.json({ id: page.id, status: notionStatus }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post", details: error.message }, { status: 500 });
  }
}
