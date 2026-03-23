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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "AI News" | "Guides";
  categorySlug: "ai-news" | "guides";
  date: string;
  status: "pending" | "approved" | "rejected";
  author: string;
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

export type TabId = "services" | "ai-news" | "guides" | "marketplace";

export interface Tab {
  id: TabId;
  label: string;
}
