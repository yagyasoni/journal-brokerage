"use client";

import { useEffect, useState } from "react";

import { isEnabled, setEnabled, subscribe } from "@/lib/typewriter-audio";
import { cn } from "@/lib/utils";

/**
 * The switch for the typing's voice.
 *
 * Not a nicety: the statement takes over three seconds to type, so sound that
 * starts without being asked for needs a way to stop it (WCAG 1.4.2). The
 * choice is remembered, so a reader turns it off once rather than on every
 * page.
 *
 * It renders in the "on" state on the server and corrects itself on mount —
 * the stored preference lives in `localStorage`, which cannot be read during
 * render without desynchronising the first paint. The label is the only thing
 * that changes, and it is small and quiet, so there is nothing to see flicker.
 *
 * @param {{
 *   labels: { enable: string, disable: string },
 *   className?: string,
 * }} props
 */
export function SoundToggle({ labels, className }) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(isEnabled());
    return subscribe(setOn);
  }, []);

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setEnabled(!on)}
      className={cn(
        "type-label group/sound inline-flex items-center gap-2.5 text-slate transition-colors duration-500 ease-[var(--ease-quiet)] hover:text-gold-deep",
        className
      )}
    >
      {/* Three bars that stand up when the sound is on and lie flat when it is
          off — the mark reads at a glance, the words underneath it confirm. */}
      <span aria-hidden="true" className="flex h-3 items-center gap-[3px]">
        {[0, 1, 2].map((bar) => (
          <span
            key={bar}
            className={cn(
              "w-px origin-center bg-gold transition-[height] duration-500 ease-[var(--ease-quiet)]",
              on ? BAR_HEIGHTS[bar] : "h-px"
            )}
          />
        ))}
      </span>

      {on ? labels.disable : labels.enable}
    </button>
  );
}

const BAR_HEIGHTS = ["h-1.5", "h-3", "h-2"];
