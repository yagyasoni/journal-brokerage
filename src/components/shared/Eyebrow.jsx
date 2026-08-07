import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The house eyebrow: a short gold rule followed by letter-spaced caps.
 *
 *   ——  OUR CORE SERVICES
 */
const eyebrowVariants = cva("type-label flex items-center gap-3.5", {
  variants: {
    tone: {
      light: "text-gold-deep",
      navy: "text-gold-light",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
    },
  },
  defaultVariants: { tone: "light", align: "start" },
});

const ruleVariants = cva("block h-px w-10 shrink-0", {
  variants: {
    tone: {
      light: "bg-gold",
      navy: "bg-gold-light",
    },
  },
  defaultVariants: { tone: "light" },
});

export function Eyebrow({ children, tone = "light", align = "start", className }) {
  return (
    <p className={cn(eyebrowVariants({ tone, align }), className)}>
      <span aria-hidden="true" className={ruleVariants({ tone })} />
      <span>{children}</span>
    </p>
  );
}
