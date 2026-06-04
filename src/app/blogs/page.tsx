"use client";

import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import BlogsFeed from "@/components/BlogsFeed";
import Footer from "@/components/Footer";

export default function BlogsPage() {
  return (
    <>
      <Navigation />
      <PremiumBackground />

      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-40 pb-24 px-6 md:px-12">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-4">
              Blogs
            </h1>
            <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
              Practical guides and news on AI agents, automation, and web engineering. Written by the team building these systems daily.
            </p>
          </div>

          <BlogsFeed />
        </div>
      </main>
      <Footer />
    </>
  );
}
