import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BlockFrame Labs | Architecting Autonomy",
  description: "High-performance web engineering and autonomous AI agent systems at the intelligent edge.",
  keywords: ["AI Agents", "Web Engineering", "Blockchain", "OpenClaw", "Next.js", "Agency"],
  authors: [{ name: "BlockFrame Labs" }],
  openGraph: {
    title: "BlockFrame Labs | Architecting Autonomy",
    description: "Engineering the next generation of intelligent, decentralized digital ecosystems.",
    url: "https://blockframe.cloud",
    siteName: "BlockFrame Labs",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "BlockFrame Labs - Advanced AI Engineering"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockFrame Labs | Architecting Autonomy",
    description: "High-performance systems at the intelligent edge.",
    images: ["/images/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased text-white bg-[#050507]`}>
        {children}
      </body>
    </html>
  );
}
