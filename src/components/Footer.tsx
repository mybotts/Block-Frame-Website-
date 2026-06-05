"use client";

import Image from "next/image";
import Link from "next/link";

const calendlyHref = "https://calendly.com/blockframemedia/30min";

const serviceLinks = [
  { label: "AI Agents", href: "/#services" },
  { label: "Web Engineering", href: "/#services" },
  { label: "Social Media", href: "/#services" },
  { label: "Video Production", href: "/#services" },
  { label: "Book a Call", href: calendlyHref, external: true },
];

const contentLinks = [
  { label: "Blogs", href: "/blogs" },
  { label: "Videos", href: "/videos" },
  { label: "Marketplace/Products", href: "/marketplace/products" },
  { label: "Guides", href: "/guides" },
  { label: "AI News", href: "/ai-news" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/blockframelabs" },
  { label: "TikTok", href: "https://www.tiktok.com/@blockframe_labs?_r=1&_t=ZN-96Et1Hif4j8" },
  { label: "YouTube", href: "https://youtube.com/@blockframelabs?si=Z2MnWDopzMohKjXd" },
  { label: "Instagram", href: "https://www.instagram.com/blockframelabs?igsh=MWtwYWQycHR3cXJlYw==" },
];

function FooterLink({ item }: { item: { label: string; href: string; external?: boolean } }) {
  if (item.href.startsWith("mailto:")) {
    return <a href={item.href} className="footer-link">{item.label}</a>;
  }
  if (item.external || item.href.startsWith("http")) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer-link">{item.label}</a>;
  }
  return <Link href={item.href} className="footer-link">{item.label}</Link>;
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#06070a] px-6 py-16 md:px-12">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div className="max-w-md">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white p-2">
              <Image src="/images/logo.png" alt="BlockFrame Labs" fill className="object-contain p-1" sizes="44px" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">BlockFrame Labs</span>
          </Link>
          <p className="mt-5 text-sm leading-6 text-text-secondary">
            We build AI systems and services, web platforms, and content systems for teams that need working infrastructure, not slide decks.
          </p>
          <a href={calendlyHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-primary-light">
            Book a Call
          </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="footer-heading">Services</h3>
            <div className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((item) => <FooterLink key={item.label} item={item} />)}
            </div>
          </div>
          <div>
            <h3 className="footer-heading">Resources</h3>
            <div className="mt-4 flex flex-col gap-3">
              {contentLinks.map((item) => <FooterLink key={item.label} item={item} />)}
            </div>
          </div>
          <div>
            <h3 className="footer-heading">Social</h3>
            <div className="mt-4 flex flex-col gap-3">
              {socialLinks.map((item) => <FooterLink key={item.label} item={item} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-text-muted md:flex-row md:items-center md:justify-between">
        <span>BlockFrame Labs</span>
        <span>&copy; {new Date().getFullYear()} All rights reserved</span>
      </div>
    </footer>
  );
}
