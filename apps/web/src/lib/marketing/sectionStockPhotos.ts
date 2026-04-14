/**
 * Curated Unsplash assets (allowed in `next.config.ts` → `images.unsplash.com`).
 * Replace with your own photography when ready.
 */
const u = (id: string, params = "w=900&q=80") => `https://images.unsplash.com/${id}?${params}`;

export const HOME_SERVICE_IMAGES = [
  { src: u("photo-1552664730-d307ca884978"), alt: "Team collaborating on strategy at a whiteboard" },
  { src: u("photo-1561070791-2526d30994b5"), alt: "Designer working on interface layouts" },
  { src: u("photo-1498050108023-c5249f4df085"), alt: "Developer workspace with laptop and code" },
  { src: u("photo-1460925895917-afdab827c52f"), alt: "Analytics and growth charts on a laptop" },
  { src: u("photo-1542744173-8e7e53415bb0"), alt: "Creative team reviewing content" },
  { src: u("photo-1677442136019-21780ecad995"), alt: "Abstract technology and automation visual" },
] as const;

export const HOME_WORK_IMAGES = [
  { src: u("photo-1611974789855-9c2a0a7236a3"), alt: "Financial data and market screens" },
  { src: u("photo-1497366216548-37526070297c"), alt: "Modern office and architecture" },
  { src: u("photo-1556742049-0cfed4f6a45d"), alt: "Retail and e‑commerce checkout context" },
] as const;

export const HOME_INSIGHT_IMAGES = [
  { src: u("photo-1434030216411-0b793f4b4173"), alt: "Notebook and coffee — editorial planning" },
  { src: u("photo-1504868584819-f8e8b4b6d7e3"), alt: "Laptop with search and SEO concept" },
  { src: u("photo-1558655146-d09347e92766"), alt: "Design tools and product craft" },
] as const;

export const HOME_TESTIMONIAL_IMAGES = [
  { src: u("photo-1522071820081-009f0129c71c"), alt: "" },
  { src: u("photo-1441986300917-64674bd600d8"), alt: "" },
  { src: u("photo-1523240795612-9a054b0db644"), alt: "" },
] as const;

export const NEWSLETTER_SIDE_IMAGE = {
  src: u("photo-1556761175-b413da4baf72"),
  alt: "Professional reviewing notes in a bright office",
};

export const PRICING_HERO_IMAGE = {
  src: u("photo-1553877522-43269d4ea984"),
  alt: "Team discussing project scope at a table",
};

export const ABOUT_PAGE_IMAGE = {
  src: u("photo-1522071820081-009f0129c71c"),
  alt: "Team collaboration in a modern studio",
};

export const FOOTER_CONNECT_IMAGE = {
  src: u("photo-1553877522-43269d4ea984"),
  alt: "Colleagues collaborating around a laptop",
};
