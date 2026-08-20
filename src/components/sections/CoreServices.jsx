import Link from "next/link";

import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { services } from "@/data/services";
import { getIcon } from "@/lib/icons";

/**
 * The service lines, set as an index rather than a row of cards.
 *
 * Three boxes say "here are three things". A ruled index — number, plate,
 * name, description, arrow — says "this is the catalogue", which is the
 * register a luxury house writes in. Each row is one link the full width of
 * the measure, and hovering sweeps a navy fill in from the left so the whole
 * line inverts at once instead of a small button lighting up.
 *
 * The plate is the one object in the row: the property type that line of
 * business is bought for — a house, a walk-up, an office block. It sits held
 * back at rest so the ivory page stays quiet, and comes up to full colour
 * with the rest of the line on hover.
 */
export function CoreServices() {
  return (
    <SectionShell tone="white" labelledBy="core-services-heading">
      <div className="max-w-2xl">
        <Eyebrow>Our core services</Eyebrow>
        <h2 id="core-services-heading" className="type-heading mt-7 text-ink">
          Three service lines, one standard
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">
          Every report is researched from the record and verified before it reaches your
          file — so your team can close without surprises.
        </p>
      </div>

      <ol className="mt-16 border-t border-rule lg:mt-20">
        {services.map((service) => {
          const Icon = getIcon(service.icon);
          return (
            <li key={service.id} className="border-b border-rule">
              <Link
                href={service.link.href}
                className="group/row relative -mx-6 block overflow-hidden px-6 md:-mx-10 md:px-10"
              >
                {/* The fill, swept in from the left. It sits under everything
                    and every foreground colour flips against it. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-600 ease-[var(--ease-quiet)] group-hover/row:scale-x-100"
                />

                <div className="relative grid grid-cols-1 gap-x-10 gap-y-4 py-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_3rem] lg:items-center lg:gap-y-0 lg:py-10">
                  {/* The index and the name are one line, not two columns.
                      A grid column of its own put a fixed gap between "01"
                      and the thing it numbers — and at `lg` an empty 11rem
                      column as well, left behind by the plate that used to
                      sit there. A number belongs against its title. */}
                  <div className="flex items-baseline gap-x-3 lg:col-start-1">
                    <span className="type-label tnum shrink-0 text-gold-deep transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/row:text-gold-light">
                      {service.number}
                    </span>

                    <h3 className="type-title text-ink transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/row:text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="max-w-xl text-[15.5px] leading-[1.7] text-slate transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/row:text-mist lg:col-start-2">
                    {service.body}
                  </p>

                  {/* The icon stands in for the arrow until there is room for
                      both; on wide screens it hands over to the caret. */}
                  <span className="flex items-center gap-3 lg:col-start-3 lg:justify-end">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="size-5 text-navy/30 transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/row:text-gold-light lg:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className="text-[20px] leading-none text-navy/40 transition-[color,transform] duration-500 ease-[var(--ease-quiet)] group-hover/row:translate-x-1 group-hover/row:text-gold-light"
                    >
                      &rarr;
                    </span>
                    <span className="type-label text-gold-deep transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/row:text-gold-light lg:sr-only">
                      {service.link.label}
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
