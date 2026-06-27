import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import BlogsFeed from "@/components/BlogsFeed";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.",
  alternates: {
    canonical: "https://www.blockframe.cloud/blogs",
  },
  openGraph: {
    title: "Blogs | BlockFrame Labs",
    description:
      "Practical guides and news on AI systems, automation, and web engineering. Written by the team building these systems daily.",
    url: "https://www.blockframe.cloud/blogs",
    siteName: "BlockFrame Labs",
    images: [
      {
        url: "https://www.blockframe.cloud/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "BlockFrame Labs Blog — AI Systems, Automation & Web Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | BlockFrame Labs",
    description:
      "Practical guides and news on AI systems, automation, and web engineering.",
    images: ["https://www.blockframe.cloud/images/og-preview.png"],
  },
  keywords: [
    "AI automation blog",
    "AI systems guide",
    "web engineering",
    "AI agents",
    "Notion CMS automation",
    "content automation",
  ],
};

export default function BlogsPage() {
  return (
    <>
      <Navigation />
      <PremiumBackground />

      <main id="main-content" className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-40 pb-24 px-6 md:px-12">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary leading-tight mb-4">
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
