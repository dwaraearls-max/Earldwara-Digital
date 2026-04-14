import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/marketing/PageHeader";
import { getInsights } from "@/lib/cms/siteContent";

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <PageHeader
          eyebrow="Insights"
          title="Thought leadership built for authority and SEO."
          description="Editorial-grade articles that support ranking, trust, and conversion intent."
          ctaHref="/contact"
          ctaLabel="Work with us"
        />

        <Section className="pt-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {insights.map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group rounded-2xl border border-border bg-card/20 p-6 transition-transform hover:-translate-y-[2px] hover:bg-card/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold text-muted2">
                    {new Date(p.publishedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                  <div className="text-xs font-semibold text-muted2">{p.readingMinutes} min</div>
                </div>
                <div className="mt-4 text-sm font-semibold text-fg group-hover:underline underline-offset-4">
                  {p.title}
                </div>
                <div className="mt-3 text-sm leading-6 text-muted">{p.excerpt}</div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-blue group-hover:underline underline-offset-4">
                  Read →
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Container>
  );
}

