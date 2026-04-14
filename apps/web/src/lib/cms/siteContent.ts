import { caseStudies as mockCaseStudies, insights as mockInsights, services as mockServices } from "@/lib/mock/siteData";
import type { CaseStudy, Insight, Service } from "@/lib/mock/siteData";
import { getSanityClient } from "@/lib/cms/sanity/client";

// Sanity document expectations (can be aligned to your Sanity schema):
// - _type: "service" with fields: title, slug.current, problem, solution, process[], outcomes[]
// - _type: "caseStudy" with fields: title, slug.current, clientContext, challenge, strategy[], execution[], results[], metrics[]
// - _type: "insight" with fields: title, slug.current, excerpt, publishedAt, readingMinutes, sections[]

export async function getServices(): Promise<Service[]> {
  const client = getSanityClient();
  if (!client) return mockServices;

  const query = `*[_type == "service" && defined(slug.current)] | order(title asc){
    title,
    "slug": slug.current,
    problem,
    solution,
    process,
    outcomes
  }`;

  try {
    return await client.fetch<Service[]>(query);
  } catch {
    return mockServices;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const client = getSanityClient();
  if (!client) return mockServices.find((s) => s.slug === slug) ?? null;

  const query = `*[_type == "service" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    problem,
    solution,
    process,
    outcomes
  }`;

  try {
    return (await client.fetch<Service | null>(query, { slug })) ?? null;
  } catch {
    return mockServices.find((s) => s.slug === slug) ?? null;
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const client = getSanityClient();
  if (!client) return mockCaseStudies;

  const query = `*[_type == "caseStudy" && defined(slug.current)] | order(title asc){
    title,
    "slug": slug.current,
    clientContext,
    challenge,
    strategy,
    execution,
    results,
    metrics
  }`;

  try {
    return await client.fetch<CaseStudy[]>(query);
  } catch {
    return mockCaseStudies;
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const client = getSanityClient();
  if (!client) return mockCaseStudies.find((c) => c.slug === slug) ?? null;

  const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    clientContext,
    challenge,
    strategy,
    execution,
    results,
    metrics
  }`;

  try {
    return (await client.fetch<CaseStudy | null>(query, { slug })) ?? null;
  } catch {
    return mockCaseStudies.find((c) => c.slug === slug) ?? null;
  }
}

export async function getInsights(): Promise<Insight[]> {
  const client = getSanityClient();
  if (!client) return mockInsights;

  const query = `*[_type == "insight" && defined(slug.current)] | order(publishedAt desc){
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingMinutes,
    sections
  }`;

  try {
    return await client.fetch<Insight[]>(query);
  } catch {
    return mockInsights;
  }
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  const client = getSanityClient();
  if (!client) return mockInsights.find((p) => p.slug === slug) ?? null;

  const query = `*[_type == "insight" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingMinutes,
    sections
  }`;

  try {
    return (await client.fetch<Insight | null>(query, { slug })) ?? null;
  } catch {
    return mockInsights.find((p) => p.slug === slug) ?? null;
  }
}

