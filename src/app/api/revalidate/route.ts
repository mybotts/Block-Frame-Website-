import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

async function handleRevalidate(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") || "/blogs";

  const expectedSecret = process.env.REVALIDATE_SECRET || process.env.NOTION_TOKEN;

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid or missing secret token" }, { status: 401 });
  }

  try {
    revalidatePath(path);
    // If revalidating blog paths, also refresh indexes & feeds
    if (path === "/blogs" || path.startsWith("/blog/")) {
      revalidatePath("/");
      revalidatePath("/feed.xml");
      revalidatePath("/rss.xml");
      revalidatePath("/feed.json");
    }

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error during revalidation", error: error?.message },
      { status: 500 }
    );
  }
}
