import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "How we work",
  description: "Our delivery model: strategy, design, engineering, and growth — as one system.",
};

const phases = [
  {
    title: "01 — Discovery & positioning",
    body: "We map objectives, audiences, constraints, and competitive context. We align on success metrics and the minimum viable narrative to win trust fast.",
  },
  {
    title: "02 — Architecture & systems design",
    body: "Information architecture, conversion paths, content templates, SEO boundaries, and technical architecture. This is where speed and scale get locked in early.",
  },
  {
    title: "03 — Design & prototyping",
    body: "Editorial UI, interaction design, design tokens, and reusable components — custom, not generic. We prototype the highest-risk flows first.",
  },
  {
    title: "04 — Build & CMS integration",
    body: "Production engineering with performance budgets, accessibility checks, and CMS-backed layouts so your team can publish without breaking the site.",
  },
  {
    title: "05 — Launch & iteration",
    body: "Analytics, structured data validation, QA, and launch playbooks — then continuous improvement: experiments, content expansion, and optimization loops.",
  },
];

export default function ProcessPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How we work</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A disciplined operating system for premium digital programs — fewer surprises, clearer decisions, faster shipping.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {phases.map((p) => (
            <Card key={p.title} className="p-6">
              <div className="text-sm font-extrabold text-accent-gold">{p.title}</div>
              <p className="mt-3 text-sm leading-7 text-muted">{p.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-border bg-card/25 p-6 sm:p-8">
          <div>
            <p className="text-sm font-extrabold text-fg">Want the short version?</p>
            <p className="mt-2 text-sm text-muted">
              Bring a brief. We respond with a plan, timeline options, and what “great” looks like for your stage.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 justify-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Start a project
          </Link>
        </div>
      </div>
    </Container>
  );
}
