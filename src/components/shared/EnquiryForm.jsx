import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";

/**
 * The order / consultation form. Shared by /contact, /order and
 * /request-consultation, which differ only in their field list and copy.
 *
 * `disabled` is the default deliberately: there is no handler behind this yet,
 * and a form that accepts a request it cannot deliver is worse than no form.
 * Pass `disabled={false}` and an `action` once a handler exists.
 *
 * @param {{
 *   fields: import("@/data/types").FormFieldDef[],
 *   legend: string,
 *   requiredNote: string,
 *   submitLabel: string,
 *   disabledNote?: string,
 *   disabled?: boolean,
 * }} props
 */
export function EnquiryForm({
  fields,
  legend,
  requiredNote,
  submitLabel,
  disabledNote,
  disabled = true,
}) {
  return (
    <form className="border border-rule bg-white p-6 sm:p-9">
      <fieldset disabled={disabled} className="min-w-0">
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
            <FormField key={field.name} field={field} disabled={disabled} />
          ))}
        </div>

        <Button type="submit" variant="gold" size="pill" className="mt-10 w-full">
          {submitLabel}
        </Button>
      </fieldset>

      {disabled && disabledNote ? (
        <p className="mt-5 text-[12.5px] leading-snug text-slate">{disabledNote}</p>
      ) : null}
    </form>
  );
}
