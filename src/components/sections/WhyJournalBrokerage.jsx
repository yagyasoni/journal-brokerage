import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { StatStrip, StatTile } from "@/components/shared/StatTile";
import { routes } from "@/data/nav";
import { promises, stats } from "@/data/promises";
import { getIcon } from "@/lib/icons";

/**
 * The dark centre of the page.
 *
 * The three promises used to be boxes on navy — a box on a dark ground is a
 * hole, not an object. They are columns now, separated by nothing but a gold
 * hairline and a great deal of air, each opening on an oversized numeral. The
 * band reads as a single held statement rather than three parked tiles.
 */
export function WhyJournalBrokerage() {
  return (
    <SectionShell tone="navy" labelledBy="why-heading" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="gold-bloom pointer-events-none absolute -top-40 left-1/2 size-[54rem] -translate-x-1/2 opacity-70"
      />
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Eyebrow tone="navy" align="center">
          Why Journal Brokerage
        </Eyebrow>
        <h2 id="why-heading" className="type-heading mt-7 text-white">
          Authentic data, delivered on time
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-[17px] leading-[1.7] text-mist">
          Precision here isn&rsquo;t an option, it&rsquo;s the standard — cost-effective,
          authentic research inside the turnaround you commit to your client.
        </p>
      </div>

      <ol className="relative mt-20 grid gap-y-14 lg:mt-24 lg:grid-cols-3 lg:gap-x-0">
        {promises.map((promise, index) => {
          const Icon = getIcon(promise.icon);
          return (
            <li
              key={promise.id}
              className="group/promise relative lg:px-10 lg:not-first:border-l lg:not-first:border-gold/25 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-center justify-between gap-5">
                <span className="tnum text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none font-extralight text-gold-light/50 transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/promise:text-gold-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Held at the far edge of the column, so it reads as a mark on
                    the rule rather than a speck beside the numeral. */}
                <Icon
                  aria-hidden="true"
                  strokeWidth={1}
                  className="size-7 shrink-0 text-gold-light/45 transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/promise:text-gold-light/80"
                />
              </div>

              <div aria-hidden="true" className="mt-7 h-px w-full bg-white/15" />

              <h3 className="type-title mt-7 text-white">{promise.title}</h3>
              <p className="mt-4 max-w-sm text-[15.5px] leading-[1.7] text-mist">
                {promise.body}
              </p>
            </li>
          );
        })}
      </ol>

      <StatStrip className="relative mt-20 lg:mt-28">
        {stats.map((stat) => (
          <StatTile key={stat.caption} value={stat.value} caption={stat.caption} />
        ))}
      </StatStrip>

      <div className="relative mt-14 flex justify-center">
        <ArrowLink href={routes.whyUs} tone="navy">
          More on how we work
        </ArrowLink>
      </div>
    </SectionShell>
  );
}
