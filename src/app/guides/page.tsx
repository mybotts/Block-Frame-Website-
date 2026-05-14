"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GuidesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to blogs with Guides filter
    router.push("/blogs?filter=guides");
  }, [router]);

  return null; // Temporary null while redirecting
}
