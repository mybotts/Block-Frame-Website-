import { MetadataRoute } from "next";
import { queryPosts, notionPageToBlogPost } from "@/lib/notionClient";
import { samplePosts } from "@/lib/data";
import { services } from "@/lib/data";
import { marketplaceProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.blockframe.cloud";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blogs",
    "/videos",
    "/marketplace/products",
    "/ai-news",
    "/guides",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency:
      route === ""
        ? ("daily" as const)
        : route === "/blogs" || route === "/ai-news"
          ? ("daily" as const)
          : ("weekly" as const),
    priority:
      route === ""
        ? 1.0
        : route === "/blogs" || route === "/ai-news"
          ? 0.8
          : 0.7,
  }));

  // Fetch live posts from Notion
  let notionPosts: MetadataRoute.Sitemap = [];
  try {
    const approvedFilter = {
      property: "Status",
      select: { equals: "approved" },
    };
    const rawPages = await queryPosts(approvedFilter);
    notionPosts = rawPages.map((page) => {
      const post = notionPageToBlogPost(page);
      return {
        url: `${baseUrl}/post/${post.id}`,
        lastModified: new Date(post.date).toISOString().split("T")[0],
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("Failed to fetch Notion posts for sitemap:", error);
  }

  // Fallback sample posts (only if Notion fetch failed)
  const sampleRoutes: MetadataRoute.Sitemap =
    notionPosts.length === 0
      ? samplePosts
          .filter((post) => post.status === "approved")
          .map((post) => ({
            url: `${baseUrl}/post/${post.id}`,
            lastModified: new Date(post.date).toISOString().split("T")[0],
            changeFrequency: "monthly" as const,
            priority: 0.6,
          }))
      : [];

  // Marketplace product routes
  const productRoutes: MetadataRoute.Sitemap = marketplaceProducts.map(
    (product) => ({
      url: `${baseUrl}/marketplace/products/${product.id}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })
  );

  return [...staticRoutes, ...notionPosts, ...sampleRoutes, ...productRoutes];
}
