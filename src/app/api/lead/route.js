import { Resend } from "resend";

import { LeadNotification } from "@/emails/LeadNotification";
import { leadRows, leadSubject, leadText } from "@/lib/lead-message";
import { validateLead } from "@/lib/lead-schema";

/**
 * POST /api/lead — receives one contact enquiry and emails it to the inbox.
 *
 * No database: the enquiry lives in the inbox it lands in. `replyTo` is the
 * visitor's own address, so answering is a single Reply.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return Response.json(
      { ok: false, error: "invalid", errors: result.errors },
      { status: 400 }
    );
  }

  const lead = result.data;

  try {
    const rows = leadRows(lead);
    const intro = `${lead.name}${lead.company ? ` at ${lead.company}` : ""} sent a request through the website contact form.`;

    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.LEAD_FROM_EMAIL,
      to: [process.env.LEAD_TO_EMAIL],
      replyTo: lead.email,
      subject: leadSubject(lead),
      react: <LeadNotification rows={rows} intro={intro} preview={intro} />,
      text: leadText(rows, intro),
    });

    if (error) throw new Error(`${error.name}: ${error.message}`);

    return Response.json({ ok: true });
  } catch (cause) {
    // Log the real reason for us; tell the visitor only that it failed.
    console.error("[/api/lead] send failed:", cause);
    return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
