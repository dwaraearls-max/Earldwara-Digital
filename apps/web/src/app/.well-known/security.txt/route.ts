import { BRAND } from "@/lib/brand";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://earlsdwara.digital";
  const contact = process.env.SECURITY_CONTACT_EMAIL ?? BRAND.email;
  const body = `Contact: mailto:${contact}
Preferred-Languages: en
Canonical: ${siteUrl}/.well-known/security.txt
Policy: We welcome responsible disclosure. Please report security issues to the contact above.
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
