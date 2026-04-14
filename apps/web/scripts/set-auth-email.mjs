/**
 * Change a Supabase Auth user's email (admin API). If another user already
 * owns the target email, that user is deleted first (profiles cascade).
 *
 * Usage (from apps/web):
 *   node scripts/set-auth-email.mjs <fromEmail> <toEmail>
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env.local
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
const fromEmail = process.argv[2]?.trim().toLowerCase();
const toEmail = process.argv[3]?.trim().toLowerCase();

if (!url || !serviceRole) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
if (!fromEmail?.includes("@") || !toEmail?.includes("@")) {
  console.error("Usage: node scripts/set-auth-email.mjs <fromEmail> <toEmail>");
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
    if (u) return u;
    if (data.users.length < perPage) break;
    page += 1;
  }
  return null;
}

try {
  const fromUser = await findUserIdByEmail(fromEmail);
  if (!fromUser) {
    console.error("No user with email:", fromEmail);
    process.exit(1);
  }

  const blocker = await findUserIdByEmail(toEmail);
  if (blocker && blocker.id !== fromUser.id) {
    const { error: delErr } = await supabase.auth.admin.deleteUser(blocker.id);
    if (delErr) throw delErr;
    console.log("Removed duplicate account for:", toEmail, blocker.id);
  }

  const { data, error } = await supabase.auth.admin.updateUserById(fromUser.id, {
    email: toEmail,
    email_confirm: true,
  });
  if (error) throw error;

  const { error: pErr } = await supabase
    .from("profiles")
    .update({ email: toEmail })
    .eq("id", fromUser.id);
  if (pErr) console.warn("profiles.email update:", pErr.message);

  console.log("Updated:", fromEmail, "→", toEmail, "id:", data.user.id);
} catch (e) {
  console.error(e?.message ?? e);
  process.exit(1);
}
