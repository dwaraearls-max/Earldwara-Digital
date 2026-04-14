import { getSiteUrl, getSocialLinks } from "@/lib/site";
import { BRAND } from "@/lib/brand";

export function OrganizationStructuredData() {
  const siteUrl = getSiteUrl();
  const social = getSocialLinks();
  const sameAs = [social.linkedin, social.x, social.instagram, social.youtube, social.tiktok].filter(
    Boolean,
  ) as string[];
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Earlsdwara Digital",
    url: siteUrl,
    logo: `${siteUrl}/brand-logo.svg`,
    email: BRAND.email,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}

