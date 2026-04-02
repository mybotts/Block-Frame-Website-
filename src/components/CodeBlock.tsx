"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Simple HTML escape
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const escapedCode = escapeHtml(code);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [code]);

  // Optional: attempt basic syntax highlighting via Prism if available globally
  useEffect(() => {
    // Dynamically load Prism if not present
    if (typeof window !== "undefined") {
      const highlight = () => {
        if ((window as any).Prism) {
          const el = preRef.current;
          if (el) {
            const codeEl = el.querySelector("code");
            if (codeEl) {
              ;(window as any).Prism.highlightElement(codeEl);
            }
          }
        }
      };
      if (!document.getElementById("prism-css")) {
        const link = document.createElement("link");
        link.id = "prism-css";
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
        document.head.appendChild(link);
      }
      if (!document.getElementById("prism-js")) {
        const script = document.createElement("script");
        script.id = "prism-js";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
        script.async = true;
        script.onload = () => {
          // Load language if specified and not core
          if (language && !(window as any).Prism.languages[language]) {
            const langScript = document.createElement("script");
            langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${language}.min.js`;
            document.head.appendChild(langScript);
            langScript.onload = highlight;
          } else {
            highlight();
          }
        };
        document.head.appendChild(script);
      } else {
        // Prism already loaded
        if (language && !(window as any).Prism.languages[language]) {
          const langScript = document.createElement("script");
          langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${language}.min.js`;
          document.head.appendChild(langScript);
          langScript.onload = highlight;
        } else {
          highlight();
        }
      }
    }
  }, [language, code]);

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[#0d0d12] border border-white/10 my-6">
      {/* Language badge and Copy button */}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {language && (
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-white/5 text-text-muted border border-white/10">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-text-muted hover:text-white hover:bg-white/10 transition-all"
          aria-label="Copy code to clipboard"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>

      <pre
        ref={preRef}
        className="p-4 overflow-x-auto text-sm leading-relaxed pt-12"
      >
        <code className={`language-${language || "text"}`}>
          {escapedCode}
        </code>
      </pre>
    </div>
  );
}
