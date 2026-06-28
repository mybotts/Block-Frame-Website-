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

const serviceFAQs: Record<string, { q: string; a: string }[]> = {
  "ai-systems": [
    { q: "What kinds of tasks can an AI system actually handle reliably?", a: "Repetitive, rule-based tasks with clear inputs and outputs: customer support triage, data entry and validation, report generation, lead qualification, and scheduling. If a human does it the same way 80% of the time, it can likely be automated." },
    { q: "How do you prevent the system from making mistakes at scale?", a: "Every system has guardrails: confidence thresholds (low-confidence responses get escalated), daily caps on automated actions, human-in-the-loop checkpoints for high-stakes decisions, and audit logs so you can see exactly what happened and why." },
    { q: "Do you provide ongoing support?", a: "Yes. Most clients choose managed service where we run the system, monitor performance, and handle updates. You own the outcome, we handle the operations." },
    { q: "Can this integrate with our existing tools?", a: "We build on top of your existing stack. Whether you use Notion, Slack, HubSpot, Salesforce, or custom infrastructure, we connect to what you already have." },
  ],
  "voice-agent": [
    { q: "What happens when a caller asks something outside the agent's knowledge?", a: "The agent recognizes when it doesn't have a confident answer and gracefully redirects. It can offer to take a message, transfer to a human, or log the question for a callback. It never guesses or makes up information." },
    { q: "Can it handle different accents and speech patterns?", a: "Yes. The voice engine is trained on diverse speech data and handles regional accents, varied pacing, and background noise well. If a caller is genuinely unintelligible, the agent escalates rather than misinterpreting." },
    { q: "How does the appointment booking work?", a: "The agent connects to your real calendar (Google Calendar, Calendly, or similar). It checks live availability, offers open slots, confirms the booking, and sends a calendar invite. You set the rules: meeting types, buffer times, daily caps, and blackout dates." },
    { q: "What is the difference between Starter, Growth, and Pro?", a: "Starter covers business hours with a single voice channel and appointment booking. Growth adds 24/7 coverage, a website chat widget, CRM integration, and lead qualification. Pro adds SMS follow-up, an analytics dashboard, and priority support. All tiers share the same core AI." },
  ],
  "web-apps": [
    { q: "Do you build from scratch or work with existing codebases?", a: "Both. We can architect a new platform from the ground up or integrate with and extend your existing application. Most engagements start with a code review of what you have so we can recommend the fastest path." },
    { q: "What technologies do you work with?", a: "Primarily Next.js, React, and Node.js for full-stack work. We also work with Python backends, PostgreSQL, and various CMS platforms. If you have a specific stack requirement, ask. We will tell you honestly if it's our strength." },
    { q: "How do you handle deployment and hosting?", a: "We typically deploy on Vercel or AWS. We set up CI/CD pipelines, monitoring, and staging environments so deployments are predictable and rollbacks are instant. You retain full ownership of all infrastructure." },
    { q: "Do you provide ongoing support after launch?", a: "Yes. We offer maintenance contracts that cover bug fixes, performance optimization, and feature additions. Or we document everything and hand off to your team. Your choice." },
  ],
  "managed-agent-services": [
    { q: "What does 'managed' actually mean day to day?", a: "We run the system, monitor its output, fix issues as they come up, update the knowledge base, and send you regular performance reports. You interact with the results, not the infrastructure." },
    { q: "How do you handle system downtime or errors?", a: "All managed systems have alerting. If something breaks, we know within minutes and fix it before it compounds. You get an incident report, not a surprise." },
    { q: "Can we switch from managed to self-run later?", a: "Yes. Every managed system comes with full documentation, runbooks, and access credentials. If you want to take it in-house, we do a structured handoff with a transition period." },
    { q: "How is managed service priced?", a: "Monthly fee based on the complexity of the system, volume of work it handles, and level of support you need. We scope it on a call and give you a fixed monthly number. No surprise overage charges." },
  ],
  "social-media": [
    { q: "Which platforms does the system post to?", a: "X, LinkedIn, Instagram, TikTok, YouTube, Facebook, Threads, and more. The system adapts content format and tone per platform automatically. A single piece of source content becomes platform-native posts." },
    { q: "What safeguards prevent embarrassing or off-brand posts?", a: "Every post goes through brand-voice validation, fact-checking, and an optional approval queue before publishing. You set the guardrails. If you want every post reviewed by a human first, that's a setting, not a workaround." },
    { q: "Does it handle replies and DMs too?", a: "Yes. The system can auto-reply to comments and DMs with brand-voiced, context-aware responses. It also qualifies inbound leads from social interactions and routes them to your CRM." },
    { q: "How do you measure results?", a: "We track posting consistency, engagement rates, follower growth, lead generation, and click-through to your site. You get a monthly performance report with the metrics that actually matter for your goals." },
  ],
  "ugc-video-production": [
    { q: "What kinds of videos do you produce?", a: "UGC-style content, scripted explainers, product demos, short-form ads for TikTok and YouTube Shorts, and longer YouTube content. We handle scripting, filming direction, editing, and delivery in publish-ready formats." },
    { q: "Do you use real creators or AI-generated content?", a: "Both, depending on your needs. We work with real creators for authentic UGC and use AI-assisted tools for motion graphics and animation. We will recommend the right approach for your audience and budget." },
    { q: "How fast can you turn around a video?", a: "Short-form content (under 60 seconds): 3 to 5 business days. Longer explainers and demos: 1 to 2 weeks. Rush delivery available for an additional fee." },
    { q: "Do you write the scripts too?", a: "Yes. Scripting is included. We research your product, study what performs in your niche, and write scripts designed to stop the scroll. You review and approve before production starts." },
  ],
};

export default async function ServicePage({ params }: Props) {
  const { serviceId } = await params;
  const service = services.find((s) => s.id === serviceId);

  if (!service || service.image.includes("placeholder")) notFound();

  const note = serviceNotesMap[service.id];
  const imageUrl = service.image.startsWith("http") ? service.image : `https://www.blockframe.cloud${service.image}`;

  const faqs = serviceFAQs[service.id] ?? [];

  // Build FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, note)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(serviceId, service.title)) }} />
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
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
          {faqs.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="text-2xl font-semibold text-text-primary mb-8">Frequently Asked Questions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {faqs.map((faq) => (
                  <div key={faq.q} className="bg-surface-light p-6">
                    <h3 className="text-base font-semibold text-text-primary">{faq.q}</h3>
                    <p className="mt-2 text-sm text-text-secondary">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
