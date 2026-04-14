"use server";

import { revalidatePath } from "next/cache";
import { logAdminAudit } from "@/lib/admin/audit";
import { createClient } from "@/lib/supabase/server";

export async function updateNewsletterActive(id: string, isActive: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") return { error: "Forbidden" };

  const unsubscribedAt = isActive ? null : new Date().toISOString();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: unsubscribedAt })
    .eq("id", id);
  if (error) return { error: error.message };

  await logAdminAudit(supabase, user.id, {
    action: "newsletter.active_toggle",
    entityType: "newsletter_subscribers",
    entityId: id,
    details: { isActive: isActive },
  });

  revalidatePath("/admin/newsletter");
  revalidatePath("/admin");
  revalidatePath("/admin/activity");
  return { ok: true as const };
}
