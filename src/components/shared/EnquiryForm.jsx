"use client";

import { useCallback, useState } from "react";

import { FormField } from "@/components/shared/FormField";
import { Toast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import { enquiryStatus } from "@/data/contact";
import { validateLead } from "@/lib/lead-schema";

/**
 * The order / consultation form. Shared by /contact, /order and
 * /request-consultation, which differ only in their field list and copy.
 *
 * Submits to `/api/lead`, which mails the enquiry on. The controls stay native
 * and uncontrolled — the browser keeps the values, `FormData` reads them at
 * submit, and a failed send leaves everything the visitor typed in place. The
 * only state here is what the network is doing.
 *
 * @param {{
 *   fields: import("@/data/types").FormFieldDef[],
 *   legend: string,
 *   requiredNote: string,
 *   submitLabel: string,
 *   endpoint?: string,
 * }} props
 */
export function EnquiryForm({
  fields,
  legend,
  requiredNote,
  submitLabel,
  endpoint = "/api/lead",
}) {
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const dismissToast = useCallback(() => setToast(null), []);

  /** Show the problem, mark the fields, and move to the first one. */
  function fail(body, fieldErrors = {}) {
    setErrors(fieldErrors);
    setToast({ tone: "error", title: enquiryStatus.errorTitle, body });

    const first = fields.find((field) => fieldErrors[field.name]);
    if (first) document.getElementById(first.name)?.focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSending) return;

    // Captured before the first await: React nulls `currentTarget` once the
    // handler returns, so `form.reset()` below needs its own reference.
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    // The same schema the route runs. Catching it here saves a round trip;
    // it is never the reason the server trusts the body.
    const checked = validateLead(values);
    if (!checked.ok) return fail(enquiryStatus.invalidBody, checked.errors);

    setErrors({});
    setToast(null);
    setIsSending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // `fetch` resolves on any status, so unlike a rejection-based client the
      // 400 carrying the route's field errors is read here rather than caught
      // below — which leaves the `catch` for what it should mean: the request
      // never completed.
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const fieldErrors = body?.errors;
        return fieldErrors
          ? fail(enquiryStatus.invalidBody, fieldErrors)
          : fail(enquiryStatus.errorBody);
      }

      form.reset();
      setToast({
        tone: "success",
        title: enquiryStatus.successTitle,
        body: enquiryStatus.successBody,
      });
    } catch {
      fail(enquiryStatus.errorBody);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      {/* `noValidate` hands validation to the schema: one set of messages, in
          our own words, rather than the browser's bubbles racing ahead of it. */}
      <form
        noValidate
        onSubmit={handleSubmit}
        className="border border-rule bg-white p-6 sm:p-9"
      >
        <fieldset disabled={isSending} className="min-w-0">
          <legend className="type-label flex w-full items-center justify-between gap-4 text-ink">
            <span>{legend}</span>
            <span className="text-slate">
              <span aria-hidden="true" className="mr-1 text-gold">
                *
              </span>
              {requiredNote}
            </span>
          </legend>

          <div className="mt-9 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                disabled={isSending}
                error={errors[field.name]}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="gold"
            size="pill"
            disabled={isSending}
            className="mt-10 w-full"
          >
            {isSending ? enquiryStatus.sending : submitLabel}
          </Button>
        </fieldset>
      </form>

      {toast ? (
        <Toast
          tone={toast.tone}
          title={toast.title}
          body={toast.body}
          onDismiss={dismissToast}
        />
      ) : null}
    </>
  );
}
