import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { getServices } from "@/lib/cms/siteContent";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <PageHeader
          eyebrow="Services"
          title="Strategy + design + engineering, packaged for outcomes."
          description="Each service page is structured for clarity: problem, solution, process, and measurable outcomes—plus conversion CTAs."
          ctaHref="/contact"
          ctaLabel="Book a call"
        />

        <Section className="pt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-border bg-card/20 p-6 transition-transform hover:-translate-y-[2px] hover:bg-card/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-accent-gold">{s.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted">{s.solution}</p>
                  </div>
                  <div
                    className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/40 text-accent-gold transition-transform group-hover:rotate-[-8deg]"
                    aria-hidden="true"
                  >
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Container>
  );
}

