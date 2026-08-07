import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Mono uppercase record tag. `outline` for taxonomy (industries),
 * `solid` for jurisdictions (state chips).
 */
const chipVariants = cva(
  "type-label inline-flex items-center rounded-full whitespace-nowrap transition-colors duration-300 ease-[var(--ease-quiet)]",
  {
    variants: {
      variant: {
        outline:
          "border border-rule-strong bg-white px-4 py-2.5 text-ink hover:border-gold hover:text-gold-deep",
        solid: "bg-navy px-4 py-2.5 text-white hover:bg-navy-deep",
        muted: "border border-rule-strong px-4 py-2.5 text-slate",
      },
    },
    defaultVariants: { variant: "outline" },
  }
);

export function Chip({ children, variant = "outline", className, ...props }) {
  return (
    <span className={cn(chipVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export function ChipRow({ children, className }) {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>;
}
