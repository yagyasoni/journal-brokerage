"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * One transient notice, pinned to the bottom of the viewport.
 *
 * Hand-built rather than pulled from a toast library: the site ships almost no
 * client JavaScript and one notice on one form does not justify a dependency.
 *
 * The live region is announced politely — a success here follows the visitor's
 * own action, so it never needs to interrupt them. Errors stay until dismissed;
 * only the success message times out, because the form it describes is gone.
 *
 * @param {{
 *   tone: "success" | "error",
 *   title: string,
 *   body: string,
 *   onDismiss: () => void,
 *   duration?: number,
 * }} props
 */
export function Toast({ tone, title, body, onDismiss, duration = 9000 }) {
  const isSuccess = tone === "success";

  useEffect(() => {
    if (!isSuccess) return undefined;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [isSuccess, duration, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end"
    >
      <div
        className={cn(
          "flex w-full max-w-sm items-start gap-4 border border-rule bg-white px-5 py-4 shadow-[0_18px_40px_-24px_var(--color-navy)]",
          "animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none",
          isSuccess ? "border-l-2 border-l-verified" : "border-l-2 border-l-gold"
        )}
      >
        {/* Success gets a tick; an error does not get a cross, because the
            dismiss button is already one and two crosses read as two actions.
            The gold left border carries the tone on its own. */}
        {isSuccess ? (
          <Check
            aria-hidden="true"
            strokeWidth={1.5}
            className="mt-0.5 size-4 shrink-0 text-verified"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <p className="type-label text-ink">{title}</p>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-slate">{body}</p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="-mt-1 -mr-1 shrink-0 rounded-xs p-1 text-slate transition-colors hover:text-ink"
        >
          <span className="sr-only">Dismiss</span>
          <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
        </button>
      </div>
    </div>
  );
}
