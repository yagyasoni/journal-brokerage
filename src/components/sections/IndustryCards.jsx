import { Chip, ChipRow } from "@/components/shared/Chip";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { industries, industriesSection } from "@/data/industries";

/**
 * The customer types, as described records rather than boxes.
 *
 * The recognition this section is for happens at the job title, not the
 * industry name — a closing manager scanning the page is looking for her own
 * role. So the roles are the loudest thing in each entry after the name, set
 * as muted chips: taxonomy, not buttons.
 */
export function IndustryCards() {
  const { eyebrow, headingId, heading, intro, rolesLabel } = industriesSection;

  return (
    <SectionShell tone="paper" labelledBy={headingId}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-ink">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
      </div>

      <ol className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-2 lg:mt-20">
        {industries.map((industry, index) => (
          <li key={industry.id} className="border-t border-rule pt-8">
            <span className="type-label tnum text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* `scroll-mt` clears the sticky bar when a hero chip jumps here. */}
            <h3
              id={`industry-${industry.id}`}
              className="type-title mt-4 scroll-mt-28 text-ink"
            >
              {industry.title}
            </h3>

            <p className="mt-3.5 text-[15.5px] leading-[1.7] text-slate">
              {industry.body}
            </p>

            {industry.roles.length > 0 ? (
              <>
                <p className="type-label mt-8 text-slate">{rolesLabel}</p>
                <ChipRow className="mt-4">
                  {industry.roles.map((role) => (
                    <Chip key={role} variant="muted">
                      {role}
                    </Chip>
                  ))}
                </ChipRow>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
