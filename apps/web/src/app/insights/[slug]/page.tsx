import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ArticleStructuredData } from "@/components/seo/ArticleStructuredData";
import { getInsightBySlug } from "@/lib/cms/siteContent";

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) return notFound();

  return (
    <Container>
      <ArticleStructuredData
        url={`/insights/${post.slug}`}
        title={post.title}
        description={post.excerpt}
        datePublished={post.publishedAt}
      />
      <div className="py-10 sm:py-14">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/25 p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-[-15%] top-[-30%] h-72 w-72 rounded-full bg-accent-blue/10 blur-2xl" />
            <div className="absolute right-[-25%] top-[-15%] h-72 w-72 rounded-full bg-accent-gold/10 blur-2xl" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs font-semibold text-muted2">
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
              <span aria-hidden="true">•</span>
              {post.readingMinutes} min read
            </div>

            <h1 className="text-3xl font-[800] tracking-tight sm:text-4xl">{post.title}</h1>
            <p className="max-w-3xl text-muted">{post.excerpt}</p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                Book a call
              </Link>
              <Link
                href="/insights"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                Back to insights
              </Link>
            </div>
          </div>
        </div>

        <Section className="pt-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {post.sections.map((s) => (
                <Card key={s.heading} className="p-6">
                  <div className="text-sm font-semibold text-accent-gold">{s.heading}</div>
                  <p className="mt-3 text-sm leading-7 text-muted">{s.body}</p>
                </Card>
              ))}
            </div>
            <div className="space-y-4">
              <Card className="p-6">
                <div className="text-sm font-semibold text-accent-blue">Why this matters</div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  We design content systems that earn authority and convert intent. This article is an example of how we structure
                  persuasion for premium buyers.
                </p>
              </Card>
              <Card className="p-6">
                <div className="text-sm font-semibold text-accent-emerald">Next step</div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Want the same clarity on your site? Tell us what you are building and we will propose a conversion-first plan.
                </p>
                <div className="mt-5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                  >
                    Book a strategy call
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </div>
    </Container>
  );
}

