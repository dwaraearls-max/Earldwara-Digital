import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LegalProse } from "@/components/marketing/LegalProse";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "How Earlsdwara Digital uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted2">Legal</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Cookie policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: March 25, 2026</p>

        <div className="mt-10 rounded-3xl border border-border bg-card/20 p-6 sm:p-10">
          <LegalProse>
            <p>
              This policy explains how we use cookies and similar technologies, and how you can control preferences.
              Align this text with your actual implementations and analytics providers before launch.
            </p>

            <h2>What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device. They can be “session” (temporary) or “persistent”
              (longer‑lasting), and “first‑party” (set by us) or “third‑party” (set by tools we integrate).
            </p>

            <h2>How we use cookies</h2>
            <ul>
              <li>
                <strong>Essential:</strong> required for basic site operation and security (for example, CSRF
                protection, form integrity, rate limiting where applicable).
              </li>
              <li>
                <strong>Preferences:</strong> remember choices such as cookie consent state (stored locally where
                configured).
              </li>
              <li>
                <strong>Analytics (optional):</strong> enabled only when you configure analytics in your deployment
                environment.
              </li>
            </ul>

            <h2>Managing cookies</h2>
            <p>
              You can control cookies through your browser settings. Blocking some cookies may impact site functionality.
            </p>

            <h2>Updates</h2>
            <p>We may update this policy as our site evolves. Review the “Last updated” date for changes.</p>

            <p>
              Read our{" "}
              <Link href="/privacy" className="font-semibold text-accent-gold underline-offset-4 hover:underline">
                Privacy policy
              </Link>
              .
            </p>
          </LegalProse>
        </div>
      </div>
    </Container>
  );
}
