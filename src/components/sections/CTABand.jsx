import { ButtonLink } from "@/components/shared/ButtonLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";

/**
 * The closing navy band. Reused verbatim at the foot of every page on the site
 * — pass different copy, keep the same shape.
 *
 * @param {{
 *   eyebrow: string,
 *   heading: string,
 *   body: string,
 *   primary: import("@/data/types").NavLink,
 *   secondary?: import("@/data/types").NavLink,
 *   headingId?: string,
 * }} props
 */
export function CTABand({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  headingId = "cta-heading",
}) {
  return (
    <SectionShell tone="navyDeep" labelledBy={headingId} className="overflow-hidden">
      {/* The hero's light returns once, centred, to close the page. */}
      <div
        aria-hidden="true"
        className="gold-bloom pointer-events-none absolute -top-32 left-1/2 size-[52rem] -translate-x-1/2 opacity-60"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <Eyebrow tone="navy" align="center">
          {eyebrow}
        </Eyebrow>

        <h2 id={headingId} className="type-display mt-8 text-white">
          {heading}
        </h2>

        <p className="mt-8 text-[17px] leading-[1.7] font-light text-mist">{body}</p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={primary.href} variant="gold" size="heroPill">
            {primary.label} <span aria-hidden="true">&rarr;</span>
          </ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="outlineLight" size="heroPill">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
