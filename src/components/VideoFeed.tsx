"use client";

import { useState, useEffect } from "react";
import ThumbnailPlayer from "@/components/ThumbnailPlayer";

export default function VideoFeed() {
  const [videos, setVideos] = useState<Array<{ id: string; url: string; platform: string; title: string; excerpt: string }>>([]);
  const [error, setError] = useState("");

  const getPlatformFromUrl = (url: string): string => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("tiktok.com")) return "tiktok";
    if (url.includes("instagram.com")) return "instagram";
    return "unknown";
  };

  const resolveYouTubeTitle = async (url: string, platform: string): Promise<string> => {
    if (platform !== "youtube") return "";
    try {
      const watchMatch = url.match(/[?&]v=([^&]+)/);
      const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      const videoId = watchMatch?.[1] || shortsMatch?.[1] || shortMatch?.[1];
      if (!videoId) return "";
      const res = await fetch(`/api/youtube-title?videoId=${encodeURIComponent(videoId)}`);
      if (!res.ok) return "";
      const data = await res.json();
      return typeof data?.title === "string" && data.title.trim() ? data.title.trim() : "";
    } catch {
      return "";
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/api/posts?category=videos&status=approved`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const raw: Array<{ id: string; url: string; platform: string; cmsTitle: string; excerpt: string }> = data.posts
          .flatMap((post: any) =>
            post.blocks
              .filter((b: any) => b.type === "video")
              .map((b: any) => ({
                id: b.id || `${post.id}-${b.order}`,
                url: b.content,
                platform: getPlatformFromUrl(b.content),
                cmsTitle: post.title,
                excerpt: post.excerpt || "",
              }))
          );

        const enriched: Array<{ id: string; url: string; platform: string; title: string; excerpt: string }> = await Promise.all(
          raw.map(async (item) => ({
            id: item.id,
            url: item.url,
            platform: item.platform,
            excerpt: item.excerpt,
            title: item.platform === "youtube" ? await resolveYouTubeTitle(item.url, item.platform) : item.cmsTitle,
          }))
        );

        setVideos(enriched);
      } catch (err) {
        console.error("Failed to fetch CMS videos:", err);
        setError("Failed to load videos. Please try again later.");
      }
    };

    fetchVideos();
  }, []);

  const getThumbnailSrc = (url: string, platform: string): string | null => {
    if (platform === "youtube") {
      const watchMatch = url.match(/v=([^&]+)/);
      const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      const videoId = watchMatch?.[1] || shortsMatch?.[1] || shortMatch?.[1];
      if (!videoId) return null;
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return null;
  };

  const getEmbedSrc = (url: string, platform: string) => {
    if (platform === "youtube") {
      const watchMatch = url.match(/v=([^&]+)/);
      if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
      const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }
    if (platform === "tiktok") {
      const match = url.match(/video\/(\d+)/);
      if (match) return `https://www.tiktok.com/embed/video/${match[1]}`;
    }
    if (platform === "instagram") {
      const match = url.match(/instagram\.com\/p\/([^?/]+)/);
      if (match) return `https://www.instagram.com/p/${match[1]}/embed/`;
    }
    return url;
  };

  return (
    <section id="videos">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Videos Grid */}
        {videos.length === 0 ? error ? (
          <p className="text-text-accent text-center">{error}</p>
        ) : (
          <p className="text-text-secondary text-center">
            No videos shared yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => {
              const thumbnail = getThumbnailSrc(video.url, video.platform);
              const embedSrc = getEmbedSrc(video.url, video.platform);
              return (
                <div key={video.id} className="glass-card overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all hover:border-white/20 hover:shadow-xl">
                  {thumbnail ? (
                    <ThumbnailPlayer src={thumbnail} embedSrc={embedSrc} />
                  ) : (
                    <div className="relative w-full aspect-video bg-black/50">
                      <iframe
                        src={embedSrc}
                        title={video.title}
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-3">
                    <p className="text-text-primary font-semibold text-sm mb-1 line-clamp-2">
                      {video.title}
                    </p>
                    {video.excerpt && (
                      <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
                        {video.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
