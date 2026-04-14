import { createClient } from "@sanity/client";

export function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const apiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01";
  const token = process.env.SANITY_STUDIO_TOKEN;

  if (!projectId || !dataset) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token: token || undefined,
  });
}

