"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getWhatsAppHref } from "@/lib/brand";
import { BrandLogo } from "@/components/marketing/BrandLogo";

function NavLink({
  href,
  label,
  active,
  darkHero,
}: {
  href: string;
  label: string;
  active: boolean;
  darkHero?: boolean;
}) {
  const activeCls = darkHero ? "text-blue-400" : "text-accent-neon";
  const idleCls = darkHero ? "text-white/72 hover:text-white" : "text-muted2 hover:text-fg";
  return (
    <Link
      href={href}
      className={`font-eyebrow text-[11px] font-extrabold uppercase tracking-[0.22em] transition-colors hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        darkHero ? "focus-visible:ring-blue-400 focus-visible:ring-offset-black/60" : "focus-visible:ring-accent-neon focus-visible:ring-offset-bg"
      } ${active ? activeCls : idleCls}`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const isHome = pathname === "/";
  const isPricing = pathname === "/pricing";
  const darkHero = isHome;

  useEffect(() => {
    mobileMenuRef.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <header
      className={
        darkHero
          ? "sticky top-0 z-50 border-b border-white/12 bg-[#0a1628]/92 shadow-[0_8px_32px_-12px_rgba(8,25,47,0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a1628]/88"
          : "sticky top-0 z-50 border-b border-border bg-white/85 shadow-[0_8px_32px_-12px_rgba(20,16,31,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/75"
      }
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`group inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${
            darkHero ? "focus-visible:ring-offset-black/60" : "focus-visible:ring-accent-neon focus-visible:ring-offset-bg"
          }`}
        >
          <BrandLogo
            variant={darkHero ? "onDark" : "default"}
            className="transition-opacity group-hover:opacity-90"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <NavLink href="/" label="Home" active={isHome} darkHero={darkHero} />
          <NavLink href="/pricing#packages" label="Service" active={isPricing} darkHero={darkHero} />
          <NavLink href="/about" label="About us" active={pathname === "/about"} darkHero={darkHero} />
          <NavLink href="/about#team" label="Team" active={false} darkHero={darkHero} />
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-eyebrow ml-2 inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-blue-500 px-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_6px_20px_-6px_rgba(37,99,235,0.45)] transition-[transform,background-color] duration-300 hover:-translate-y-px hover:bg-blue-400 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              darkHero
                ? "focus-visible:ring-white focus-visible:ring-offset-black/50"
                : "focus-visible:ring-blue-700 focus-visible:ring-offset-bg"
            }`}
          >
            Get a website
          </a>
        </nav>

        <details ref={mobileMenuRef} className="relative md:hidden">
          <summary
            className={`list-none cursor-pointer rounded-xl border px-3 py-2 text-xs font-extrabold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              darkHero
                ? "border-white/25 bg-white/10 text-white"
                : "border-border bg-card/50 text-fg focus-visible:ring-accent-neon"
            }`}
          >
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
