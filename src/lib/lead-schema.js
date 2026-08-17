import { z } from "zod";

import { enquiryErrors, enquiryFields } from "@/data/contact";

/**
 * The one schema for a contact enquiry.
 *
 * The browser validates with it before posting and `/api/lead` validates the
 * body with it again on arrival — a client check is a courtesy, never a
 * control. Because both sides import this file, a field can never drift out of
 * agreement with itself.
 */

/** The select options are owned by `enquiryFields`; never restate them here. */
const needOptions = enquiryFields.find((field) => field.name === "need")?.options ?? [];

/** An untouched text input arrives as "", not as undefined. Treat both as absent. */
const optionalText = (max, message) =>
  z
    .string()
    .trim()
    .max(max, { message })
    .optional()
    .transform((value) => value ?? "");

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: enquiryErrors.name })
    .max(120, { message: enquiryErrors.tooLong }),

  company: optionalText(160, enquiryErrors.company),

  email: z
    .email({ message: enquiryErrors.email })
    .trim()
    .max(200, { message: enquiryErrors.emailLong }),

  phone: optionalText(40, enquiryErrors.phone),

  need: z
    .string()
    .trim()
    .refine((value) => needOptions.includes(value), {
      message: enquiryErrors.need,
    }),

  property: z
    .string()
    .trim()
    .min(6, { message: enquiryErrors.property })
    .max(400, { message: enquiryErrors.tooLong }),
});

/**
 * Validate an unknown body.
 *
 * @param {unknown} body
 * @returns {{ ok: true, data: object } | { ok: false, errors: Record<string, string> }}
 */
export function validateLead(body) {
  const result = leadSchema.safeParse(body);
  if (result.success) return { ok: true, data: result.data };

  /** First message per field — the form shows one line under each control. */
  const errors = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0] ?? "form");
    if (!errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}
