import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getAdminIntegrationFlags } from "@/lib/admin/integration-flags";
import { createClient } from "@/lib/supabase/server";
import { SettingsHub } from "./SettingsHub";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [settingsRes, profileRes] = await Promise.all([
    supabase.from("site_settings").select("category, payload, updated_at").order("category"),
    user
      ? supabase
          .from("profiles")
          .select("full_name, company, phone, bio, email, role")
          .eq("id", user.id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null as null }),
  ]);

  const profile = profileRes.data;
  const settingsRows = settingsRes.error ? [] : (settingsRes.data ?? []);
  const settingsMap = Object.fromEntries(
    settingsRows.map((r) => [r.category, r.payload as Record<string, unknown>]),
  );
  const flags = getAdminIntegrationFlags();

  return (
    <div>
      <AdminPageHeader
        eyebrow="System"
        title="Settings"
        description="Workspace identity, notifications, security posture, integrations health, and your operator profile. Changes persist in Supabase (site_settings + profiles) and are audited."
      />
      <SettingsHub
        profile={{
          full_name: profile?.full_name ?? "",
          company: profile?.company ?? "",
          phone: profile?.phone ?? "",
          bio: profile?.bio ?? "",
          email: profile?.email ?? user?.email ?? "",
          role: profile?.role ?? "user",
        }}
        settings={{
          workspace: (settingsMap.workspace ?? {}) as Record<string, unknown>,
          notifications: (settingsMap.notifications ?? {}) as Record<string, unknown>,
          security: (settingsMap.security ?? {}) as Record<string, unknown>,
          appearance: (settingsMap.appearance ?? {}) as Record<string, unknown>,
          integrations: (settingsMap.integrations ?? {}) as Record<string, unknown>,
        }}
        integrationFlags={flags}
      />
    </div>
  );
}
