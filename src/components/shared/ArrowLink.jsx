import Link from "next/link";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The quiet gold-underlined inline link that carries the reader from a landing
 * page teaser into the page that holds the detail.
 */
const arrowLinkVariants = cva(
  "group/arrow inline-flex items-baseline gap-2 border-b pb-1 text-[14.5px] font-medium transition-colors",
  {
    variants: {
      tone: {
        light: "border-gold text-gold-deep hover:border-gold-deep hover:text-navy",
        navy: "border-gold-light text-gold-light hover:border-white hover:text-white",
      },
    },
    defaultVariants: { tone: "light" },
  }
);

export function ArrowLink({ href, children, tone = "light", className, ...props }) {
  return (
    <Link href={href} className={cn(arrowLinkVariants({ tone }), className)} {...props}>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-[var(--ease-quiet)] group-hover/arrow:translate-x-0.5"
      >
        &rarr;
      </span>
    </Link>
  );
}
