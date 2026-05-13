"use client";

import { useState, useEffect } from "react";

export default function VideoFeed() {
  const [videos, setVideos] = useState<Array<{ id: string; url: string; platform: string; title: string }>>([]);
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
        const cmsVideos: Array<{ id: string; url: string; platform: string; title: string }> = data.posts
          .flatMap((post: any) =>
            post.blocks
              .filter((b: any) => b.type === "video")
              .map((b: any) => ({
                id: b.id || `${post.id}-${b.order}`,
                url: b.content,
                platform: getPlatformFromUrl(b.content),
                title: post.title
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
      // Convert youtube.com/watch?v=ID or youtu.be/ID to embed URL
      const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (platform === "tiktok") {
      // TikTok embed: https://www.tiktok.com/@username/video/ID -> embed via https://www.tiktok.com/embed/video/ID
      const match = url.match(/video\/(\d+)/);
      if (match) return `https://www.tiktok.com/embed/video/${match[1]}`;
    }
    if (platform === "instagram") {
      // Instagram embed: https://www.instagram.com/p/ID/ -> embed via https://www.instagram.com/p/ID/embed
      const match = url.match(/instagram\.com\/p\/([^\/]+)/);
      if (match) return `https://www.instagram.com/p/${match[1]}/embed/`;
    }
    return url; // fallback
  };

  return (
    <section id="videos">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Videos Grid */}
        {videos.length === 0 ? error ? (
          <p className="text-text-accent text-center">{error}</p>
        ) : (
          <p className="text-text-secondary text-center">
            No videos shared yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6">
            {/* For desktop: 2 columns, for larger screens: 3 columns */}
            <div className="hidden md:block">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="glass-card overflow-hidden">
                    <div className="relative w-full h-0 pt-[56.25%]"> {/* 16:9 */}
                      <iframe
                        src={getEmbedSrc(video.url, video.platform)}
                        title="Shared video"
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-text-secondary text-xs truncate">
                        {video.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: single column */}
            <div className="block md:hidden">
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="glass-card overflow-hidden">
                    <div className="relative w-full h-0 pt-[56.25%]">
                      <iframe
                        src={getEmbedSrc(video.url, video.platform)}
                        title="Shared video"
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-text-secondary text-xs truncate">
                        {video.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}