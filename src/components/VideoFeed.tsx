"use client";

import { useState } from "react";

export default function VideoFeed() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState<Array<{ id: string; url: string; platform: string }>>([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      setError("Please enter a video URL");
      return;
    }
    // Simple validation and platform detection
    let platform = "unknown";
    const url = videoUrl.trim();
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      platform = "youtube";
    } else if (url.includes("tiktok.com")) {
      platform = "tiktok";
    } else if (url.includes("instagram.com")) {
      platform = "instagram";
    } else {
      setError("Unsupported platform. Only YouTube, TikTok, Instagram URLs are allowed.");
      return;
    }
    const newVideo = {
      id: Date.now().toString(),
      url,
      platform,
    };
    setVideos(prev => [newVideo, ...prev]);
    setVideoUrl("");
    setError("");
  };

  // Function to get embed URL or iframe src based on platform
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
        <h2 className="text-3xl font-bold text-text-primary mb-6 text-center">
          Share & Watch Videos
        </h2>
        <p className="text-text-secondary mb-8 text-center">
          Paste a YouTube, TikTok, or Instagram video link to share it here.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste video URL..."
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 placeholder:text-text-muted"
          />
          <button
            type="submit"
            className="button-primary w-fit px-6 py-3 text-sm font-medium transition-all"
          >
            Share Video
          </button>
          {error && <p className="text-sm text-accent">{error}</p>}
        </form>

        {/* Videos Grid */}
        {videos.length === 0 ? (
          <p className="text-text-secondary text-center">
            No videos shared yet. Be the first to share a video above!
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
                        {new URL(video.url).hostname.replace("www.", "")}
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
                        {new URL(video.url).hostname.replace("www.", "")}
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