"use client";

import { useState } from "react";

export default function ThumbnailPlayer({ src, embedSrc }: { src: string; embedSrc: string }) {
  const [playing, setPlaying] = useState(false);

  if (!src || !embedSrc) return null;

  if (playing) {
    return (
      <div className="my-6 aspect-video w-full">
        <iframe
          src={embedSrc}
          className="w-full h-full rounded border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="my-6 w-full text-left"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded ">
        <img
          src={src}
          alt="Play video"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="flex h-16 w-16 items-center justify-center rounded bg-white/90">
            <svg viewBox="0 0 24 24" className="h-8 w-8 pl-1 text-black">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
