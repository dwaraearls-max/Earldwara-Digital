"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseBrowserEnv } from "./env";

export function createClient() {
  const env = getSupabaseBrowserEnv();
  if (!env) {
    throw new Error(
      "Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)."
    );
  }
  return createBrowserClient(env.url, env.anonKey);
}
