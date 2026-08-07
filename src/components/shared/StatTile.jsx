import { cn } from "@/lib/utils";

/**
 * A single cell of a hairline-divided stat strip: a large gold serif figure
 * above a mono uppercase caption.
 *
 * @param {{ value: string, caption: string, className?: string }} props
 */
export function StatTile({ value, caption, className }) {
  return (
    <div
      className={cn(
        "group/stat bg-navy px-4 py-12 text-center transition-colors duration-500 ease-[var(--ease-quiet)] hover:bg-navy-raised sm:px-6",
        className
      )}
    >
      <p className="tnum text-[clamp(2.75rem,5.5vw,4.25rem)] leading-none font-light tracking-[-0.02em] text-gold-light">
        {value}
      </p>
      <p className="type-label mt-5 leading-relaxed text-mist">{caption}</p>
    </div>
  );
}

/**
 * Hairline-divided strip. The dividers are 1px grid gaps showing the container
 * colour through — the only technique that stays a true hairline as the grid
 * reflows from 4-up to 2-up to stacked.
 */
export function StatStrip({ children, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px border-y border-rule-navy bg-rule-navy sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
