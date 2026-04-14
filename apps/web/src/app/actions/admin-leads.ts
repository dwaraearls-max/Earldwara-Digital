"use server";

import { revalidatePath } from "next/cache";
import { logAdminAudit } from "@/lib/admin/audit";
import { createClient } from "@/lib/supabase/server";

const STATUSES = new Set(["new", "read", "replied", "archived"]);

export async function updateLeadStatus(id: string, status: string) {
  if (!STATUSES.has(status)) {
    return { error: "Invalid status" };
  }
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

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);
  if (error) return { error: error.message };

  await logAdminAudit(supabase, user.id, {
    action: "lead.status_update",
    entityType: "contact_submissions",
    entityId: id,
    details: { status },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  revalidatePath("/admin/activity");
  return { ok: true as const };
}
