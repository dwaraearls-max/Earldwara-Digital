import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LegalProse } from "@/components/marketing/LegalProse";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Earlsdwara Digital collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted2">Legal</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: March 25, 2026 · Replace with counsel-reviewed copy before launch.</p>

        <div className="mt-10 rounded-3xl border border-border bg-card/20 p-6 sm:p-10">
          <LegalProse>
            <p>
              Earlsdwara Digital (“we”, “us”) respects your privacy. This policy describes how we handle information when
              you visit our website, submit forms, subscribe to updates, or engage our services.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Contact &amp; inquiry data:</strong> name, email, company, message, and related fields you submit
                via forms.
              </li>
              <li>
                <strong>Technical data:</strong> IP address, device/browser type, and approximate location inferred by
                standard server logs (when applicable).
              </li>
              <li>
                <strong>Analytics:</strong> if enabled via your environment configuration, aggregated usage data may be
                collected by third-party analytics providers.
              </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To respond to inquiries and schedule meetings.</li>
              <li>To operate, secure, and improve our website and services.</li>
              <li>To send marketing communications only where you have opted in (unsubscribe anytime).</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h2>Legal bases (where applicable)</h2>
            <p>
              Depending on jurisdiction, we may process personal data based on consent, legitimate interests (operating
              and securing our business), or contractual necessity when you become a client.
            </p>

            <h2>Retention</h2>
            <p>
              We retain inquiry and client-related records as needed for business operations and legal compliance, then
              delete or anonymize them according to internal policies.
            </p>

            <h2>Sharing</h2>
            <p>
              We do not sell personal data. We may share information with trusted processors (hosting, email delivery,
              analytics) under contracts that require appropriate safeguards.
            </p>

            <h2>Your rights</h2>
            <p>
              You may have rights to access, correct, delete, or restrict processing of your personal data, and to object
              to certain processing. Contact us at{" "}
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
            </p>

            <h2>Children</h2>
            <p>Our services are not directed to children under 16.</p>

            <h2>Changes</h2>
            <p>We may update this policy and will revise the “Last updated” date when we do.</p>

            <p>
              <Link href="/contact" className="font-semibold text-accent-gold underline-offset-4 hover:underline">
                Contact us
              </Link>{" "}
              for privacy questions.
            </p>
          </LegalProse>
        </div>
      </div>
    </Container>
  );
}
