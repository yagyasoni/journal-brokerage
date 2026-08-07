import { cva } from "class-variance-authority";

import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * The page's rhythm: one banded, generously padded section with a centred
 * measure. Every page on the site is assembled from these.
 */
const sectionVariants = cva("relative w-full", {
  variants: {
    tone: {
      white: "bg-white text-ink",
      paper: "bg-paper text-ink",
      navy: "bg-navy text-white",
      navyDeep: "bg-navy-deep text-white",
    },
    size: {
      default: "py-24 md:py-32 lg:py-40",
      compact: "py-16 md:py-20",
      flush: "py-0",
    },
  },
  defaultVariants: { tone: "white", size: "default" },
});

export function Container({ children, className }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1180px] px-6 md:px-10", className)}>
      {children}
    </div>
  );
}

/**
 * @param {{
 *   children: React.ReactNode,
 *   tone?: "white" | "paper" | "navy" | "navyDeep",
 *   size?: "default" | "compact" | "flush",
 *   id?: string,
 *   as?: React.ElementType,
 *   reveal?: boolean,
 *   bleed?: boolean,
 *   className?: string,
 *   innerClassName?: string,
 *   labelledBy?: string,
 * }} props
 */
export function SectionShell({
  children,
  tone = "white",
  size = "default",
  id,
  as: Tag = "section",
  reveal = true,
  bleed = false,
  className,
  innerClassName,
  labelledBy,
}) {
  const inner = bleed ? (
    children
  ) : (
    <Container className={innerClassName}>{children}</Container>
  );

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(sectionVariants({ tone, size }), className)}
    >
      {reveal ? <Reveal>{inner}</Reveal> : inner}
    </Tag>
  );
}
