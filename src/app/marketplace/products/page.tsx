"use client";

import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Marketplace from "@/components/Marketplace";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function MarketplaceProductsPage() {
  return (
    <>
      <Navigation />
      <PremiumBackground />

      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-40 pb-24 px-6 md:px-12">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-4">
              <span className="text-gradient">Marketplace/Products</span>
            </h1>
            <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
              One productized growth workflow, customized to the tools and mailbox your business already uses.
            </p>
          </div>

          <Marketplace />
        </div>
      </main>
      <Footer />
    </>
  );
}
