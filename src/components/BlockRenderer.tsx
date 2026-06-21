"use client";

import { Block } from "@/lib/types";
import CodeBlock from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ThumbnailPlayer from "./ThumbnailPlayer";
import { useMemo } from "react";

function extractYouTubeId(url: string): string | null {
  const patterns = [/youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?&\s\/]+)/, /youtu\.be\/([^?&\s\/]+)/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface BlockRendererProps {
  block: Block;
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  const { type, content, language } = block;

  switch (type) {
    case "code":
      return <CodeBlock code={content} language={language} />;

    case "image":
      if (!content || !content.startsWith("http")) return null;
      return (
        <div className="my-6">
          <img
            src={content}
            alt=""
            className="w-full rounded border border-white/10"
          />
        </div>
      );

    case "video": {
      const thumbnailSrc = useMemo(() => {
        if (!content) return null;
        try {
          const videoId = extractYouTubeId(content);
          if (!videoId) return null;
          return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch {
          return null;
        }
      }, [content]);

      const videoId = useMemo(() => content ? extractYouTubeId(content) : null, [content]);

      if (!thumbnailSrc || !videoId) return null;

      return (
        <div className="my-6 w-full">
          <ThumbnailPlayer src={thumbnailSrc} embedSrc={`https://www.youtube-nocookie.com/embed/${videoId}`} />
        </div>
      );
    }

    case "bookmark": {
      const data = JSON.parse(content);
      return (
        <div className="my-6">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded bg-white/5 border border-white/10 text-accent hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-sm font-medium">{data.caption || data.url}</span>
          </a>
        </div>
      );
    }

    case "text":
    case "markdown":
    default:
      return (
        <div className="mb-6 prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-\w+/.exec(className || "");
                const codeLang = match ? match[0].replace("language-", "") : undefined;
                const codeString = String(children).replace(/\n$/, "");
                const isInline = !match;
                if (isInline) {
                  return (
                    <code className="bg-white/5 px-1 py-0.5 rounded text-sm text-primary-light border border-white/10" {...props}>
                      {children}
                    </code>
                  );
                }
                return <CodeBlock code={codeString} language={codeLang} />;
              },
              h1: ({ children }) => {
                const id = slugify(String(children));
                return (
                  <h1 id={id} className="text-4xl md:text-5xl font-bold text-white mb-6 mt-10 leading-tight">
                    {children}
                  </h1>
                );
              },
              h2: ({ children }) => {
                const id = slugify(String(children));
                return (
                  <h2 id={id} className="text-3xl md:text-4xl font-bold text-white mb-5 mt-8 leading-tight">
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const id = slugify(String(children));
                return (
                  <h3 id={id} className="text-2xl md:text-3xl font-bold text-white mb-4 mt-6 leading-tight">
                    {children}
                  </h3>
                );
              },
              h4: ({ children }) => {
                const id = slugify(String(children));
                return (
                  <h4 id={id} className="text-xl md:text-2xl font-bold text-white mb-3 mt-5 leading-tight">
                    {children}
                  </h4>
                );
              },
              p: ({ children }) => <p className="mb-6 leading-relaxed text-text-secondary">{children}</p>,
              ul: ({ children }) => <ul className="mb-6 pl-6 list-disc text-text-secondary">{children}</ul>,
              ol: ({ children }) => <ol className="mb-6 pl-6 list-decimal text-text-secondary">{children}</ol>,
              li: ({ children }) => <li className="mb-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-accent pl-4 py-1 my-6 italic text-text-secondary">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => {
                // Render YouTube links as embedded video players
                if (href) {
                  const videoId = extractYouTubeId(href);
                  if (videoId) {
                    const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    return (
                      <div className="my-6 w-full">
                        <ThumbnailPlayer
                          src={thumb}
                          embedSrc={`https://www.youtube-nocookie.com/embed/${videoId}`}
                        />
                      </div>
                    );
                  }
                }
                // Normal links
                const isAnchor = href && href.startsWith('#');
                return (
                  <a
                    href={href}
                    className="text-accent hover:text-primary-light underline"
                    target={isAnchor ? undefined : "_blank"}
                    rel={isAnchor ? undefined : "noopener noreferrer"}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
  }
}
