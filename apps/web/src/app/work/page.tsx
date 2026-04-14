import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { getCaseStudies } from "@/lib/cms/siteContent";

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <PageHeader
          eyebrow="Case Studies"
          title="High-end execution, measured outcomes."
          description="Every story is structured: client context, challenge, strategy, execution, and results with metrics."
        />

        <Section className="pt-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className="group rounded-2xl border border-border bg-card/20 p-6 transition-transform hover:-translate-y-[2px] hover:bg-card/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-accent-gold">{c.title}</div>
                    <div className="mt-2 text-sm leading-6 text-muted">
                      {c.challenge.length > 90 ? `${c.challenge.slice(0, 90)}...` : c.challenge}
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/40 text-accent-gold transition-transform group-hover:rotate-[-8deg]"
                  >
                    ↗
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {c.metrics.slice(0, 2).map((m) => (
                    <span
                      key={m.label}
                      className="inline-flex items-center rounded-full border border-border bg-card/30 px-3 py-1 text-xs font-semibold text-muted2"
                    >
                      <span className="text-fg">{m.value}</span>&nbsp;{m.label}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Container>
  );
}

