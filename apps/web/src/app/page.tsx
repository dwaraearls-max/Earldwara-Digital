import Image from "next/image";
import Link from "next/link";
import { MotionInView } from "@/components/marketing/MotionInView";
import { HomeHeroContent } from "@/components/marketing/HomeHeroContent";
import { HeroTrustStrip } from "@/components/marketing/HeroTrustStrip";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { PricingPackages } from "@/components/marketing/PricingPackages";
import { SectionHeader } from "@/components/marketing/SectionHeader";
import { getWhatsAppChatHref, getWhatsAppHref } from "@/lib/brand";
import { teamMembers } from "@/lib/mock/siteData";
import { TeamSection } from "@/components/marketing/TeamSection";
import {
  HOME_INSIGHT_IMAGES,
  HOME_SERVICE_IMAGES,
  HOME_TESTIMONIAL_IMAGES,
  HOME_WORK_IMAGES,
  NEWSLETTER_SIDE_IMAGE,
} from "@/lib/marketing/sectionStockPhotos";

/** Hero photography — `public/hero-home.png` (full-bleed `object-cover`) */
const HERO_IMAGE = "/hero-home.png";

const services = [
  {
    title: "Brand Strategy",
    desc: "Positioning and messaging that convert.",
    href: "/services/brand-strategy",
  },
  {
    title: "UI/UX Design",
    desc: "Interfaces that feel premium and clear.",
    href: "/services/ui-ux-design",
  },
  {
    title: "Web & App Development",
    desc: "Fast, responsive, SEO-ready builds.",
    href: "/services/website-web-app-development",
  },
  {
    title: "Digital Marketing & SEO",
    desc: "Technical SEO and growth loops.",
    href: "/services/digital-marketing-seo",
  },
  {
    title: "Creative & Content",
    desc: "Copy and creative with intent.",
    href: "/services/creative-content",
  },
  {
    title: "Automation & AI",
    desc: "Workflows that save time at scale.",
    href: "/services/automation-ai-solutions",
  },
];

const work = [
  {
    title: "Fintech Launch System",
    metric: "3.1x qualified leads",
    href: "/work/fintech-launch-system",
  },
  {
    title: "Premium B2B Website",
    metric: "+42% conversion rate",
    href: "/work/premium-b2b-website",
  },
  {
    title: "E-commerce Growth Sprint",
    metric: "-28% CAC, +19% revenue",
    href: "/work/ecommerce-growth-sprint",
  },
];

const insights = [
  { title: "How to build authority pages that rank and convert", href: "/insights/authority-pages" },
  { title: "The SEO architecture checklist for premium agencies", href: "/insights/seo-architecture" },
  { title: "Design systems that feel custom (not templated)", href: "/insights/custom-design-systems" },
];

const clientMarks = ["Startups", "Retail", "Services", "Fashion", "Ghana & global"];

