import type { SupabaseClient } from "@supabase/supabase-js";

export async function logAdminAudit(
  supabase: SupabaseClient,
  actorId: string,
  input: {
    action: string;
    entityType?: string | null;
    entityId?: string | null;
    details?: Record<string, unknown>;
  },
) {
  const { error } = await supabase.from("admin_audit_log").insert({
    actor_id: actorId,
    action: input.action,
    entity_type: input.entityType ?? null,
    entity_id: input.entityId ?? null,
    details: input.details ?? {},
  });
  if (error) {
    console.error("[admin] audit log:", error.message);
  }
}
