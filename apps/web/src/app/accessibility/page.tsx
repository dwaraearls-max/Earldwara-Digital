import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LegalProse } from "@/components/marketing/LegalProse";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our commitment to accessible digital experiences (WCAG-oriented).",
};

export default function AccessibilityPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted2">Trust</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Accessibility statement</h1>
        <p className="mt-3 text-sm text-muted">We build sites for real users — including assistive technology users.</p>

        <div className="mt-10 rounded-3xl border border-border bg-card/20 p-6 sm:p-10">
          <LegalProse>
            <p>
              Earlsdwara Digital designs and engineers experiences with accessibility in mind. Our goal is conformance
              with WCAG 2.1 Level AA where feasible for marketing properties and product work we ship.
            </p>

            <h2>What we do</h2>
            <ul>
              <li>Semantic HTML, focus management, visible focus states, and keyboard navigability.</li>
              <li>Color contrast and readable typography as part of our design system.</li>
              <li>Meaningful labels, headings hierarchy, and form error handling UX.</li>
              <li>Performance as an accessibility feature (fast loads, reduced motion–friendly patterns).</li>
            </ul>

            <h2>Third-party content</h2>
            <p>
              Embedded tools (for example scheduling widgets) may have their own accessibility characteristics. We
              select tools carefully and configure them responsibly.
            </p>

            <h2>Feedback</h2>
            <p>
              If you encounter a barrier, email{" "}
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> with the page URL and a short
              description. We take reports seriously.
            </p>

            <p>
              <Link href="/contact" className="font-semibold text-accent-gold underline-offset-4 hover:underline">
                Contact us
              </Link>
            </p>
          </LegalProse>
        </div>
      </div>
    </Container>
  );
}
