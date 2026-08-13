import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { reachSection } from "@/data/coverage";
import { routes } from "@/data/nav";

/**
 * The question the grid cannot answer.
 *
 * A visitor whose state is not on the list has hit a dead end — and that is
 * exactly the reader most likely to leave. The band exists to catch them, and
 * it is set on navy because it is the one claim on the page that needs to be
 * read rather than scanned.
 */
export function CoverageReach() {
  const { eyebrow, headingId, heading, body, linkLabel } = reachSection;

  return (
    <SectionShell tone="navy" labelledBy={headingId} className="overflow-hidden">
      <div
        aria-hidden="true"
        className="gold-bloom pointer-events-none absolute -top-40 left-1/2 size-[54rem] -translate-x-1/2 opacity-60"
      />

      <div className="relative max-w-2xl">
        <Eyebrow tone="navy">{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-white">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-mist">{body}</p>

        <ArrowLink href={routes.contact} tone="navy" className="mt-10">
          {linkLabel}
        </ArrowLink>
      </div>
    </SectionShell>
  );
}
