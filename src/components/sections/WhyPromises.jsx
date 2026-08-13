import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { promisesSection, whyPromises } from "@/data/why-us";
import { getIcon } from "@/lib/icons";

/**
 * The three promises, taken apart.
 *
 * On the landing page they are three columns on navy, held as a single
 * statement. Here they are entries in a register: the promise as it is stated
 * everywhere, then the paragraph that explains what it costs to keep, then the
 * short list of what it means once a live file is on the desk. Same three
 * sentences at the top of each — read from `promises.js`, never re-typed.
 */
export function WhyPromises() {
  const { eyebrow, headingId, heading, intro } = promisesSection;

  return (
    <SectionShell tone="paper" labelledBy={headingId}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-ink">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
      </div>

      <ol className="mt-16 border-t border-rule lg:mt-20">
        {whyPromises.map((promise) => {
          const Icon = getIcon(promise.icon);

          return (
            <li key={promise.id} className="border-b border-rule py-12 lg:py-16">
              <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div>
                  <div className="flex items-center justify-between gap-5">
                    <span className="tnum text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none font-extralight text-gold">
                      {promise.number}
                    </span>
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1}
                      className="size-7 shrink-0 text-gold/60"
                    />
                  </div>

                  <div aria-hidden="true" className="mt-7 h-px w-full bg-rule-strong" />

                  <h3 id={promise.headingId} className="type-title mt-7 text-ink">
                    {promise.title}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-slate">
                    {promise.body}
                  </p>
                </div>

                <div>
                  <p className="text-[17px] leading-[1.7] text-slate">{promise.detail}</p>

                  <ul className="mt-9 border-t border-rule">
                    {promise.practice.map((item) => (
                      <li
                        key={item}
                        className="border-b border-rule py-3.5 text-[14.5px] leading-snug text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
