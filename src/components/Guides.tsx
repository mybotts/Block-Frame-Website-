"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

export default function Guides() {
  const [guides, setGuides] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuides() {
      try {
        const res = await fetch("/api/posts?category=guides");
        if (res.ok) {
          const data = await res.json();
          setGuides(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch guides:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGuides();
  }, []);

  const difficultyBadge = (index: number) => {
    const badges = ["Beginner", "Intermediate", "Advanced"];
    const colors = [
      "bg-emerald-500/20 text-emerald-400",
      "bg-amber-500/20 text-amber-400",
      "bg-red-500/20 text-red-400",
    ];
    return { label: badges[index % 3], color: colors[index % 3] };
  };

  // Generate a preview text: use excerpt if available, else first 150 chars of content
  const getPreview = (guide: BlogPost) => {
    if (guide.excerpt && guide.excerpt.trim().length > 0) return guide.excerpt;
    if (guide.content && guide.content.trim().length > 0) {
      return guide.content.trim().substring(0, 150) + (guide.content.length > 150 ? '...' : '');
    }
    return 'No preview available.';
  };

  if (loading) {
    return (
      <section id="guides">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="shimmer h-5 w-24 rounded-full mb-4" />
                <div className="shimmer h-6 w-full rounded mb-3" />
                <div className="shimmer h-4 w-full rounded mb-2" />
                <div className="shimmer h-4 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (guides.length === 0) {
    return (
      <section id="guides">
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Guides coming soon</h3>
          <p className="text-text-secondary">Our team is preparing comprehensive guides. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="guides">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => {
          const badge = difficultyBadge(index);
          return (
            <article
              key={guide.id}
              className={`glass-card group overflow-hidden fade-in-up fade-in-up-delay-${index + 1}`}
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

              <div className="p-6">
                {/* Category + Difficulty */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="category-pill bg-primary/15 text-primary-light">
                    {guide.category}
                  </span>
                  <span className={`category-pill ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
                  {guide.title}
                </h3>

                {/* Description/Preview */}
                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                  {getPreview(guide)}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/post/${guide.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary-light group-hover:text-accent transition-colors duration-300"
                >
                  Read Guide
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
