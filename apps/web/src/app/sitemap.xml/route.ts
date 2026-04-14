import { caseStudies, insights, services } from "@/lib/mock/siteData";

function toIso(date: string | undefined) {
  if (!date) return undefined;
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().split("T")[0];
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://earlsdwara.digital";
  const now = new Date().toISOString();

  const urls: Array<{ loc: string; lastmod?: string }> = [
    { loc: `${siteUrl}/`, lastmod: now },
    { loc: `${siteUrl}/services`, lastmod: now },
    { loc: `${siteUrl}/work`, lastmod: now },
    { loc: `${siteUrl}/insights`, lastmod: now },
    { loc: `${siteUrl}/pricing`, lastmod: now },
    { loc: `${siteUrl}/process`, lastmod: now },
    { loc: `${siteUrl}/faq`, lastmod: now },
    { loc: `${siteUrl}/careers`, lastmod: now },
    { loc: `${siteUrl}/privacy`, lastmod: now },
    { loc: `${siteUrl}/terms`, lastmod: now },
    { loc: `${siteUrl}/cookies`, lastmod: now },
    { loc: `${siteUrl}/accessibility`, lastmod: now },
    { loc: `${siteUrl}/humans.txt`, lastmod: now },
    { loc: `${siteUrl}/.well-known/security.txt`, lastmod: now },
    { loc: `${siteUrl}/about`, lastmod: now },
    { loc: `${siteUrl}/contact`, lastmod: now },
    ...services.map((s) => ({ loc: `${siteUrl}/services/${s.slug}`, lastmod: now })),
    ...caseStudies.map((c) => ({ loc: `${siteUrl}/work/${c.slug}`, lastmod: now })),
    ...insights.map((p) => ({ loc: `${siteUrl}/insights/${p.slug}`, lastmod: toIso(p.publishedAt) ?? now })),
  ];

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      `${body}\n` +
      `</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
}

