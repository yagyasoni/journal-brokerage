import Image from "next/image";
import Link from "next/link";
import { brand, routes } from "@/data/nav";
import { cn } from "@/lib/utils";
/**
 * The mark: the three gold towers from the house logo, cut off their black
 * ground so the gradient carries on white, on navy and over the hero picture
 * alike. No plate behind it — the drawn facade it replaced needed one to be
 * visible at all, this one does not.
 *
 * `className` sets the box; the mark is portrait, so it fills the height and
 * takes the width it needs.
 *
 * @param {{ className?: string }} props
 */
export function LogoMark({ className }) {
  return (
    <span aria-hidden="true" className={cn("relative block shrink-0", className)}>
      <Image
        src="/media/logo-mark.png"
        alt=""
        fill
        sizes="48px"
        priority
        className="object-contain"
      />
    </span>
  );
}
/**
 * The full lockup — towers, wordmark, and the line beneath it — as drawn. It
 * needs room to stay legible, so it belongs in the footer's identity block and
 * nowhere in the bar.
 *
 * @param {{ className?: string }} props
 */
export function LogoLockup({ className }) {
  return (
    <Link
      href={routes.home}
      className={cn("block", className)}
      aria-label={`${brand.name} — home`}
    >
      <Image
        src="/media/logo-lockup.png"
        alt=""
        width={1200}
        height={886}
        sizes="260px"
        className="h-auto w-full"
      />
    </Link>
  );
}
/**
 * Two postures, because the bar has two.
 *
 * `align="center"` is the crest: mark above the wordmark, stacked and centred,
 * the way a letterhead sets it. `compact` is what survives the collapse — mark
 * and wordmark side by side, small enough to sit beside the menu.
 *
 * The compact wordmark is set the way the drawn lockup is drawn: broken before
 * the last word rather than run out on one tracked line, the upper line small
 * and spaced, the lower one larger, both optically the same width, and
 * the whole thing carrying the lockup's gold gradient (`.logo-wordmark`). One
 * tracked-out line of gold text beside a gold tower reads as a caption for the
 * tower; two stacked lines read as a mark.
 *
 * The tracking on the top line is set against the bottom line's width, not
 * chosen: the two have to measure the same or the block stops reading as one
 * object. Change the brand name and that pairing needs re-checking.
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
  const ramp = onNavy ? "logo-wordmark-navy" : "logo-wordmark";
  // Broken where the drawn lockup breaks it: everything up to the last word on
  // the top line, the last word alone beneath — "THE JOURNAL" over
  // "BROKERAGE". Derived from `brand.name`, never a second copy of it.
  const words = brand.name.split(" ");
  const lastWord = words.pop();
  const leadWords = words.join(" ");
  return (
    <Link
      href={routes.home}
      className={cn(
        "group/logo flex",
        centred ? "flex-col items-center gap-2.5" : "items-center gap-2.5",
        className
      )}
      aria-label={`${brand.name} — home`}
      {...props}
    >
      <LogoMark className={compact ? "size-8" : "size-10"} />
      <span
        className={cn(
          "min-w-0 flex-col justify-center",
          centred ? "flex items-center" : "hidden sm:flex"
        )}
      >
        {compact ? (
          // Two lines, sized so they set to the same width: the upper one
          // small and widely spaced, the lower one larger and light. That
          // contrast is the lockup's, and it is what stops this reading as
          // a label.
          <>
            <span
              className={cn(
                ramp,
                "text-[13px] leading-none font-bold tracking-[0.115em] whitespace-nowrap uppercase"
              )}
            >
              {leadWords}
            </span>
            <span
              className={cn(
                ramp,
                "mt-1 text-[16.5px] leading-none font-semibold tracking-[0.035em] whitespace-nowrap uppercase"
              )}
            >
              {lastWord}
            </span>
          </>
        ) : (
          <span
            className={cn(
              ramp,
              "text-[15px] leading-none font-semibold tracking-[0.24em] whitespace-nowrap uppercase sm:text-[17px] sm:tracking-[0.3em]"
            )}
          >
            {brand.name}
          </span>
        )}
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
