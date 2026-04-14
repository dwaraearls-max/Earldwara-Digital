import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LegalProse } from "@/components/marketing/LegalProse";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms governing use of the Earlsdwara Digital website and related services.",
};

export default function TermsPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted2">Legal</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Terms of service</h1>
        <p className="mt-3 text-sm text-muted">Last updated: March 25, 2026 · Replace with counsel-reviewed copy before launch.</p>

        <div className="mt-10 rounded-3xl border border-border bg-card/20 p-6 sm:p-10">
          <LegalProse>
            <p>
              These Terms govern your access to and use of the Earlsdwara Digital website and any introductory services
              arranged through it. Client engagements are additionally governed by separate statements of work or
              master service agreements.
            </p>

            <h2>Acceptance</h2>
            <p>By using the site, you agree to these Terms. If you disagree, do not use the site.</p>

            <h2>Services &amp; information</h2>
            <p>
              Website content is for general information and marketing. It does not constitute professional advice.
              Availability, scope, and fees depend on a signed agreement.
            </p>

            <h2>Acceptable use</h2>
            <ul>
              <li>Do not attempt to disrupt, probe, or misuse the site or related systems.</li>
              <li>Do not scrape or harvest data in ways that violate law or our rights.</li>
              <li>Do not misrepresent your identity or affiliation.</li>
            </ul>

            <h2>Intellectual property</h2>
            <p>
              The site, branding, copy, designs, and underlying code are owned by Earlsdwara Digital or its licensors.
              You receive no rights except limited access to view content in a normal browser.
            </p>

            <h2>Third-party links</h2>
            <p>We may link to third parties. We are not responsible for their content or practices.</p>

            <h2>Disclaimer</h2>
            <p>
              The site is provided “as is” to the maximum extent permitted by law. We disclaim warranties of
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Earlsdwara Digital is not liable for indirect, incidental,
              special, consequential, or punitive damages, or loss of profits, data, or goodwill.
            </p>

            <h2>Governing law</h2>
            <p>
              These Terms are governed by the laws applicable in your primary operating jurisdiction as agreed in client
              contracts. Until then, replace this section with your counsel’s choice of law and venue.
            </p>

            <h2>Contact</h2>
            <p>
              Questions: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> ·{" "}
              <Link href="/contact" className="font-semibold text-accent-gold underline-offset-4 hover:underline">
                Book a call
              </Link>
            </p>
          </LegalProse>
        </div>
      </div>
    </Container>
  );
}
