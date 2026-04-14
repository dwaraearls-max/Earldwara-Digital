/** Server-only: booleans for admin Settings → Integrations (never expose secrets). */
export function getAdminIntegrationFlags() {
  return {
    nextPublicSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL?.trim(),
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    supabaseAnon: !!(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
    ),
    serviceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
    resend: !!process.env.RESEND_API_KEY?.trim(),
    resendFrom: !!process.env.RESEND_FROM_EMAIL?.trim(),
    sanityProject: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim(),
    sanityDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET?.trim(),
  };
}
