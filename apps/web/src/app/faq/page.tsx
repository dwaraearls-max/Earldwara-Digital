import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FaqStructuredData } from "@/components/seo/FaqStructuredData";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about working with Earlsdwara Digital.",
};

const faqs = [
  {
    q: "What does an engagement typically look like?",
    a: "We start with a strategy call, align on outcomes and constraints, then propose a phased plan: discovery, design system + content architecture, build, launch, and growth iteration. Larger programs run in parallel workstreams.",
  },
  {
    q: "Do you work globally and across time zones?",
    a: "Yes. We operate like a distributed product team: async updates, scheduled workshops, and shared artifacts so stakeholders stay aligned regardless of location.",
  },
  {
    q: "How fast can we launch?",
    a: "A focused marketing site can ship in weeks; platform builds depend on scope, integrations, and content readiness. We always optimize for quality without unnecessary ceremony.",
  },
  {
    q: "Can you work with our internal team or agency partners?",
    a: "Absolutely. We often partner with in-house brand, marketing, or engineering teams. We integrate via shared tools, clear ownership, and documentation.",
  },
  {
    q: "What tech do you specialize in?",
    a: "We standardize on modern web stacks (Next.js, TypeScript, Tailwind) with CMS-driven content and performance guardrails. We integrate analytics, CRM, and automation where it drives ROI.",
  },
  {
    q: "How do you measure success?",
    a: "We align on leading indicators (speed, accessibility, SEO technical health) and business outcomes (leads, pipeline quality, conversion rate, CAC efficiency) depending on the program.",
  },
];

export default function FaqPage() {
  return (
    <Container>
      <FaqStructuredData items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <div className="py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">FAQ</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Straight answers for teams evaluating a serious digital partner.
        </p>

        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-card/20 px-5 py-4 open:bg-card/30"
            >
              <summary className="cursor-pointer list-none text-sm font-extrabold text-fg [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-accent-gold transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-card/25 p-6 sm:p-8">
          <p className="text-sm font-extrabold text-fg">Still deciding?</p>
          <p className="mt-2 text-sm text-muted">
            The fastest way to know fit is a strategy call — we will tell you honestly if we are not the right team.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            Book a call
          </Link>
        </div>
      </div>
    </Container>
  );
}
