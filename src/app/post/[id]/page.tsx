import { notFound, redirect } from "next/navigation";
import { getApprovedPosts } from "@/lib/blogData";
import { looksLikeUuid, postPath } from "@/lib/slug";

// Legacy post URLs: /post/<notion-uuid> → /blog/<slug>
// Kept as a permanent redirector so every link ever shared keeps working.
export default async function LegacyPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (looksLikeUuid(id)) {
    const posts = await getApprovedPosts();
    const target = posts.find((p) => p.id === id);
    if (target) {
      redirect(postPath(target.title, target.id));
    }
  }

  notFound();
}
