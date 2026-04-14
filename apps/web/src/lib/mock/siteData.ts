import { BRAND } from "@/lib/brand";

export type Service = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  process: string[];
  outcomes: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  clientContext: string;
  challenge: string;
  strategy: string[];
  execution: string[];
  results: string[];
  metrics: { label: string; value: string }[];
};

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  sections: Array<{ heading: string; body: string }>;
};

export const services: Service[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    problem:
      "Teams have a great offering, but unclear positioning makes inbound inconsistent and decision-makers skeptical.",
    solution:
      "We translate your differentiated strengths into a messaging architecture that earns trust and guides buyers to action.",
    process: [
      "Signal audit: positioning, competitors, buyer language.",
      "Strategy blueprint: narrative, value proposition, proof points.",
      "Conversion messaging: page-by-page copy structure and CTAs.",
      "Rollout system: brand voice and assets guidance for scale.",
    ],
    outcomes: [
      "More qualified leads through message-market fit.",
      "Higher conversion rates from clearer intent alignment.",
      "A reusable story foundation for campaigns and sales enablement.",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    problem:
      "Web experiences look good, but friction kills momentum—users hesitate, misunderstand value, or bounce before conversion.",
    solution:
      "We design an editorial-grade UI system that reduces cognitive load and makes conversion feel effortless.",
    process: [
      "UX strategy: journey mapping, conversion pathways, content hierarchy.",
      "Design system: tokens, components, and interaction principles (custom, not templated).",
      "Prototyping: testable flows and micro-interaction design.",
      "Implementation support: design-to-code handoff with performance constraints.",
    ],
    outcomes: [
      "Improved engagement and reduced drop-off.",
      "Consistent, scalable design across new pages and features.",
      "Premium usability that feels intentional, not generic.",
    ],
  },
  {
    slug: "website-web-app-development",
    title: "Website & Web App Development",
    problem:
      "Slow builds, weak accessibility, and SEO gaps limit growth—especially when content volume scales.",
    solution:
      "We engineer fast, accessible Next.js experiences with CMS-driven content and a durable technical foundation.",
    process: [
      "Architecture: IA, routes, caching strategy, and SEO boundaries.",
      "Implementation: components, performance budget, and responsive behavior.",
      "CMS integration: schema-backed content and reusable rendering.",
      "Launch: monitoring, analytics events, and iteration plan.",
    ],
    outcomes: [
      "Higher Lighthouse performance and better search visibility.",
      "Faster content publishing with fewer regressions.",
      "A platform you can extend without redesigning from scratch.",
    ],
  },
  {
    slug: "digital-marketing-seo",
    title: "Digital Marketing & SEO",
    problem:
      "Great pages don’t rank because architecture, internal linking, and structured content are missing.",
    solution:
      "We build keyword-ready content systems, technical SEO, and performance-informed iteration loops.",
    process: [
      "SEO architecture: topic clusters, templates, and schema patterns.",
      "Content planning: editorial strategy mapped to conversion intent.",
      "Technical SEO: metadata, sitemap, canonical rules, and indexing health.",
      "Growth experiments: measurement, iteration, and continuous improvement.",
    ],
    outcomes: [
      "Consistent organic traffic growth driven by intent and clarity.",
      "Better conversions from SEO-aligned messaging.",
      "Lower CAC through compounding discovery and trust.",
    ],
  },
  {
    slug: "creative-content",
    title: "Creative & Content",
    problem:
      "Brands publish content, but it lacks signal—no editorial voice, no proof, and no conversion intent.",
    solution:
      "We craft conversion-ready thought leadership and creative that communicates differentiation with credibility.",
    process: [
      "Editorial direction: voice, frameworks, and proof sourcing.",
      "Conversion copy: CTAs, section-level persuasion, and buyer-oriented structure.",
      "Production system: repeatable workflows for speed and quality.",
      "Launch kit: distribution plan and landing page alignment.",
    ],
    outcomes: [
      "Higher engagement and authority signals.",
      "Content that supports both SEO and sales.",
      "More booked calls from clear next steps.",
    ],
  },
  {
    slug: "automation-ai-solutions",
    title: "Automation & AI Solutions",
    problem:
      "Manual operations waste time and reduce responsiveness—slowing growth even when demand increases.",
    solution:
      "We implement practical automation and AI workflows that reduce cost while keeping quality and trust intact.",
    process: [
      "Workflow mapping: where time and quality degrade.",
      "Automation design: reliable triggers, validation, and human review paths.",
      "AI assist: structured outputs integrated into systems (not black boxes).",
      "Operations: monitoring and continuous optimization.",
    ],
    outcomes: [
      "Faster response times and better lead handling.",
      "Reduced operational overhead without losing brand quality.",
      "A foundation for future integrations and scaling.",
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-launch-system",
    title: "Fintech Launch System",
    clientContext:
      "A fast-moving fintech needed a launch website that could speak to founders and institutional decision-makers.",
    challenge:
      "They had product depth, but their pages lacked authority structure and conversion flow; search visibility was fragmented.",
    strategy: [
      "Built a narrative positioning stack with proof-first messaging.",
      "Designed an editorial page system for landing, services, and thought leadership.",
      "Engineered SEO architecture for scalable content and internal linking.",
    ],
    execution: [
      "UI/UX redesign: conversion hierarchy, trust signals, and micro-interaction polish.",
      "Next.js + CMS integration: reusable templates and schema-driven content rendering.",
      "Performance pass: image optimization, route-based code splitting, and caching strategy.",
    ],
    results: [
      "A launch presence that converts like a product.",
      "SEO-ready editorial content that supports compounding growth.",
    ],
    metrics: [
      { label: "Qualified leads", value: "3.1x" },
      { label: "Conversion rate", value: "+28%" },
      { label: "Core Web Vitals", value: "Pass" },
    ],
  },
  {
    slug: "premium-b2b-website",
    title: "Premium B2B Website",
    clientContext:
      "A B2B services company needed enterprise-grade credibility and clearer positioning for decision-makers.",
    challenge:
      "High traffic, low conversion. Users couldn’t quickly understand the offer, outcomes, or proof.",
    strategy: [
      "Rebuilt the messaging architecture around buyer intent and objections.",
      "Created a high-end design system with conversion-first components.",
      "Integrated analytics events and structured data patterns.",
    ],
    execution: [
      "Service page system: problem, solution, process, outcomes, and CTAs.",
      "Case study template: metrics-driven execution storytelling.",
      "SEO foundation: metadata, sitemap/robots, canonical rules, and schema markup.",
    ],
    results: [
      "A premium experience that reduces hesitation and accelerates decisions.",
      "Organic visibility improved through architecture and editorial consistency.",
    ],
    metrics: [
      { label: "Conversion rate", value: "+42%" },
      { label: "Sales cycle", value: "-18%" },
      { label: "Indexed pages", value: "+55%" },
    ],
  },
  {
    slug: "ecommerce-growth-sprint",
    title: "E-commerce Growth Sprint",
    clientContext:
      "An e-commerce brand needed a rapid growth system for product pages and conversion optimization.",
    challenge:
      "CAC was rising while conversion rates plateaued. The site had inconsistent content and slow performance.",
    strategy: [
      "Implemented conversion-aware content modules and internal linking patterns.",
      "Improved technical SEO on product/category pages.",
      "Optimized performance budgets to protect conversion.",
    ],
    execution: [
      "Editorial components: product storytelling blocks that reduce buyer friction.",
      "Performance engineering: image strategy and render optimization.",
      "A measurement plan: funnel events and experiment cadence.",
    ],
    results: [
      "Lower acquisition cost through better conversion and discoverability.",
      "A repeatable system for continued iteration.",
    ],
    metrics: [
      { label: "CAC", value: "-28%" },
      { label: "Revenue", value: "+19%" },
      { label: "Bounce rate", value: "-22%" },
    ],
  },
];

export const insights: Insight[] = [
  {
    slug: "authority-pages",
    title: "How to build authority pages that rank and convert",
    excerpt:
      "Authority isn’t branding fluff. It’s information architecture, proof placement, and conversion clarity—built into the page structure.",
    publishedAt: "2026-01-22",
    readingMinutes: 7,
    sections: [
      {
        heading: "Authority structure",
        body:
          "We build pages in layers: problem framing, solution clarity, proof points, and a conversion pathway that never feels like a hard sell.",
      },
      {
        heading: "SEO that supports intent",
        body:
          "Keyword selection is the start. The real lever is internal linking, schema readiness, and consistent editorial modules across clusters.",
      },
      {
        heading: "Conversion without friction",
        body:
          "CTA placement follows trust. We design micro-interactions, error states, and booking flows to feel premium and fast.",
      },
    ],
  },
  {
    slug: "seo-architecture-checklist",
    title: "The SEO architecture checklist for premium agencies",
    excerpt:
      "If your content is excellent but your site structure is weak, search engines treat you like a collection of pages—not an authority.",
    publishedAt: "2026-02-14",
    readingMinutes: 6,
    sections: [
      { heading: "Clean URLs and templates", body: "Use consistent route patterns so content can scale without SEO regressions." },
      { heading: "Structured data and metadata", body: "Schema-ready modules improve visibility and brand trust signals." },
      { heading: "Performance budgets", body: "Speed and accessibility are ranking multipliers when implemented correctly." },
    ],
  },
  {
    slug: "custom-design-systems",
    title: "Design systems that feel custom (not templated)",
    excerpt:
      "Generic UI kits create a ceiling. A custom design system feels crafted because it embeds your strategy, content hierarchy, and interaction rules.",
    publishedAt: "2026-03-03",
    readingMinutes: 8,
    sections: [
      { heading: "Tokens over components", body: "Start with color, typography, spacing, and interaction principles. Components follow naturally." },
      { heading: "Editorial hierarchy", body: "Premium design is readability plus persuasion, not just typography." },
      { heading: "Design-to-code alignment", body: "Build reusable UI primitives so new pages remain consistent and fast." },
    ],
  },
];

export type TeamMember = {
  name: string;
  title: string;
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  /** Optional portrait — place under `public/` e.g. `/team/founder.jpg` */
  imageSrc?: string;
};

/** Team portraits in `public/team/`. */
export const teamMembers: TeamMember[] = [
  {
    name: "Princess Twumasi",
    title: "Founder",
    email: BRAND.email,
    phoneDisplay: BRAND.phoneDisplay,
    phoneTel: BRAND.phoneTel,
    imageSrc: "/team/princess-twumasi.png",
  },
  {
    name: "Paul Abongo",
    title: "Creative lead",
    email: BRAND.email,
    phoneDisplay: BRAND.phoneDisplay,
    phoneTel: BRAND.phoneTel,
    imageSrc: "/team/team-male.png",
  },
  {
    name: "Akosuah Mensah",
    title: "Strategy & client delivery",
    email: BRAND.email,
    phoneDisplay: BRAND.phoneDisplay,
    phoneTel: BRAND.phoneTel,
    imageSrc: "/team/team-female.png",
  },
];

export const about = {
  headline: "Strategy + design + engineering, built as one platform.",
  philosophy:
    "We treat your website like a product: a system that earns authority, converts intent, and scales with your content and services.",
  values: [
    { title: "Authority through structure", body: "Clarity beats noise. Every page earns trust with information architecture and proof placement." },
    { title: "Conversion-first design", body: "We design for the buyer journey, not for screens." },
    { title: "Performance and accessibility", body: "Fast and usable is premium. It improves both SEO and buyer confidence." },
    { title: "Scalability by default", body: "Reusable components and CMS-driven templates prevent redesign cycles." },
  ],
};

