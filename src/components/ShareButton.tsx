"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";

type SharePlatform = "twitter" | "linkedin" | "facebook" | "copy";

interface SharePlatformConfig {
  name: string;
  icon: ReactNode;
  shareUrl: (( fullUrl: string, title: string, description: string) => string) | null;
  color: string;
  hoverColor: string;
}

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
  variant?: "default" | "compact" | "card";
}

function TwitterIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.11z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}

function getPlatformConfigs(): Record<SharePlatform, SharePlatformConfig> {
  return {
    twitter: {
      name: "X (Twitter)",
      icon: <TwitterIcon />,
      shareUrl: (fullUrl, title) =>
        "https://twitter.com/intent/tweet?url=" + encodeURIComponent(fullUrl) + "&text=" + encodeURIComponent(title),
      color: "bg-black text-white",
      hoverColor: "hover:bg-gray-800",
    },
    linkedin: {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      shareUrl: (fullUrl, title, description) =>
        "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(fullUrl) + "&title=" + encodeURIComponent(title) + "&summary=" + encodeURIComponent(description),
      color: "bg-[#0A66C2] text-white",
      hoverColor: "hover:bg-[#004182]",
    },
    facebook: {
      name: "Facebook",
      icon: <FacebookIcon />,
      shareUrl: (fullUrl, title) =>
        "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(fullUrl) + "&quote=" + encodeURIComponent(title),
      color: "bg-[#1877F2] text-white",
      hoverColor: "hover:bg-[#0D65D9]",
    },
    copy: {
      name: "Copy Link",
      icon: <CopyIcon />,
      shareUrl: null,
      color: "bg-surface border border-border text-text-primary",
      hoverColor: "hover:bg-surface-light",
    },
  };
}

export default function ShareButton({
  url,
  title,
  description = "",
  image,
  className = "",
  variant = "default",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"share" | "preview">("share");
  const popoverRef = useRef<HTMLDivElement>(null);

  const configs = getPlatformConfigs();
  const fullUrl = url.startsWith("http") ? url : "https://www.blockframe.cloud" + url;

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = fullUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [fullUrl]);

  const handleShare = useCallback(
    (platform: SharePlatform) => {
      if (platform === "copy") {
        handleCopy();
        return;
      }
      const config = configs[platform];
      if (config.shareUrl) {
        const shareUrl = config.shareUrl(fullUrl, title, description);
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
      }
    },
    [fullUrl, title, description, handleCopy, configs]
  );

  const buttonStyles: Record<string, string> = {
    default:
      "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium border border-border bg-card-bg text-text-primary transition hover:border-primary-light hover:text-primary-light",
    compact:
      "inline-flex items-center justify-center rounded p-2 text-text-secondary transition hover:bg-surface hover:text-text-primary",
    card: "inline-flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium text-text-secondary transition hover:bg-surface hover:text-text-primary",
  };

  return (
    <div className={"relative inline-block " + className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonStyles[variant]}
        aria-label="Share"
        aria-expanded={isOpen}
      >
        <ShareIcon />
        {variant === "default" && <span>Share</span>}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 top-full z-50 mt-2 w-80 border border-border bg-card-bg shadow-xl shadow-black/20 md:w-96"
          style={{ borderRadius: "2px" }}
        >
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("share")}
              className={
                "flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition " +
                (activeTab === "share"
                  ? "border-b-2 border-primary text-text-primary"
                  : "text-text-muted hover:text-text-secondary")
              }
            >
              Share
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={
                "flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition " +
                (activeTab === "preview"
                  ? "border-b-2 border-primary text-text-primary"
                  : "text-text-muted hover:text-text-secondary")
              }
            >
              Preview
            </button>
          </div>

          {activeTab === "share" ? (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(configs) as SharePlatform[]).map((key) => {
                  const platform = configs[key];
                  return (
                    <button
                      key={key}
                      onClick={() => handleShare(key)}
                      className={
                        "flex items-center gap-2 rounded px-3 py-2.5 text-sm font-medium transition " +
                        platform.color + " " + platform.hoverColor
                      }
                    >
                      {platform.icon}
                      <span className="truncate">
                        {key === "copy" ? (copied ? "Copied!" : "Copy Link") : platform.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <SocialCard
                platform="twitter"
                title={title}
                description={description}
                image={image}
                url={fullUrl}
              />
              <SocialCard
                platform="linkedin"
                title={title}
                description={description}
                image={image}
                url={fullUrl}
              />
              <SocialCard
                platform="facebook"
                title={title}
                description={description}
                image={image}
                url={fullUrl}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SocialCard({
  platform,
  title,
  description,
  image,
  url,
}: {
  platform: "twitter" | "linkedin" | "facebook";
  title: string;
  description: string;
  image?: string;
  url: string;
}) {
  let domain = "blockframe.cloud";
  try {
    domain = new URL(url).hostname;
  } catch {
    // fallback
  }

  if (platform === "twitter") {
    return (
      <div className="border border-border bg-background">
        {image && (
          <div className="relative h-36 w-full bg-surface">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-3">
          <p className="text-xs text-text-muted uppercase">{domain}</p>
          <p className="mt-1 text-sm font-semibold text-text-primary line-clamp-1">{title}</p>
          {description && (
            <p className="mt-0.5 text-xs text-text-secondary line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    );
  }

  if (platform === "linkedin") {
    return (
      <div className="border border-border bg-background">
        {image && (
          <div className="relative h-36 w-full bg-surface">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-3">
          <p className="text-xs text-text-muted uppercase">{domain}</p>
          <p className="mt-1 text-sm font-semibold text-text-primary line-clamp-2">{title}</p>
          {description && (
            <p className="mt-0.5 text-xs text-text-secondary line-clamp-2">{description}</p>
          )}
        </div>
        <div className="border-t border-border px-3 py-2">
          <p className="text-xs text-text-muted">{/* LinkedIn preview */}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-background">
      <div className="p-3 pb-0">
        <p className="text-xs text-text-muted">facebook</p>
      </div>
      {image && (
        <div className="relative mt-2 h-36 w-full bg-surface">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-3">
        <p className="text-xs text-text-muted uppercase">{domain}</p>
        <p className="mt-1 text-sm font-semibold text-text-primary line-clamp-2">{title}</p>
        {description && (
          <p className="mt-0.5 text-xs text-text-secondary line-clamp-3">{description}</p>
        )}
      </div>
    </div>
  );
}
