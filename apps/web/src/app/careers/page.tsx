import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Earlsdwara Digital — strategy, design, and engineering.",
};

const openings = [
  {
    title: "Senior Product Designer (UI/UX)",
    location: "Remote · Global",
    focus: "Editorial interfaces, design systems, conversion UX",
  },
  {
    title: "Full‑Stack Engineer (Next.js)",
    location: "Remote · Global",
    focus: "Performance, accessibility, CMS, scalable components",
  },
  {
    title: "Growth & SEO Lead",
    location: "Remote · Global",
    focus: "Technical SEO, content architecture, experimentation",
  },
];

export default function CareersPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Careers</h1>
        <p className="mt-3 max-w-2xl text-muted">
          We hire for taste, rigor, and ownership. If you like building systems that feel premium — not templated — you
          will fit.
        </p>

        <div className="mt-10 grid gap-4">
          {openings.map((role) => (
            <Card key={role.title} className="p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-extrabold text-fg">{role.title}</div>
                  <div className="text-xs font-semibold text-muted2">{role.location}</div>
                </div>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-accent-gold underline-offset-4 hover:underline"
                >
                  Apply via contact →
                </Link>
              </div>
              <p className="mt-3 text-sm text-muted">{role.focus}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card/25 p-6">
          <p className="text-sm font-extrabold text-fg">Open applications</p>
          <p className="mt-2 text-sm text-muted">
            Don’t see your role? Send a portfolio, GitHub, or case study write‑up — we review serious candidates weekly.
          </p>
          <Link
            href={`mailto:${BRAND.email}?subject=Careers%20%E2%80%94%20Open%20application`}
            className="mt-4 inline-flex text-sm font-semibold text-accent-neon underline-offset-4 hover:underline"
          >
            Email us → {BRAND.email}
          </Link>
        </div>
      </div>
    </Container>
  );
}
