"use client";

import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import BlogsFeed from "@/components/BlogsFeed";
import Footer from "@/components/Footer";

export default function BlogsPage() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <PremiumBackground />

      <SmoothScroller>
        <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-40 pb-24 px-6 md:px-12 pointer-events-none">
          <div className="hero-radial-glow opacity-40 z-[-1]" />
          
          <div className="w-full max-w-6xl mx-auto pointer-events-auto">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-4">
                Blogs
              </h1>
              <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
                Explore our latest insights, guides, and updates from the AI frontier.
              </p>
            </div>

            {/* Blogs feed with filtering */}
            <BlogsFeed />
          </div>
        </main>
        <Footer />
      </SmoothScroller>
    </>
  );
}
