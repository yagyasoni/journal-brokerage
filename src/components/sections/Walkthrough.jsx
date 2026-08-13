import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { RecordRow } from "@/components/shared/RecordRow";
import { SectionShell } from "@/components/shared/SectionShell";
import { walkthroughSection, walkthroughSteps } from "@/data/how-it-works";

/**
 * The process, turned on its side.
 *
 * The landing page runs `ProcessSteps` as a horizontal rail — four stops read
 * at a glance. A walkthrough is the opposite job: one step at a time, with
 * room for the annotation. So the rail stands up and runs down the left edge,
 * using the same node and hairline it uses when it stacks on a phone, and each
 * stop opens into what the step actually involves.
 */
export function Walkthrough() {
  const { eyebrow, headingId, heading, intro } = walkthroughSection;

  return (
    <SectionShell tone="paper" labelledBy={headingId}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-ink">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
      </div>

      <ol className="mt-16 lg:mt-20">
        {walkthroughSteps.map((step) => (
          <li
            key={step.id}
            className="group/step relative pb-14 pl-10 last:pb-0 sm:pl-14"
          >
            {/* The rail, standing on its end. Hidden after the last node so the
                sequence ends rather than trailing off. */}
            <span
              aria-hidden="true"
              className="absolute top-3 left-[5px] h-full w-px bg-rule-strong group-last/step:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 size-2.5 rounded-full bg-gold ring-4 ring-paper"
            />

            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
              <div>
                <span className="type-label tnum text-gold-deep">{step.stepLabel}</span>

                {/* `scroll-mt` clears the sticky bar when the index jumps here. */}
                <h3 id={step.headingId} className="type-title mt-5 scroll-mt-28 text-ink">
                  {step.title}
                </h3>

                <p className="mt-3.5 text-[15.5px] leading-[1.7] text-slate">
                  {step.body}
                </p>
              </div>

              <div>
                <p className="text-[17px] leading-[1.7] text-slate">{step.detail}</p>

                <dl className="mt-8 border-t border-rule bg-white">
                  {step.facts.map((fact) => (
                    <RecordRow
                      key={fact.label}
                      label={fact.label}
                      value={fact.value}
                      mono={fact.mono}
                    />
                  ))}
                </dl>

                {step.link ? (
                  <ArrowLink href={step.link.href} className="mt-8">
                    {step.link.label}
                  </ArrowLink>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
