"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const update = () => {
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top;
      const articleHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of article has been scrolled past
      const scrolled = -articleTop;
      const total = articleHeight - windowHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    };

    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update(); // initial

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 h-full w-1 bg-white/5 z-50 pointer-events-none">
      <div
        className="h-full bg-accent transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
