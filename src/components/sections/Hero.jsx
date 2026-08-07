import { HeroVideo } from "@/components/sections/HeroVideo";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/SectionShell";
import { routes } from "@/data/nav";

const TRUST_CHIPS = [
  "Source verified",
  "Six Sigma standard",
  "Fast turnaround",
  "Closing-ready",
];

/**
 * The cinematic opening: a full-viewport frame of footage, one centred line of
 * tracked uppercase, one line of copy, one pill action — and a hairline rail
 * along the bottom edge.
 *
 * The negative top margin pulls the section up under the sticky bar so the
 * footage runs edge to edge behind it; the matching top padding puts the copy
 * back on the optical centre. `Nav` goes transparent over this section on the
 * home route, which is the other half of the same effect. The offsets are the
 * bar's full expanded height — crest row, hairline, menu row.
 */
export function Hero() {
  return (
    <section
      className="relative -mt-[70px] flex min-h-svh flex-col overflow-hidden bg-navy-black text-white md:-mt-[74px]"
      aria-labelledby="hero-heading"
    >
      <HeroVideo />

      <div aria-hidden="true" className="hero-veil absolute inset-0" />

      <div className="relative flex flex-1 items-center justify-center pt-[165px] pb-24 md:pt-[177px] md:pb-28">
        <Container className="text-center">
          <h1 id="hero-heading" className="type-display mx-auto max-w-4xl text-white">
            Source-verified property intelligence
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-[1.6] font-light text-white/85 sm:text-[19px]">
            Title, tax, and municipal lien research — delivered closing-ready.
          </p>

          <div className="mt-11 flex justify-center">
            <ButtonLink href={routes.order} variant="outlineLight" size="heroPill">
              Order a search
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* The bottom rail, in the reference's position: a hairline and a row of
          quiet marks that give the frame a floor to sit on. */}
      <div className="relative border-t border-white/20">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 py-5 sm:justify-between sm:gap-x-6 sm:py-6">
            {TRUST_CHIPS.map((chip) => (
              <li key={chip} className="type-label whitespace-nowrap text-white/75">
                {chip}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
