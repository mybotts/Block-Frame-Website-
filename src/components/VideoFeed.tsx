"use client";

import { useState, useEffect } from "react";

export default function VideoFeed() {
  const [videos, setVideos] = useState<Array<{ id: string; url: string; platform: string; title: string; excerpt: string }>>([]);
  const [error, setError] = useState("");

  const getPlatformFromUrl = (url: string): string => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("tiktok.com")) return "tiktok";
    if (url.includes("instagram.com")) return "instagram";
    return "unknown";
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/api/posts?category=videos&status=approved`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const cmsVideos: Array<{ id: string; url: string; platform: string; title: string; excerpt: string }> = data.posts
          .flatMap((post: any) =>
            post.blocks
              .filter((b: any) => b.type === "video")
              .map((b: any) => ({
                id: b.id || `${post.id}-${b.order}`,
                url: b.content,
                platform: getPlatformFromUrl(b.content),
                title: post.title,
                excerpt: post.excerpt || ""
              }))
          );
      setVideos(cmsVideos);
    } catch (err) {
      console.error("Failed to fetch CMS videos:", err);
      setError("Failed to load videos. Please try again later.");
    }
    };
    fetchVideos();
  }, []);

  const getEmbedSrc = (url: string, platform: string) => {
    if (platform === "youtube") {
      // Handle youtube.com/watch?v=ID
      const watchMatch = url.match(/v=([^&]+)/);
      if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
      // Handle youtube.com/shorts/ID
      const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      // Handle youtu.be/ID
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
    return url; // fallback
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
            {videos.map((video) => (
              <div key={video.id} className="glass-card overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all hover:border-white/20 hover:shadow-xl">
                {/* Video embed */}
                <div className="relative w-full aspect-video bg-black/50">
                  <iframe
                    src={getEmbedSrc(video.url, video.platform)}
                    title={video.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                  />
                </div>
                {/* Card body with title & subtitle */}
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}