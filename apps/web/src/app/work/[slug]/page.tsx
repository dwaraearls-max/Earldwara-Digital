import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { getCaseStudyBySlug } from "@/lib/cms/siteContent";

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) return notFound();

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <PageHeader
          eyebrow="Case Study"
          title={item.title}
          description={item.challenge}
          ctaHref="/contact"
          ctaLabel="Book a call"
        />

        <Section className="pt-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <div className="text-sm font-semibold text-muted2">Client context</div>
              <p className="mt-3 text-sm leading-6 text-muted">{item.clientContext}</p>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-gold">Challenge</div>
              <p className="mt-3 text-sm leading-6 text-muted">{item.challenge}</p>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-blue">Key metrics</div>
              <div className="mt-3 grid gap-3">
                {item.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-border bg-card/30 p-4">
                    <div className="text-sm font-extrabold text-fg">{m.value}</div>
                    <div className="mt-1 text-xs font-semibold text-muted2">{m.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-emerald">Strategy</div>
              <ul className="mt-3 space-y-3">
                {item.strategy.map((s) => (
                  <li key={s} className="text-sm leading-6 text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-blue">Execution</div>
              <ul className="mt-3 space-y-3">
                {item.execution.map((s) => (
                  <li key={s} className="text-sm leading-6 text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="p-6">
              <div className="text-sm font-semibold text-accent-gold">Results</div>
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {item.results.map((r) => (
                  <li key={r} className="rounded-xl border border-border bg-card/30 p-4 text-sm leading-6 text-muted">
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  Book a strategy call
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  Back to case studies
                </Link>
              </div>
            </Card>
          </div>
        </Section>
      </div>
    </Container>
  );
}