const testimonials = [
  {
    quote:
      "Professional delivery from first call to launch. Our new site finally matches how serious we are in-market.",
    name: "Business owner",
    org: "Service company · Ghana",
  },
  {
    quote: "Clear pricing, fast iterations, and a store that actually works on mobile — our orders picked up immediately.",
    name: "E‑commerce lead",
    org: "Product brand",
  },
  {
    quote: "They explained SEO and performance in plain language and shipped without drama.",
    name: "Marketing lead",
    org: "Growing SME",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      <section
        className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#060d18]"
        aria-label="Introduction"
      >
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Business partnership handshake with a glowing digital map of Africa — technology and collaboration across the continent"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[1.04] contrast-[1.03] saturate-[1.02]"
          />
        </div>
        {/* Light global wash — photo stays visible; most contrast is on the left where copy sits */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,25,41,0.62)_0%,rgba(12,25,41,0.32)_30%,rgba(12,25,41,0.1)_48%,rgba(8,20,40,0.04)_60%,transparent_76%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1628]/30 via-transparent to-transparent sm:via-transparent"
          aria-hidden
        />
        {/* Bottom band so trust strip stays legible without darkening the whole hero */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(42vh,22rem)] bg-gradient-to-t from-[#0c1929]/55 via-[#0c1929]/18 to-transparent"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 ed-hero-scanline opacity-[0.12]" aria-hidden />
        <div
          className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[90rem] flex-1 flex-col px-4 pb-10 pt-[calc(5.25rem+env(safe-area-inset-top))] sm:px-6 sm:pb-12 sm:pt-[calc(5rem+env(safe-area-inset-top))] lg:px-10 lg:pb-14 lg:pt-[calc(4.75rem+env(safe-area-inset-top))]">
          <div className="flex flex-1 flex-col justify-center py-8 sm:py-12">
            <HomeHeroContent />
          </div>
          <HeroTrustStrip items={clientMarks} />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <PricingPackages />

        <section className="pb-12 sm:pb-20">
          <MotionInView>
            <SectionHeader
              eyebrow="Social proof"
              title="What clients say"
              description="Real feedback from teams we ship for."
              action={
                <Link
                  href="/work"
                  className="font-eyebrow text-xs font-extrabold uppercase tracking-[0.2em] text-accent-neon hover:underline underline-offset-8"
                >
                  Case studies →
                </Link>
              }
            />
          </MotionInView>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t, i) => {
              const vis = HOME_TESTIMONIAL_IMAGES[i];
              return (
                <MotionInView key={t.quote} delayMs={i * 70}>
                  <blockquote className="ed-card-glass ed-card-glow-hover flex h-full flex-col overflow-hidden rounded-2xl p-0">
                    <div className="relative aspect-[2.4/1] w-full shrink-0 sm:aspect-[2.6/1]">
                      <Image
                        src={vis?.src ?? HOME_TESTIMONIAL_IMAGES[0]!.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 33vw"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--bg-elevated)_96%,transparent)] via-transparent to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-sm leading-7 text-muted">&ldquo;{t.quote}&rdquo;</p>
                      <footer className="mt-5 text-sm font-bold text-fg">
                        {t.name}
                        <span className="block text-xs font-semibold text-muted2">{t.org}</span>
                      </footer>
                    </div>
                  </blockquote>
                </MotionInView>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border py-12 sm:py-16">
          <MotionInView>
            <TeamSection members={teamMembers} />
          </MotionInView>
        </section>

        <section className="py-10 sm:py-16">
          <MotionInView>
            <SectionHeader
              eyebrow="Capabilities"
              title="Beyond the core packages"
              description="Strategy, UX, marketing, and automation when you are ready to level up."
              action={
                <Link
                  href="/services"
                  className="font-eyebrow text-xs font-extrabold uppercase tracking-[0.2em] text-accent-neon hover:underline underline-offset-8"
                >
                  All services →
                </Link>
              }
            />
          </MotionInView>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const img = HOME_SERVICE_IMAGES[i] ?? HOME_SERVICE_IMAGES[0]!;
              return (
                <MotionInView key={s.href} delayMs={i * 50}>
                  <Link
                    href={s.href}
                    className="group ed-card-glass ed-card-glow-hover flex h-full flex-col overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold text-fg">{s.title}</div>
                          <div className="mt-2 text-sm leading-6 text-muted">{s.desc}</div>
                        </div>
                        <span
                          className="shrink-0 text-accent-neon transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-accent-blue"
                          aria-hidden
                        >
                          ↗
                        </span>
                      </div>
                    </div>
                  </Link>
                </MotionInView>
              );
            })}
          </div>
        </section>

        <section className="py-10 sm:py-16">
          <MotionInView>
            <SectionHeader
              eyebrow="Portfolio"
              title="Selected work"
              description="Outcomes you can measure."
              action={
                <Link
                  href="/work"
                  className="font-eyebrow text-xs font-extrabold uppercase tracking-[0.2em] text-accent-neon hover:underline underline-offset-8"
                >
                  View all →
                </Link>
              }
            />
          </MotionInView>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {work.map((c, i) => {
              const img = HOME_WORK_IMAGES[i] ?? HOME_WORK_IMAGES[0]!;
              return (
                <MotionInView key={c.href} delayMs={i * 60}>
                  <Link
                    href={c.href}
                    className="group ed-card-glass ed-card-glow-hover flex h-full flex-col overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="text-sm font-bold text-fg">{c.title}</div>
                      <div className="mt-4 rounded-xl border border-accent-neon/20 bg-accent-neon/[0.06] px-3 py-2.5 text-sm font-extrabold text-accent-neon shadow-[0_0_24px_-8px_rgba(37,99,235,0.3)]">
                        {c.metric}
                      </div>
                      <div className="mt-auto pt-6 text-sm font-semibold text-muted transition-colors group-hover:text-fg">
                        Read the full story →
                      </div>
                    </div>
                  </Link>
                </MotionInView>
              );
            })}
          </div>
        </section>

        <section className="py-10 sm:py-16">
          <MotionInView>
            <SectionHeader
              eyebrow="Editorial"
              title="Insights"
              description="Practical articles for growth-minded teams."
              action={
                <Link
                  href="/insights"
                  className="font-eyebrow text-xs font-extrabold uppercase tracking-[0.2em] text-accent-neon hover:underline underline-offset-8"
                >
                  Browse →
                </Link>
              }
            />
          </MotionInView>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {insights.map((p, i) => {
              const img = HOME_INSIGHT_IMAGES[i] ?? HOME_INSIGHT_IMAGES[0]!;
              return (
                <MotionInView key={p.href} delayMs={i * 55}>
                  <Link
                    href={p.href}
                    className="group ed-card-glass ed-card-glow-hover flex h-full flex-col overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:1024px) 100vw, 33vw"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="text-sm font-bold text-fg">{p.title}</div>
                      <div className="mt-auto pt-8 text-sm font-semibold text-accent-blue transition-colors group-hover:underline group-hover:underline-offset-4">
                        Read →
                      </div>
                    </div>
                  </Link>
                </MotionInView>
              );
            })}
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <MotionInView>
            <div className="ed-border-gradient ed-card-glass overflow-hidden rounded-3xl">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
                <div className="relative hidden min-h-[280px] lg:block">
                  <Image
                    src={NEWSLETTER_SIDE_IMAGE.src}
                    alt={NEWSLETTER_SIDE_IMAGE.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 0px, 45vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-elevated/90"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
                    <Image
                      src={NEWSLETTER_SIDE_IMAGE.src}
                      alt={NEWSLETTER_SIDE_IMAGE.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Insights by email</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Occasional tips on websites, SEO, and conversion — no spam.
                  </p>
                  <div className="mt-6">
                    <NewsletterSignup />
                  </div>
                </div>
              </div>
            </div>
          </MotionInView>
        </section>

        <section className="pb-20 sm:pb-28">
          <MotionInView>
            <div className="relative overflow-hidden rounded-3xl ed-border-gradient bg-bg-elevated p-6 sm:p-12 shadow-[0_0_0_1px_rgba(30,58,138,0.08),0_40px_100px_-40px_rgba(37,99,235,0.15)]">
              <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-accent-gold/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-accent-emerald/15 blur-3xl" />
              <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                    Tell us what you are building
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    Tell us about your goals and timeline — we will recommend the right package and next steps.
                  </p>
                </div>
                <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:shrink-0">
                  <a
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-eyebrow ed-cta-primary inline-flex items-center justify-center rounded-full bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white hover:-translate-y-0.5 hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon"
                  >
                    Get a website
                  </a>
                  <a
                    href={getWhatsAppChatHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-eyebrow inline-flex items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.15em] text-fg backdrop-blur-sm hover:border-[#25D366]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
                  >
                    Chat on WhatsApp
                  </a>
                  <Link
                    href="/pricing#packages"
                    className="font-eyebrow inline-flex items-center justify-center rounded-full border border-border bg-white/50 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.15em] text-fg shadow-sm backdrop-blur-sm hover:border-accent-neon/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon"
                  >
                    Pricing
                  </Link>
                </div>
              </div>
            </div>
          </MotionInView>
        </section>
      </div>
    </div>
  );
}
