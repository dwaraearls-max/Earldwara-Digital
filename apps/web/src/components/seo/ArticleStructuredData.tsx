export function ArticleStructuredData({
  url,
  title,
  description,
  datePublished,
}: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    url,
    publisher: {
      "@type": "Organization",
      name: "Earlsdwara Digital",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://earlsdwara.digital"}/brand-logo.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

