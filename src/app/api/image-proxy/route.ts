import { NextRequest, NextResponse } from "next/server";

/**
 * Image Proxy API
 * 
 * Fetches images from Notion's expiring S3 URLs and serves them with long-term caching.
 * This prevents broken images when Notion's signed URLs expire.
 * 
 * Usage: /api/image-proxy?url=<encoded_notion_image_url>
 */

export const runtime = "edge";

const ALLOWED_HOSTS = [
  "prod-files-secure.s3",
  "prod-files.secure.notion.static.com",
  "notion-static.com",
  "images.unsplash.com",
  "cdn.notion.so",
  "s3.us-west-2.amazonaws.com",
  "amazonaws.com",
];

function isAllowedHost(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return ALLOWED_HOSTS.some((allowed) => hostname.includes(allowed));
  } catch {
    return false;
  }
}

async function fetchWithTimeout(url: string, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "BlockFrameLabsSiteBot/1.0 (contact@blockframe.cloud)",
        Accept: "image/*,*/*;q=0.8",
      },
      redirect: "follow",
      signal: controller.signal,
    });
    return resp;
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing 'url' parameter", { status: 400 });
  }

  // Validate the URL is from an allowed host
  if (!isAllowedHost(imageUrl)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  try {
    const resp = await fetchWithTimeout(imageUrl);

    if (!resp.ok) {
      return new NextResponse("Upstream error: " + resp.status, { status: 502 });
    }

    const contentType = resp.headers.get("content-type") || "image/jpeg";
    
    // Only serve image content types
    if (!contentType.startsWith("image/")) {
      return new NextResponse("Not an image", { status: 400 });
    }

    const arrayBuffer = await resp.arrayBuffer();

    // Cache for 1 year (Notion images are immutable once uploaded)
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Length", arrayBuffer.byteLength.toString());
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("[image-proxy] Error fetching image:", error);
    return new NextResponse("Failed to fetch image", { status: 502 });
  }
}

export async function HEAD(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl || !isAllowedHost(imageUrl)) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const resp = await fetchWithTimeout(imageUrl, 5000);
    
    if (!resp.ok || !resp.headers.get("content-type")?.startsWith("image/")) {
      return new NextResponse(null, { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", resp.headers.get("content-type") || "image/jpeg");
    headers.set("Content-Length", resp.headers.get("content-length") || "0");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(null, { status: 200, headers });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
