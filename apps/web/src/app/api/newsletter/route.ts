import { z } from "zod";
import { Resend } from "resend";

import { escapeHtml } from "@/lib/html-escape";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function isUniqueViolation(err: { code?: string; message?: string }) {
  if (err.code === "23505") return true;
  const m = (err.message ?? "").toLowerCase();
  return m.includes("duplicate") || m.includes("unique constraint");
}

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ message: "Invalid email." }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();

  const admin = createAdminClient();
  if (admin) {
    const { error: dbError } = await admin
      .from("newsletter_subscribers")
      .insert({ email });
    if (dbError && !isUniqueViolation(dbError)) {
      console.error("[newsletter] Supabase insert failed:", dbError);
      return Response.json(
        { message: "Could not sign up. Please try again later." },
        { status: 500 }
      );
    }
  } else {
    console.info("[newsletter] SUPABASE_SERVICE_ROLE_KEY not set; skipping database write.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.NEWSLETTER_NOTIFY_EMAIL ?? process.env.RESEND_TO_EMAIL ?? from;

  if (!apiKey || !from || !to) {
    console.info("[newsletter] signup (configure RESEND_* / NEWSLETTER_NOTIFY_EMAIL):", email);
    return Response.json({ ok: true }, { status: 200 });
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: [to],
    subject: `Newsletter: ${email.replace(/[\r\n]/g, "").trim()}`,
    html: `<p>New newsletter signup: <a href="mailto:${encodeURIComponent(email)}">${escapeHtml(email)}</a></p>`,
  });

  return Response.json({ ok: true }, { status: 200 });
}
