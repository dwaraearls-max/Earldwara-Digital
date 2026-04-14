import { getSiteUrl } from "@/lib/site";

export function WebSiteStructuredData() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Earlsdwara Digital",
    url: siteUrl,
    description:
      "Earlsdwara Digital — professional websites and e-commerce in Ghana. Transparent GHS pricing and modern web development.",
    publisher: {
      "@type": "Organization",
      name: "Earlsdwara Digital",
      url: siteUrl,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
