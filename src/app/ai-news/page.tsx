import { redirect } from "next/navigation";

export default function AINewsPage() {
  redirect("/blogs?filter=ai-news");
}
