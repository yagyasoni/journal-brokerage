import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * One labelled control, styled as a ledger field rather than a rounded box.
 *
 * Native `input` and `select` on purpose: the whole form works with scripting
 * off, the browser's own validation and autofill come free, and there is no
 * client bundle to ship for a page that is mostly a list of labels. The gold
 * focus ring comes from the `:focus-visible` rule in globals.css.
 */
const controlClasses =
  "w-full rounded-xs border border-rule-strong bg-white px-4 py-3.5 text-[15.5px] leading-snug text-ink transition-colors duration-300 ease-[var(--ease-quiet)] placeholder:text-slate/60 hover:border-gold disabled:cursor-not-allowed disabled:bg-paper disabled:text-slate";

/**
 * @param {{
 *   field: import("@/data/types").FormFieldDef,
 *   disabled?: boolean,
 *   className?: string,
 * }} props
 */
export function FormField({ field, disabled = false, className }) {
  const { name, label, type, required, placeholder, autoComplete, options, full } = field;

  return (
    <div className={cn(full && "sm:col-span-2", className)}>
      <label htmlFor={name} className="type-label block text-slate">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-gold">
            *
          </span>
        ) : null}
      </label>

      {type === "select" ? (
        <div className="relative mt-3">
          <select
            id={name}
            name={name}
            required={required}
            disabled={disabled}
            defaultValue=""
            className={cn(controlClasses, "appearance-none pr-11")}
          >
            {/* An empty first option keeps the control unselected, so a
                required select actually blocks an empty submission. */}
            <option value="" disabled />
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.25}
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate"
          />
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(controlClasses, "mt-3")}
        />
      )}
    </div>
  );
}
