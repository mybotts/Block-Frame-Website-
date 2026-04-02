"use client";

import { Block } from "@/lib/types";
import CodeBlock from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

    case "text":
    case "markdown":
    default:
      return (
        <div className="mb-6 prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={
              {
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
                  // If it's an anchor link (starts with #), use normal anchor to scroll within page
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
              }
            }
          >
            {content}
          </ReactMarkdown>
        </div>
      );
  }
}
