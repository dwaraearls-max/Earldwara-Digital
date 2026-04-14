import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PricingPackages } from "@/components/marketing/PricingPackages";
import { BRAND } from "@/lib/brand";
import { PRICING_HERO_IMAGE } from "@/lib/marketing/sectionStockPhotos";

export const metadata: Metadata = {
  title: "Web development packages & pricing",
  description: `${BRAND.legalName} — website packages from ${BRAND.currency} 2,500 to full e‑commerce. Ghana.`,
};

export default function PricingPage() {
  return (
    <Container>
      <div className="pt-10 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-neon">
              {BRAND.legalName}
            </p>
            <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Packages built for real businesses
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Same tiers as our studio flyer — simple sites, business sites, and e‑commerce. Final scope is confirmed
              after a short discovery call.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-lg sm:aspect-[5/4] lg:aspect-auto lg:min-h-[260px]">
            <Image
              src={PRICING_HERO_IMAGE.src}
              alt={PRICING_HERO_IMAGE.alt}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 45vw"
              priority
            />
          </div>
        </div>
        <PricingPackages />
      </div>
    </Container>
  );
}
