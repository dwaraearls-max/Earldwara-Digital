/**
 * One-off: create or update a Supabase Auth user and set profiles.role = 'admin'.
 *
 * Usage (from apps/web):
 *   BOOTSTRAP_ADMIN_PASSWORD='your-secret' node scripts/bootstrap-admin.mjs you@email.com
 *
 * Requires in .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Do not commit passwords; rotate if this was ever shared.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const p = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const email = process.argv[2]?.trim().toLowerCase();
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;

if (!url || !serviceRole) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (.env.local).");
  process.exit(1);
}
if (!email || !email.includes("@")) {
  console.error("Usage: BOOTSTRAP_ADMIN_PASSWORD='...' node scripts/bootstrap-admin.mjs email@example.com");
  process.exit(1);
}
if (!password || password.length < 8) {
  console.error("Set BOOTSTRAP_ADMIN_PASSWORD (min 8 chars).");
  process.exit(1);
}

const supabase = createClient(url, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function findUserIdByEmail(target) {
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const u = data.users.find((x) => x.email?.toLowerCase() === target);
    if (u) return u.id;
    if (data.users.length < perPage) break;
    page += 1;
  }
  return null;
}

try {
  let userId = await findUserIdByEmail(email);

  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    userId = data.user.id;
    console.log("Created Auth user:", email);
  } else {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });
    if (error) throw error;
    console.log("Updated password for existing user:", email);
  }

  const { data: updated, error: upErr } = await supabase
    .from("profiles")
    .update({ role: "admin" })
    .eq("id", userId)
    .select("id");

  if (upErr) {
    console.error("Could not set profiles.role:", upErr.message);
    process.exit(1);
  }

  if (!updated?.length) {
    const { error: insErr } = await supabase.from("profiles").insert({
      id: userId,
      email,
      role: "admin",
    });
    if (insErr) {
      console.error("No profile row; insert failed:", insErr.message);
      process.exit(1);
    }
    console.log("Inserted profiles row with admin role.");
  } else {
    console.log("profiles.role set to admin.");
  }

  console.log("User id:", userId);
  console.log("You can sign in at /admin/login");
} catch (e) {
  console.error(e?.message ?? e);
  process.exit(1);
}
