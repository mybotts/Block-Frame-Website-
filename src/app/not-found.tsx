"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <PremiumBackground />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="hero-radial-glow opacity-40" />

        <p className="section-kicker mb-6">404</p>
        <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-text-secondary">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-primary-light"
          >
            Back to Home
          </Link>
          <Link
            href="/#services"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition hover:border-primary/60"
          >
            View Services
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
