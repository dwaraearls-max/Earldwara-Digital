import Image from "next/image";
import Link from "next/link";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { getSocialLinks } from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { FOOTER_CONNECT_IMAGE } from "@/lib/marketing/sectionStockPhotos";
import { BrandLogo } from "@/components/marketing/BrandLogo";
import { FooterConnectWithUs } from "@/components/marketing/FooterConnectWithUs";

const platform = [
  { label: "Pricing", href: "/pricing#packages" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Accessibility", href: "/accessibility" },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export function SiteFooter() {
  const social = getSocialLinks();

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-bg-muted/80 to-bg shadow-[0_-24px_60px_-40px_rgba(37,99,235,0.12)] backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon rounded-lg"
            >
              <BrandLogo className="h-8 sm:h-9 opacity-95 hover:opacity-100" />
            </Link>
            <div className="mt-3 text-sm font-semibold text-accent-neon">{BRAND.legalName}</div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Websites, business sites, and e‑commerce — transparent {BRAND.currency} packages and senior execution.
            </p>
            {social.linkedin || social.x || social.youtube ? (
              <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                {social.linkedin ? (
                  <a href={social.linkedin} className="text-muted2 hover:text-fg" rel="noopener noreferrer" target="_blank">
                    LinkedIn
                  </a>
                ) : null}
                {social.x ? (
                  <a href={social.x} className="text-muted2 hover:text-fg" rel="noopener noreferrer" target="_blank">
                    X
                  </a>
                ) : null}
                {social.youtube ? (
                  <a href={social.youtube} className="text-muted2 hover:text-fg" rel="noopener noreferrer" target="_blank">
                    YouTube
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted2">Platform</div>
              <ul className="mt-3 space-y-2">
                {platform.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-semibold text-muted2 hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted2">Company</div>
              <ul className="mt-3 space-y-2">
                {company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-semibold text-muted2 hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted2">Legal</div>
              <ul className="mt-3 space-y-2">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-semibold text-muted2 hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/.well-known/security.txt"
                className="mt-4 inline-block text-xs font-semibold text-muted2 hover:text-fg"
              >
                Security.txt
              </Link>
              <Link href="/humans.txt" className="mt-2 block text-xs font-semibold text-muted2 hover:text-fg">
                humans.txt
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs font-extrabold uppercase tracking-wider text-muted2">Newsletter</div>
            <p className="mt-3 text-sm text-muted">Frameworks for authority, conversion, and SEO — no fluff.</p>
            <NewsletterSignup className="mt-4" />
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-border pt-10 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,42%)] lg:items-center">
          <FooterConnectWithUs social={social} />
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/70 bg-bg-muted shadow-[0_20px_50px_-24px_rgba(37,99,235,0.2)] sm:aspect-[5/3] lg:aspect-auto lg:min-h-[220px]">
            <Image
              src={FOOTER_CONNECT_IMAGE.src}
              alt={FOOTER_CONNECT_IMAGE.alt}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 42vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted2">
            © {new Date().getFullYear()} Earlsdwara Digital. All rights reserved.
          </div>
          <div className="text-xs text-muted2">Performance · Accessibility · SEO · Security-minded delivery</div>
        </div>
      </div>
    </footer>
  );
}
