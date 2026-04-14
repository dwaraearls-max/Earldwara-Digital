import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import { Atmosphere } from "@/components/marketing/Atmosphere";
import "./globals.css";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteHeaderFallback } from "@/components/marketing/SiteHeaderFallback";
import { OrganizationStructuredData } from "@/components/seo/OrganizationStructuredData";
import { WebSiteStructuredData } from "@/components/seo/WebSiteStructuredData";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { Analytics } from "@/components/analytics/Analytics";
import { WhatsAppFloatingChat } from "@/components/marketing/WhatsAppFloatingChat";

const siteName = "Earlsdwara Digital";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://earlsdwara.digital";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Earlsdwara Digital — professional websites & e‑commerce in Ghana (GHS). Modern responsive design, SEO, and stores that convert.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description:
      "Earlsdwara Digital — professional websites & e‑commerce in Ghana. Transparent GHS packages.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Earlsdwara Digital — websites & e‑commerce in Ghana. Transparent GHS packages.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/brand-logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand-logo.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Atmosphere />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-fg"
        >
          Skip to content
        </a>
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main id="content" className="flex-1 pb-20 sm:pb-24">
          {children}
        </main>
        <SiteFooter />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <CookieConsent />
        <Analytics />
        <Suspense fallback={null}>
          <WhatsAppFloatingChat />
        </Suspense>
      </body>
    </html>
  );
}
