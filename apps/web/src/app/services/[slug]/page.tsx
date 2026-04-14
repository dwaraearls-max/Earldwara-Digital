import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { getServiceBySlug } from "@/lib/cms/siteContent";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return notFound();

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <PageHeader
          eyebrow={service.title}
          title={service.title}
          description={service.problem}
          ctaHref="/contact"
          ctaLabel="Book a strategy call"
        />

        <Section className="pt-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-gold">The problem</div>
              <p className="mt-3 text-sm leading-6 text-muted">{service.problem}</p>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-blue">The solution</div>
              <p className="mt-3 text-sm leading-6 text-muted">{service.solution}</p>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-emerald">Process</div>
              <ul className="mt-3 space-y-3">
                {service.process.map((step) => (
                  <li key={step} className="text-sm leading-6 text-muted">
                    {step}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-gold">Outcomes</div>
              <ul className="mt-3 space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="text-sm leading-6 text-muted">
                    {o}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-blue">Next step</div>
              <p className="mt-3 text-sm leading-6 text-muted">
                If you want this service built as a platform (not a template), book a strategy call and we will outline a
                clear plan.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  Book a call
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  View case studies
                </Link>
              </div>
            </Card>
          </div>
        </Section>
      </div>
    </Container>
  );
}

