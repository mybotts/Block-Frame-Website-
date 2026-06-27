import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import { services } from "@/lib/data";

type Props = {
  params: Promise<{ serviceId: string }>;
};

const serviceNotesMap: Record<string, string> = {
  "ai-systems": "AI systems and services for support, data, and operations.",
  "voice-agent": "24/7 voice AI that answers calls, qualifies callers, and books meetings.",
  "web-apps": "Full-stack web platforms and mobile apps, built to scale.",
  "managed-agent-services": "We run and maintain your systems. You get the results.",
  "social-media": "Content systems and posting infrastructure that runs itself.",
  "ugc-video-production": "UGC, explainers, and video ads. From script to publish.",
};

export async function generateStaticParams() {
  return services
    .filter(s => !s.image.includes("placeholder"))
    .map((service) => ({ serviceId: service.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceId } = await params;
  const service = services.find((s) => s.id === serviceId);
  if (!service) return {};

  const note = serviceNotesMap[service.id];
  const description = note
    ? `${note} BlockFrame Labs builds and deploys AI systems and services for teams that need practical automation.`
    : service.description;

  return {
    title: `${service.title} | BlockFrame Labs`,
    description,
    alternates: {
      canonical: `https://www.blockframe.cloud/services/${serviceId}`,
    },
    openGraph: {
      title: service.title,
      description,
      url: `https://www.blockframe.cloud/services/${serviceId}`,
      siteName: "BlockFrame Labs",
      images: [
        {
          url: `https://www.blockframe.cloud${service.image.startsWith("/") ? "" : "/"}${service.image}`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description,
      images: [`https://www.blockframe.cloud${service.image.startsWith("/") ? "" : "/"}${service.image}`],
    },
  };
}

function serviceSchema(service: typeof services[0], note: string | undefined) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: note || service.description,
    provider: {
      "@type": "Organization",
      name: "BlockFrame Labs",
      url: "https://www.blockframe.cloud",
      logo: {
        "@type": "ImageObject",
        url: "https://www.blockframe.cloud/images/logo.png",
      },
    },
    areaServed: "Worldwide",
    category: service.team,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: "Custom pricing based on your needs and scope. Book a call to get a precise quote.",
    },
  };
}

function breadcrumbSchema(serviceId: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.blockframe.cloud" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.blockframe.cloud/#services" },
      { "@type": "ListItem", position: 3, name: title, item: `https://www.blockframe.cloud/services/${serviceId}` },
    ],
  };
}

const callHref = "https://calendly.com/blockframemedia/30min";
const emailHref = "mailto:contact@blockframe.cloud?subject=Service%20inquiry%3A%20AI%20consultation";

export default async function ServicePage({ params }: Props) {
  const { serviceId } = await params;
  const service = services.find((s) => s.id === serviceId);

  if (!service || service.image.includes("placeholder")) notFound();

  const note = serviceNotesMap[service.id];
  const imageUrl = service.image.startsWith("http") ? service.image : `https://www.blockframe.cloud${service.image}`;

  // Build FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does deployment take?",
        acceptedAnswer: { "@type": "Answer", text: "Most systems are operational within 1 to 2 weeks. We map your workflow, build the solution, test it with real data, and hand it over ready to run." },
      },
      {
        "@type": "Question",
        name: "Do you provide ongoing support?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Most clients choose managed service where we run the system, monitor performance, and handle updates. You own the outcome, we handle the operations." },
      },
      {
        "@type": "Question",
        name: "What does pricing look like?",
        acceptedAnswer: { "@type": "Answer", text: "Pricing is tailored to your stack, volume, and complexity. Book a call where we scope your needs and give you a precise quote based on actual requirements." },
      },
      {
        "@type": "Question",
        name: "Can this integrate with our existing tools?",
        acceptedAnswer: { "@type": "Answer", text: "We build on top of your existing stack. Whether you use Notion, Slack, HubSpot, or custom infrastructure, we connect to what you already have." },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, note)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(serviceId, service.title)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <PremiumBackground />

      <main id="main-content" className="relative z-10 min-h-screen pt-36 pb-24 px-6 md:px-12">
        <div className="hero-radial-glow opacity-40 z-[-1]" />

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-primary-light transition-colors">Home</Link></li>
              <li>/</li>
              <li><a href="/#services" className="hover:text-primary-light transition-colors">Services</a></li>
              <li>/</li>
              <li className="text-text-secondary" aria-current="page">{service.title}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="category-pill bg-primary/15 text-primary-light mb-4">{service.team}</span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-6xl">{service.title}</h1>
              <p className="mt-6 text-lg leading-8 text-text-secondary">{note || service.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center bg-text-primary px-7 text-sm font-semibold text-background transition hover:opacity-85">
                  Book a Call
                </a>
                <a href={emailHref} className="inline-flex min-h-14 items-center justify-center border border-border px-7 text-sm font-semibold text-text-primary transition hover:bg-surface-light">
                  Start by Email
                </a>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-surface-light">
              <Image
                src={imageUrl}
                alt={service.title}
                fill
                className="object-cover opacity-90"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card-bg/70 via-transparent to-transparent" />
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-8">Frequently Asked Questions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-surface-light p-6">
                <h3 className="text-base font-semibold text-text-primary">How long does deployment take?</h3>
                <p className="mt-2 text-sm text-text-secondary">Most systems are operational within 1 to 2 weeks. We map your workflow, build the solution, test it with real data, and hand it over ready to run.</p>
              </div>
              <div className="bg-surface-light p-6">
                <h3 className="text-base font-semibold text-text-primary">Do you provide ongoing support?</h3>
                <p className="mt-2 text-sm text-text-secondary">Yes. Most clients choose managed service where we run the system, monitor performance, and handle updates. You own the outcome, we handle the operations.</p>
              </div>
              <div className="bg-surface-light p-6">
                <h3 className="text-base font-semibold text-text-primary">What does pricing look like?</h3>
                <p className="mt-2 text-sm text-text-secondary">Pricing is tailored to your stack, volume, and complexity. Book a call where we scope your needs and give you a precise quote based on actual requirements.</p>
              </div>
              <div className="bg-surface-light p-6">
                <h3 className="text-base font-semibold text-text-primary">Can this integrate with our existing tools?</h3>
                <p className="mt-2 text-sm text-text-secondary">We build on top of your existing stack. Whether you use Notion, Slack, HubSpot, or custom infrastructure, we connect to what you already have.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
