// ============================================
// Block[] → markdown serializer
// Used by /blog/[slug].md mirrors and the llms.txt manifest.
// ============================================
import { Block, BlogPost } from "./types";
import { CONTENT_TEAM_NAME, postSlug } from "./slug";

function blockToMarkdown(block: Block): string {
  switch (block.type) {
    case "text":
    case "markdown":
      return block.content;
    case "code":
      return "```" + (block.language || "") + "\n" + block.content + "\n```";
    case "image":
      return `![image](${block.content})`;
    case "video": {
      const yt = block.content.match(
        /youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([^?&\s/]+)|youtu\.be\/([^?&\s/]+)/
      );
      const id = yt ? yt[1] || yt[2] : null;
      if (!id) return `[video](${block.content})`;
      return `[![video](https://img.youtube.com/vi/${id}/hqdefault.jpg)](https://www.youtube.com/watch?v=${id})`;
    }
    case "bookmark":
      try {
        const data = JSON.parse(block.content);
        return `[${data.caption || data.url}](${data.url})`;
      } catch {
        return block.content;
      }
    default:
      return "";
  }
}

/** Full markdown document for a post, with front matter. */
export function postToMarkdown(post: BlogPost): string {
  const body = post.blocks
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(blockToMarkdown)
    .filter(Boolean)
    .join("\n\n");

  const front = [
    "---",
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `description: "${(post.excerpt || "").replace(/"/g, '\\"')}"`,
    `date: ${post.date}`,
    `category: ${post.category}`,
    `author: ${CONTENT_TEAM_NAME}`,
    `canonical: https://www.blockframe.cloud/blog/${postSlug(post.title, post.id)}`,
    "---",
  ].join("\n");

  return `${front}\n\n# ${post.title}\n\n${body}\n`;
}

