import { Fragment } from "react";

import { cn } from "@/lib/utils";

/**
 * Seamless horizontal marquee. The item list is rendered twice and the track is
 * translated by exactly -50%, so the loop has no visible seam. Pausing under
 * `prefers-reduced-motion` is handled in globals.css.
 *
 * @param {{ items: string[], separator?: string, className?: string }} props
 */
export function Marquee({ items, separator = "✦", className }) {
  const sequence = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item) => (
        <Fragment key={item}>
          <li className="type-label px-6 whitespace-nowrap sm:px-9">{item}</li>
          <li aria-hidden="true" className="px-1 text-[11px] leading-none text-gold">
            {separator}
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Screen readers get the list once, statically. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="marquee-track">
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
