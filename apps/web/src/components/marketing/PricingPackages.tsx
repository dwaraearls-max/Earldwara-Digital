"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";

export type PricingTier = {
  id: string;
  title: string;
  subtitle: string;
  priceRange: string;
  idealFor: string;
  features: string[];
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "simple",
    title: "Simple Website",
    subtitle: "Small business",
    priceRange: `${BRAND.currency} 2,500 – 3,500`,
    idealFor: "Personal brands, startups, small businesses.",
    features: [
      "Up to 5 pages",
      "Modern responsive design (mobile & tablet friendly)",
      "Contact form integration",
      "Basic SEO setup",
      "Social media integration",
    ],
  },
  {
    id: "standard",
    title: "Standard Business Website",
    subtitle: "5–10 pages",
    priceRange: `${BRAND.currency} 3,500 – 6,000`,
    idealFor: "Growing businesses, service-based companies.",
    features: [
      "5–10 fully designed pages",
      "Custom layout & branding",
      "Contact & inquiry forms",
      "Blog or portfolio section",
      "Basic performance optimization",
      "Social media & WhatsApp integration",
    ],
  },
  {
    id: "ecommerce",
    title: "E‑Commerce Website",
    subtitle: "Online store",
    priceRange: `${BRAND.currency} 6,000 – 15,000`,
    idealFor: "Fashion brands, product-based businesses.",
    features: [
      "Full online store setup",
      "Product upload & categorization",
      "Payment gateway integration",
      "Shopping cart & checkout system",
      "Order management system",
      "Mobile-optimized design",
    ],
  },
];

export function PricingPackages({
  id = "packages",
  heading = "Web developing packages & pricing",
  subheading = "Transparent tiers for every stage — from first presence to full e‑commerce.",
}: {
  id?: string;
  heading?: string;
  subheading?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section id={id} className="scroll-mt-28 py-12 sm:py-20">
      <div className="text-center">
        <p className="font-eyebrow text-[11px] font-extrabold uppercase tracking-[0.28em] text-accent-neon">
          Packages
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{subheading}</p>
      </div>

      <motion.div
        className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: reduce ? 0 : 0.12 },
          },
        }}
      >
        {PRICING_TIERS.map((tier, index) => {
          const featured = index === 1;
          return (
            <motion.article
              key={tier.id}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
                show: reduce
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 24 } },
              }}
              className={[
                "relative flex flex-col overflow-hidden rounded-2xl bg-bg-elevated ed-card-glow-hover",
                featured
                  ? "ed-border-gradient shadow-[0_0_0_1px_rgba(37,99,235,0.2),0_24px_56px_-18px_rgba(37,99,235,0.22),0_8px_24px_-12px_rgba(15,23,42,0.06)] lg:z-[1] lg:scale-[1.03]"
                  : "border border-border shadow-[0_4px_24px_-8px_rgba(15,23,42,0.06)]",
              ].join(" ")}
            >
              {featured ? (
                <span className="font-eyebrow absolute right-4 top-4 z-10 rounded-full border border-accent-neon/35 bg-accent-neon/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent-neon">
                  Most chosen
                </span>
              ) : null}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-gold via-accent-emerald/70 to-accent-blue/40" aria-hidden />
              <div className="relative flex flex-1 flex-col border-l border-transparent pl-5 pr-5 pb-6 pt-6 sm:pl-6 sm:pr-6 sm:pt-7">
                <h3 className="font-display pr-24 text-lg font-semibold leading-snug text-fg sm:pr-20">
                  {tier.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted2">{tier.subtitle}</p>
                <p className="mt-5 text-xl font-extrabold tracking-tight text-accent-neon">{tier.priceRange}</p>
                <p className="mt-2 text-sm text-muted">
                  <span className="font-semibold text-fg">Ideal for: </span>
                  {tier.idealFor}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-neon shadow-[0_0_12px_rgba(37,99,235,0.45)]"
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="font-eyebrow mt-8 inline-flex items-center justify-center rounded-full border border-accent-gold/45 bg-accent-gold/[0.1] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.15em] text-accent-neon transition-colors hover:border-accent-emerald/55 hover:bg-accent-emerald/[0.08] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald"
                >
                  Get started
                </Link>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
