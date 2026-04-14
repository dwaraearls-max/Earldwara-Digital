import { z } from "zod";
import { Resend } from "resend";

import { escapeHtml } from "@/lib/html-escape";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  serviceInterest: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ message: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  const admin = createAdminClient();
  if (admin) {
    const { error: dbError } = await admin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      service_interest: data.serviceInterest,
      message: data.message,
    });
    if (dbError) {
      console.error("[contact] Supabase insert failed:", dbError);
      return Response.json(
        { message: "Could not save your message. Please try again later." },
        { status: 500 }
      );
    }
  } else {
    console.info("[contact] SUPABASE_SERVICE_ROLE_KEY not set; skipping database write.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL ?? from;

  if (!apiKey || !from || !to) {
    // Production behavior still returns success to keep UX clean; configure env vars to enable email sending.
    console.info("[contact] Missing RESEND_* env vars. Payload received:", data);
    return Response.json({ ok: true }, { status: 200 });
  }

  const resend = new Resend(apiKey);

  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    company: escapeHtml(data.company),
    service: escapeHtml(data.serviceInterest),
    message: escapeHtml(data.message).replaceAll("\n", "<br/>"),
  };
  const mailto = `mailto:${encodeURIComponent(data.email)}`;

  const subject = `New strategy call request: ${data.company.replace(/[\r\n]/g, " ").trim()}`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.4; color: #111;">
      <h2 style="margin: 0 0 12px;">${escapeHtml(subject)}</h2>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tr><td style="padding: 6px 0; width: 180px; color:#444; font-weight:600;">Name</td><td style="padding: 6px 0;">${safe.name}</td></tr>
        <tr><td style="padding: 6px 0; width: 180px; color:#444; font-weight:600;">Email</td><td style="padding: 6px 0;"><a href="${mailto}">${safe.email}</a></td></tr>
        <tr><td style="padding: 6px 0; width: 180px; color:#444; font-weight:600;">Company</td><td style="padding: 6px 0;">${safe.company}</td></tr>
        <tr><td style="padding: 6px 0; width: 180px; color:#444; font-weight:600;">Service interest</td><td style="padding: 6px 0;">${safe.service}</td></tr>
        <tr><td style="padding: 6px 0; width: 180px; color:#444; font-weight:600; vertical-align:top;">Message</td><td style="padding: 6px 0;">${safe.message}</td></tr>
      </table>
    </div>
  `;

  await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
  });

  return Response.json({ ok: true }, { status: 200 });
}

