// ============================================
// BlockFrameLabs - Type Definitions
// ============================================

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
}

export interface Block {
  id?: string;
  type: "text" | "image" | "video" | "html" | "markdown" | "code";
  content: string;
  order: number;
  language?: string; // for code blocks
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  author: string;
  blocks: Block[];
  /** Backward compatibility: concatenated text of all text blocks (or plain text fallback) */
  content?: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  gradient: string;
}

export type TabId = "services" | "blogs" | "marketplace" | "videos";

export interface Tab {
  id: TabId;
  label: string;
}
