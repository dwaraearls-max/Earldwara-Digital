import Image from "next/image";
import Link from "next/link";
import { about, teamMembers } from "@/lib/mock/siteData";
import { ABOUT_PAGE_IMAGE } from "@/lib/marketing/sectionStockPhotos";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { TeamSection } from "@/components/marketing/TeamSection";

export default function AboutPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <PageHeader
          eyebrow="About"
          title={about.headline}
          description={about.philosophy}
          ctaHref="/contact"
          ctaLabel="Book a call"
        />

        <div className="relative mt-8 aspect-[2/1] w-full max-h-[min(420px,42vw)] overflow-hidden rounded-2xl border border-border shadow-[0_24px_80px_-24px_rgba(0,0,0,0.35)] sm:aspect-[2.4/1]">
          <Image
            src={ABOUT_PAGE_IMAGE.src}
            alt={ABOUT_PAGE_IMAGE.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width:1200px) 100vw, 1200px"
          />
        </div>

        <Section className="pt-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-gold">How we think</div>
              <p className="mt-3 text-sm leading-7 text-muted">
                We treat your marketing presence as a system: strategy sets direction, design ensures clarity and trust,
                engineering makes it fast and scalable, and growth loops keep improving outcomes.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  Explore proof
                </Link>
                <Link
                  href="/insights"
                  className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  Read our insights
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-blue">Values</div>
              <div className="mt-4 space-y-4">
                {about.values.map((v) => (
                  <div key={v.title} className="rounded-xl border border-border bg-card/30 p-4">
                    <div className="text-sm font-extrabold text-fg">{v.title}</div>
                    <div className="mt-2 text-sm leading-6 text-muted">{v.body}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        <Section className="border-t border-border pt-14 sm:pt-20">
          <TeamSection members={teamMembers} sectionId="team" />
        </Section>
      </div>
    </Container>
  );
}

