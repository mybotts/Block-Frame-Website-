"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AINewsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to blogs with AI News filter
    router.push("/blogs?filter=ai-news");
  }, [router]);

  return null; // Temporary null while redirecting
}
