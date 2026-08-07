import Link from "next/link";

import { brand, routes } from "@/data/nav";
import { cn } from "@/lib/utils";

/**
 * The mark: a classical banking facade — pediment, four columns, stepped base —
 * drawn rather than borrowed, so it holds up at 28px and at 44px.
 *
 * Over the hero footage the solid navy plate would disappear, so `tone="navy"`
 * swaps it for a hairline-framed glass plate that holds on any frame.
 *
 * @param {{ tone?: "light" | "navy", className?: string }} props
 */
export function LogoMark({ tone = "light", className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center text-white",
        tone === "navy"
          ? "border border-white/30 bg-white/10 backdrop-blur-sm"
          : "bg-navy",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-[62%]">
        <path d="M12 3 L21.5 8 H2.5 Z" fill="currentColor" />
        <path
          d="M3.5 9.6 V17.4 M8.5 9.6 V17.4 M15.5 9.6 V17.4 M20.5 9.6 V17.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
        <path
          d="M2 19 H22 M3 21 H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

/**
 * Two postures, because the bar has two.
 *
 * `align="center"` is the crest: mark above the wordmark, stacked and centred,
 * the way a letterhead sets it. `compact` is what survives the collapse — mark
 * and wordmark on one line, small enough to sit beside the menu.
 *
 * On the narrowest screens the wordmark stands down so the primary action can
 * stay in the bar; the mark alone carries the identity, and the accessible name
 * is unchanged.
 *
 * @param {{
 *   tone?: "light" | "navy",
 *   align?: "start" | "center",
 *   compact?: boolean,
 *   showTagline?: boolean,
 *   className?: string,
 * }} props
 */
export function Logo({
  tone = "light",
  align = "start",
  compact = false,
  showTagline = true,
  className,
  ...props
}) {
  const centred = align === "center";
  const onNavy = tone === "navy";

  return (
    <Link
      href={routes.home}
      className={cn(
        "group/logo flex ",
        centred ? "flex-col items-center gap-2.5" : "items-center gap-3",
        className
      )}
      aria-label={`${brand.name} — home`}
      {...props}
    >
      <LogoMark tone={tone} className={compact ? "size-9" : "size-10"} />

      <span
        className={cn(
          "min-w-0 flex-col justify-center",
          centred ? "flex items-center" : "hidden sm:flex"
        )}
      >
        <span
          className={cn(
            "leading-none font-light whitespace-nowrap uppercase",
            compact
              ? "text-[13px] tracking-[0.16em]"
              : "text-[15px] tracking-[0.24em] sm:text-[17px] sm:tracking-[0.3em]",
            onNavy ? "text-white" : "text-ink"
          )}
        >
          {brand.name}
        </span>

        {showTagline ? (
          <span
            className={cn(
              "type-label mt-2 text-[9.5px] tracking-[0.2em]",
              onNavy ? "text-mist" : "text-slate"
            )}
          >
            {brand.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
