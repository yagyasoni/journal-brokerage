import { cva } from "class-variance-authority";

import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * The page's rhythm: a stack of screens.
 *
 * Every band is at least one viewport tall (`.band`, globals.css) and centres
 * its own contents, so a scroll comes to rest on a whole section rather than
 * on the seam between two. Nothing here carries a pixel height — `--screen`,
 * `--band-pad` and `--measure` all derive from the viewport, so the same
 * component is correct on a phone and on a 34" monitor without a breakpoint
 * between them.
 *
 * `min-height`, never `height`: a band with more content than fits simply
 * grows, and the reader scrolls through it as they always did.
 */
const sectionVariants = cva("relative w-full snap-start", {
  variants: {
    tone: {
      white: "bg-white text-ink",
      paper: "bg-paper text-ink",
      navy: "bg-navy text-white",
      navyDeep: "bg-navy-deep text-white",
    },
    size: {
      default: "band band-pad",
      // The first band on a page. `--screen` has already taken the bar's
      // height out, so it needs no extra air above — only enough to clear
      // the hairline under the bar.
      opening: "band band-open",
      // One screen with no padding of its own: for a band whose contents
      // set their own frame, such as a full-bleed photograph.
      screen: "band",
      // The two ways out of the screen, for a strip that would look absurd
      // given a whole one.
      compact: "py-(--band-pad-tight)",
      flush: "py-0",
    },
  },
  defaultVariants: { tone: "white", size: "default" },
});

/**
 * The measure. Fluid to the viewport, capped where a line stops being
 * comfortable to read, with a gutter that scales alongside it.
 */
export function Container({ children, className }) {
  return <div className={cn("measure", className)}>{children}</div>;
}

/**
 * @param {{
 *   children: React.ReactNode,
 *   tone?: "white" | "paper" | "navy" | "navyDeep",
 *   size?: "default" | "opening" | "screen" | "compact" | "flush",
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
