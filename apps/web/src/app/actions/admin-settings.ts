"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logAdminAudit } from "@/lib/admin/audit";

const SETTINGS_CATEGORIES = new Set([
  "workspace",
  "notifications",
  "security",
  "appearance",
  "integrations",
]);

async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase: null, user: null } as const;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") return { supabase, user: null } as const;
  return { supabase, user } as const;
}

export async function updateAdminProfile(input: {
  full_name?: string | null;
  company?: string | null;
  phone?: string | null;
  bio?: string | null;
}) {
  const { supabase, user } = await requireAdminUser();
  if (!supabase || !user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name?.trim() || null,
      company: input.company?.trim() || null,
      phone: input.phone?.trim() || null,
      bio: input.bio?.trim() || null,
    })
    .eq("id", user.id);
  if (error) return { error: error.message };

  await logAdminAudit(supabase, user.id, {
    action: "profile.update",
    entityType: "profiles",
    entityId: user.id,
    details: { fields: Object.keys(input) },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/admin/activity");
  return { ok: true as const };
}

export async function updateSiteSettingsCategory(
  category: string,
  payload: Record<string, unknown>,
) {
  if (!SETTINGS_CATEGORIES.has(category)) {
    return { error: "Invalid category" };
  }
  const { supabase, user } = await requireAdminUser();
  if (!supabase || !user) return { error: "Unauthorized" };

  const { data: row } = await supabase
    .from("site_settings")
    .select("payload")
    .eq("category", category)
    .maybeSingle();

  const merged = {
    ...((row?.payload as Record<string, unknown> | null) ?? {}),
    ...payload,
  };

  const { error } = await supabase.from("site_settings").upsert(
    {
      category,
      payload: merged,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "category" },
  );
  if (error) return { error: error.message };

  await logAdminAudit(supabase, user.id, {
    action: "settings.update",
    entityType: "site_settings",
    entityId: category,
    details: { keys: Object.keys(payload) },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/admin");
  revalidatePath("/admin/activity");
  return { ok: true as const };
}

export async function updateIntegrationNotes(notes: string) {
  return updateSiteSettingsCategory("integrations", { notes: notes.trim() });
}
