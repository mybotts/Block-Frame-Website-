"use client";

import { Block } from "@/lib/types";

interface BlockRendererProps {
  block: Block;
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  const { type, content } = block;

  switch (type) {
    case "text":
    case "markdown":
      // For markdown, we'd ideally use a parser; for now, preserve newlines
      return (
        <div className="mb-6 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      );

    case "image":
      return (
        <div className="my-6">
          <img
            src={content}
            alt=""
            className="w-full rounded-xl border border-white/10"
          />
        </div>
      );

    case "video":
      // Expect embed URL (YouTube, Vimeo, etc.)
      return (
        <div className="my-6 aspect-video w-full">
          <iframe
            src={content}
            className="w-full h-full rounded-xl border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      );

    case "html":
      return (
        <div
          className="my-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );

    default:
      return (
        <div className="my-6 p-4 border border-dashed border-white/20 rounded">
          Unsupported block type: {type}
        </div>
      );
  }
}
