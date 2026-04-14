import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="py-16">
        <div className="rounded-3xl border border-border bg-card/20 p-8 sm:p-12">
          <div className="text-sm font-semibold text-accent-gold">404</div>
          <h1 className="mt-3 text-3xl font-[800] tracking-tight sm:text-4xl">Page not found</h1>
          <p className="mt-3 max-w-2xl text-muted">
            The content you are looking for does not exist (or hasn’t been published yet).
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            >
              Book a call
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

