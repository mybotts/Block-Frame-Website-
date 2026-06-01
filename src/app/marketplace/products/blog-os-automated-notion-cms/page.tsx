"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  gradient: string;
  badge?: string;
  cta?: string;
  highlights?: string[];
  tiers?: { name: string; price: string; description: string }[];
};

type Tier = { name: string; price: string; description: string };

export default function BlogOsProductPage() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const slug = "blog-os-automated-notion-cms";

    async function load() {
      try {
        const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load product");
        const data = await res.json();
        const matched =
          (data.products || []).find((item: Product) => item.id.includes("blog-os")) ||
          (data.products || [])[0];
        setProduct(matched ?? null);
      } catch (error) {
        console.error("Failed to fetch product", error);
        setProduct(null);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-text-secondary">Product not found.</p>
        <Link href="/marketplace/products" className="nav-link mt-4 inline-flex">
          Back to Marketplace/Products
        </Link>
      </div>
    );
  }

  const emailHref =
    "mailto:contact@blockframe.cloud?subject=Blog%20OS%20-%20Automated%20Notion%20CMS%20Publishing&body=Hi%20BlockFrame%20Labs%2C%0A%0AI%27m%20interested%20in%20the%20Blog%20OS%20automated%20publishing%20system.%20Please%20send%20me%20the%20next%20steps.%0A%0ACompany%3A%0AWebsite%3A%0ACurrent%20CMS%2Fstack%3A%0ABest%20way%20to%20reach%20me%3A%0A";

  const docs = [
    {
      title: "What you are buying",
      body:
        "A managed blog operating system that turns research, drafting, approvals, and publishing into a repeatable pipeline running on top of Notion and your existing website stack.",
    },
    {
      title: "Why it matters",
      body:
        "Most blogs die from inconsistent publishing, missing editorial structure, and too much manual coordination. This system makes content production systematic instead of heroic.",
    },
    {
      title: "How we adapt it",
      body:
        "Your Blog OS is configured for your niche, brand voice, website stack, internal approvals, and metrics. Whether you use Next.js, WordPress, or another CMS, we map Notion as the editorial control plane.",
    },
    {
      title: "Safety built in",
      body:
        "Every post passes through distinct stages: idea, brief, draft, review, approved, scheduled, published. Duplicate-topic checks and scheduling controls prevent accidental overlap.",
    },
  ];

  const implementationSteps = [
    "Map your topics, audience, website stack, CMS constraints, SEO priorities, and current publishing rhythm.",
    "Build the Notion editorial schema, agent prompts, research checks, drafting templates, and approval rules.",
    "Implement the publish hook from Notion to your website, including metadata, slugs, redirects, and error handling.",
    "Launch an initial content program, review output quality, then handoff runbooks, role assignments, and operational cadence.",
  ];

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/marketplace/products" className="nav-link inline-flex">
          Back to Marketplace/Products
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="category-pill bg-primary/15 text-primary-light">{product.category}</span>
              {product.badge ? (
                <span className="category-pill border border-amber-300/30 bg-amber-300/10 text-amber-100">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              {product.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">{product.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={emailHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-primary-light"
              >
                Start by Email
              </a>
              <a
                href="https://calendly.com/blockframemedia/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
              >
                Book a Call
              </a>
            </div>

            <p className="mt-4 text-sm text-text-secondary">
              Use this as a sellable system for clients who want consistent blog publishing without hiring in-house editors.
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              Pricing starts at the listed tier and scales with sites, authors, languages, and distribution breadth.
            </p>
          </div>

          <div className="glass-card overflow-hidden">
            <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.gradient}`}>
              <Image src={product.image} alt={product.title} fill className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
              <div className="absolute right-5 top-5 rounded-full bg-surface/90 px-4 py-2 text-sm font-bold text-primary-light">
                {product.price}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {docs.map((item) => (
            <article key={item.title} className="glass-card p-6">
              <h2 className="text-xl font-semibold text-text-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-text-primary">Pricing tiers</h2>
            <div className="mt-5 grid gap-3">
              {(product.tiers ?? []).map((tier) => (
                <div key={tier.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-semibold text-white">{tier.name}</h3>
                    <span className="text-sm font-semibold text-primary-light">{tier.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-text-primary">Implementation outline</h2>
            <ol className="mt-5 space-y-4">
              {implementationSteps.map((step, index) => (
                <li key={step} className="flex gap-4 text-sm leading-7 text-text-secondary">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary-light">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-12 glass-card p-6 text-center md:p-10">
          <h2 className="text-2xl font-semibold text-text-primary">Ready to see if it fits your business?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
            Tell us your website stack, publishing goals, number of authors, whether you want the blueprint, build sprint,
            or managed operation. We will respond with a concrete recommendation.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={emailHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-primary-light"
            >
              Contact BlockFrame Labs
            </a>
            <a
              href="https://www.instagram.com/blockframemedia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
            >
              Message on Instagram
            </a>
            <a
              href="https://x.com/blockframemedia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
            >
              Message on X
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
