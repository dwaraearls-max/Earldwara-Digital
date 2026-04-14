import Link from "next/link";
import { getWhatsAppHref } from "@/lib/brand";
import { BrandLogo } from "@/components/marketing/BrandLogo";

/**
 * Static shell for `<Suspense>` while `SiteHeader` (usePathname) loads.
 * Matches the **home** dark-hero header so first paint aligns with `/` (FATbit-style hero).
 */
export function SiteHeaderFallback() {
  const navIdle =
    "font-eyebrow text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/72 hover:text-white";
  const navActive = "font-eyebrow text-[11px] font-extrabold uppercase tracking-[0.22em] text-blue-400";

  return (
    <header className="sticky top-0 z-50 border-b border-white/12 bg-[#0a1628]/92 shadow-[0_8px_32px_-12px_rgba(8,25,47,0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a1628]/88">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
        >
          <BrandLogo variant="onDark" className="transition-opacity group-hover:opacity-90" priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <Link href="/" className={`${navActive} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}>
            Home
          </Link>
          <Link
            href="/pricing#packages"
            className={`${navIdle} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
          >
            Service
          </Link>
          <Link href="/about" className={`${navIdle} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}>
            About us
          </Link>
          <Link href="/about#team" className={`${navIdle} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}>
            Team
          </Link>
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-eyebrow ml-2 inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-blue-500 px-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_6px_20px_-6px_rgba(37,99,235,0.45)] transition-[transform,background-color] duration-300 hover:-translate-y-px hover:bg-blue-400 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
          >
            Get a website
          </a>
        </nav>

        <details className="relative md:hidden">
          <summary className="list-none cursor-pointer rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            Menu
          </summary>
          <div className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,280px)] rounded-2xl border border-border bg-bg-elevated/98 p-3 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-1">
              <Link href="/" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-fg hover:bg-card">
                Home
              </Link>
              <Link href="/pricing#packages" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-fg hover:bg-card">
                Service &amp; pricing
              </Link>
              <Link href="/about" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-fg hover:bg-card">
                About us
              </Link>
              <Link href="/about#team" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-fg hover:bg-card">
                Team
              </Link>
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-accent-neon hover:bg-card"
              >
                Get a website
              </a>
              <hr className="my-2 border-border" />
              <Link href="/services" className="rounded-lg px-3 py-2 text-xs font-semibold text-muted2 hover:bg-card hover:text-fg">
                All services
              </Link>
              <Link href="/work" className="rounded-lg px-3 py-2 text-xs font-semibold text-muted2 hover:bg-card hover:text-fg">
                Work
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
