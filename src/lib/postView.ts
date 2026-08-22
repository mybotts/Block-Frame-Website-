// ============================================
// Blog view helpers shared by server components:
// thumbnails, previews, reading time.
// ============================================
import { BlogPost } from "./types";

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?&\s/]+)/,
    /youtu\.be\/([^?&\s/]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

/** First image or YouTube thumbnail found in the post's blocks. */
export function getPostThumbnail(post: BlogPost): string | undefined {
  if (!post.blocks || post.blocks.length === 0) return undefined;

  for (const block of post.blocks) {
    if (block.type === "image" && block.content && block.content.startsWith("http")) {
      return block.content;
    }
  }
  for (const block of post.blocks) {
    if (block.type === "video") {
      const videoId = extractYouTubeId(block.content);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
  }
  return undefined;
}

/** Excerpt if present, else the opening of the content. */
export function getPreview(post: BlogPost): string {
  if (post.excerpt && post.excerpt.trim().length > 0) return post.excerpt;
  if (post.content && post.content.trim().length > 0) {
    return post.content.trim().substring(0, 150) + (post.content.length > 150 ? "..." : "");
  }
  return "No preview available.";
}

/** Plain-text word count across text/markdown blocks. */
export function wordCount(post: BlogPost): number {
  const text =
    post.blocks
      ?.filter((b) => b.type === "text" || b.type === "markdown")
      .map((b) => b.content)
      .join(" ") ||
    post.content ||
    "";
  return text.split(/\s+/).filter(Boolean).length;
}

/** Rounded reading time in minutes (200 wpm), minimum 1. */
export function readingTimeMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 200));
}

/** Heading entries (## and ###) extracted from text blocks, for table of contents. */
export function getTableOfContents(
  post: BlogPost
): Array<{ level: 2 | 3; text: string; id: string }> {
  const toc: Array<{ level: 2 | 3; text: string; id: string }> = [];
  if (!post.blocks) return toc;
  for (const b of post.blocks) {
    if (b.type !== "text" && b.type !== "markdown") continue;
    for (const line of b.content.split("\n")) {
      const m = line.match(/^(##|###)\s+(.*)$/);
      if (m) {
        const level = m[1].length === 2 ? 2 : 3;
        const text = m[2].trim();
        const id = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
        if (id) toc.push({ level, text, id });
      }
    }
  }
  return toc;
}
