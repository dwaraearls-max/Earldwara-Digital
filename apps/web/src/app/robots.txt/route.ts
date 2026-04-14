export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://earlsdwara.digital";

  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}

