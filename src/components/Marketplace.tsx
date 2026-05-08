"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  gradient: string;
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
                <div className="shimmer h-5 w-24 rounded-full mb-3" />
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
          <div className="text-4xl mb-4">🛒</div>
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
            className={`glass-card group overflow-hidden fade-in-up fade-in-up-delay-${index + 1}`}
          >
            {/* Product Image */}
            <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${product.gradient}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
              />
              {/* Price Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className="rounded-full bg-surface/90 backdrop-blur-sm border border-primary/30 px-3 py-1.5 text-sm font-bold text-primary-light shadow-lg">
                  {product.price}
                </span>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category */}
              <span className="category-pill bg-primary/15 text-primary-light mb-3">
                {product.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary-light transition-colors duration-300">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3">
                {product.description}
              </p>

              {/* CTA Button */}
              <button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:from-primary-light hover:to-primary active:scale-[0.98] cursor-pointer">
                Get Access
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
