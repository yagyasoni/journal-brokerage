"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Phone, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { specialistCall } from "@/data/contact";
import { contactPhone } from "@/data/nav";
import { cn } from "@/lib/utils";

/**
 * "Talk to a specialist" — the one action on the site that does not navigate.
 * It opens a small dialog carrying the direct line, because the answer is a
 * phone number and a whole page to hold one is a page too many.
 *
 * Built on the same Base UI dialog the mobile drawer uses, so focus trapping,
 * escape, and the scrim behave identically. The number is a `tel:` anchor: on
 * a handset that is the whole interaction, on a desktop it is still selectable
 * text.
 *
 * @param {{
 *   variant?: "gold" | "outlineNavy" | "outlineLight",
 *   size?: "pill" | "heroPill" | "navCta",
 *   className?: string,
 * }} props
 */
export function CallSpecialist({ variant = "outlineNavy", size = "pill", className }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cn(buttonVariants({ variant, size }), className)}>
        {specialistCall.trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* The flat navy scrim, matching the drawer — no blur anywhere. */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-navy/35 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />

        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border border-rule bg-white p-8 transition duration-200 ease-[var(--ease-quiet)] data-ending-style:opacity-0 data-starting-style:opacity-0 sm:p-10">
          <Dialog.Close
            aria-label={specialistCall.closeLabel}
            className="absolute top-5 right-5 text-slate transition-colors hover:text-ink"
          >
            <X aria-hidden="true" className="size-5" />
          </Dialog.Close>

          <p className="type-label text-gold-deep">{specialistCall.eyebrow}</p>

          <Dialog.Title className="type-title mt-6 text-ink">
            {specialistCall.heading}
          </Dialog.Title>

          <Dialog.Description className="mt-4 text-[15.5px] leading-[1.7] text-slate">
            {specialistCall.body}
          </Dialog.Description>

          {/* A ledger row, like every other record value on the site. */}
          <a
            href={contactPhone.href}
            className="mt-8 flex items-center gap-4 border-y border-rule py-6 text-ink transition-colors hover:text-gold-deep"
          >
            <Phone aria-hidden="true" className="size-5 shrink-0 text-gold" />
            <span className="type-title tnum">{contactPhone.label}</span>
            <span className="type-label ml-auto text-slate">
              {specialistCall.callLabel}
            </span>
          </a>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
