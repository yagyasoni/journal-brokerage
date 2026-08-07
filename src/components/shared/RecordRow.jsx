import { cn } from "@/lib/utils";

/**
 * One entry in a ledger card: mono uppercase label on the left, value on the
 * right, hairline divider beneath. Shared by the abstract and report cards.
 *
 * @param {{
 *   label: string,
 *   value: string,
 *   note?: string,
 *   mono?: boolean,
 *   verified?: boolean,
 *   className?: string,
 * }} props
 */
export function RecordRow({
  label,
  value,
  note,
  mono = false,
  verified = false,
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-5 border-b border-rule px-5 py-3.5 last:border-b-0 sm:px-6",
        className
      )}
    >
      <dt className="type-label shrink-0 pt-1 leading-relaxed text-slate">{label}</dt>
      <dd className="min-w-0 text-right">
        <span
          className={cn(
            "block text-[14.5px] leading-snug font-normal",
            // `mono` now means "this is a figure": tabular lining, so parcel
            // and file numbers still stack in a straight column.
            mono && "tnum tracking-[0.02em]",
            verified ? "text-verified" : "text-ink"
          )}
        >
          {value}
        </span>
        {note ? (
          <span className="mt-1.5 block text-[12.5px] leading-snug text-slate">
            {note}
          </span>
        ) : null}
      </dd>
    </div>
  );
}
