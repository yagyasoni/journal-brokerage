import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";

/**
 * One service line, set as a spread: the explanation holds the left measure
 * while the ledger of deliverables runs down the right.
 *
 * The pairing is the point. A list of twenty-one products on its own reads as
 * a price sheet; held beside the paragraph that frames it, each ledger reads
 * as the contents of a document — which is how this industry thinks about a
 * file. On wide screens the explanation stays with the reader as the ledger
 * scrolls past it, so the two never come apart.
 *
 * @param {{
 *   block: (typeof import("@/data/solutions").solutionBlocks)[number],
 *   tone?: "white" | "paper",
 * }} props
 */
export function SolutionBlock({ block, tone = "white" }) {
  const { eyebrow, title, overview, deliverables, ledgerLabel, link, headingId } = block;

  return (
    <SectionShell tone={tone} labelledBy={headingId}>
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {/* The explanation. Sticky only where there is room for it to travel. */}
        <div>
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{eyebrow}</Eyebrow>

            {/* `scroll-mt` clears the sticky bar when the page index jumps here. */}
            <h2 id={headingId} className="type-heading mt-7 scroll-mt-28 text-ink">
              {title}
            </h2>

            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{overview}</p>

            <ArrowLink href={link.href} className="mt-10">
              {link.label}
            </ArrowLink>
          </div>
        </div>

        {/* The ledger. Hairlines only — this is a document, not a card grid. */}
        <div>
          <p className="type-label text-slate">{ledgerLabel}</p>

          <dl className="mt-6 border-t border-rule">
            {deliverables.map((deliverable) => (
              <div
                key={deliverable.name}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-5 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
              >
                <dt className="type-label pt-1 leading-relaxed text-gold-deep">
                  {deliverable.name}
                </dt>
                <dd className="text-[15.5px] leading-[1.7] text-slate">
                  {deliverable.definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>
  );
}
