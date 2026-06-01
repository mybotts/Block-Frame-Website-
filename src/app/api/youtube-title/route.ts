import { NextRequest, NextResponse } from "next/server";

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // Be strict: only allow YouTube URLs on this endpoint
  const isYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(url);
  if (!isYouTube) {
    return NextResponse.json({ error: "Unsupported URL" }, { status: 400 });
  }

  try {
    const oembedUrl = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const res = await fetch(oembedUrl, {
      headers: { "User-Agent": "BlockframeLabs/1.0" },
      // Optional: short timeout keeps the video page fast
      // next: { revalidate: CACHE_TTL_SECONDS },
    });

    // YouTube oEmbed can 404 for region-blocked/unavailable videos
    if (!res.ok) {
      return NextResponse.json({ error: "oembed_failed", status: res.status }, { status: 502 });
    }

    const data = await res.json();
    const title = typeof data?.title === "string" && data.title.trim() ? data.title.trim() : "";

    return NextResponse.json(
      { title },
      {
        status: 200,
        headers: {
          "Cache-Control": `s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=3600`,
        },
      }
    );
  } catch (error: any) {
    console.error("Failed to fetch YouTube title:", error);
    return NextResponse.json({ error: "fetch_failed", details: error.message }, { status: 502 });
  }
}
