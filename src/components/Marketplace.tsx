"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  gradient: string;
  badge?: string;
  cta?: string;
  highlights?: string[];
  tiers?: {
    name: string;
    description: string;
  }[];
}

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="marketplace">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="h-44 bg-white/5 animate-pulse" />
              <div className="p-6">
                <div className="shimmer h-5 w-24 rounded mb-3" />
                <div className="shimmer h-6 w-full rounded mb-2" />
                <div className="shimmer h-4 w-full rounded mb-4" />
                <div className="shimmer h-10 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="marketplace">
        <div className="glass-card p-12 text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Marketplace coming soon</h3>
          <p className="text-text-secondary">We are preparing our first product modules. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="marketplace">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`glass-card group overflow-hidden fade-in-up fade-in-up-delay-${
              index + 1
            } ${product.tiers ? "lg:col-span-2" : ""}`}
          >
            <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${product.gradient}`}>
              {product.image && product.image.trim() ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-white/60">
                  {product.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/40 to-transparent" />
            </div>

            <div className="p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="category-pill bg-primary/15 text-primary-light">
                  {product.category}
                </span>
                {product.badge ? (
                  <span className="category-pill border border-amber-300/30 bg-amber-300/10 text-amber-100">
                    {product.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary-light transition-colors duration-300">
                {product.title}
              </h3>

              <p
                className={`text-sm text-text-secondary leading-relaxed ${
                  product.tiers ? "mb-4" : "mb-5 line-clamp-3"
                }`}
              >
                {product.description}
              </p>

              {product.highlights ? (
                <ul className="mb-5 space-y-2">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-xs leading-relaxed text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded bg-primary-light" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {product.tiers ? (
                <div className="mb-5 grid gap-3 sm:grid-cols-3">
                  {product.tiers.map((tier) => (
                    <div key={tier.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                        {tier.name}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-text-secondary">{tier.description}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <Link
                href={`/marketplace/products/${product.id}`}
                className="block w-full rounded bg-gradient-to-r from-primary to-primary-dark py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:from-primary-light hover:to-primary active:scale-[0.98]"
              >
                {product.cta ?? "Get Access"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
