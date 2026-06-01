import { NextRequest, NextResponse } from 'next/server';

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const cache = new globalThis.Map<string, { title: string; expiresAt: number }>();

type RouteContext = { params: Promise<{ videoId: string }> };

async function getTitle(videoId: string) {
  const now = Date.now();
  const cached = cache.get(videoId);
  if (cached && cached.expiresAt > now) return cached.title;

  const url = new URL('https://www.youtube.com/oembed');
  url.searchParams.set('url', `https://www.youtube.com/watch?v=${videoId}`);
  url.searchParams.set('format', 'json');

  let title = '';
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = (await res.json()) as { title?: string };
      title = data.title ?? '';
    }
  } catch {
    title = '';
  }

  if (title) {
    cache.set(videoId, { title, expiresAt: now + CACHE_TTL_MS });
  }
  return title;
}

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('videoId');
  if (!videoId) {
    return NextResponse.json({ error: 'videoId is required' }, { status: 400 });
  }

  const title = await getTitle(videoId);
  return NextResponse.json({ title });
}

export const dynamic = 'force-dynamic';
