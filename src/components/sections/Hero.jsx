import { HeroImage } from "@/components/sections/HeroImage";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FoldText } from "@/components/shared/FoldText";
import { Container } from "@/components/shared/SectionShell";
import { homeHero } from "@/data/hero";

/**
 * The cinematic opening: a full-viewport photograph pushed slowly in, one
 * column of copy held against the left edge of the measure, one pill action —
 * and a hairline rail along the bottom edge.
 *
 * The copy sits left rather than centred because the picture is not flat: the
 * house is lit and to the right, the street is dark and to the left. Setting
 * the stack over the dark side means the veil can stay light enough for the
 * photograph to still read as a place, and the gold hairline down the left of
 * the stack gives the column an edge to hang from.
 *
 * The negative top margin pulls the section up under the sticky bar so the
 * frame runs edge to edge behind it; the matching top padding puts the copy
 * back on the optical centre. `Nav` goes transparent over this section on the
 * home route, which is the other half of the same effect. Both offsets read
 * `--nav-h` (globals.css) rather than a typed number, so they cannot drift
 * apart from the bar they are measured against.
 *
 * The frame is exactly one screen: `.hero-frame` is `100svh + --nav-h`, and
 * the section is pulled up by `--nav-h`, so its bottom edge — the rail of
 * marks — lands precisely on the fold at every viewport, phone included.
 *
 * The whole stack arrives rather than appears: the headline unfolds letter by
 * letter (`FoldText`) and the eyebrow, line and action lift in behind it on
 * their own beats. Nothing moves at all under reduced motion. `type-display`
 * still owns every typographic decision.
 */
export function Hero() {
  return (
    <section
      className="hero-frame relative -mt-(--nav-h) flex snap-start flex-col overflow-hidden bg-navy-black text-white"
      aria-labelledby="hero-heading"
    >
      <HeroImage src={homeHero.image} />

      <div aria-hidden="true" className="hero-veil absolute inset-0" />

      <div className="relative flex flex-1 items-center pt-[calc(var(--nav-h)+var(--band-pad-tight))] pb-(--band-pad-tight)">
        <Container>
          <div className="max-w-2xl border-l border-gold/50 pl-6 md:pl-10">
            <div className="hero-rise" style={{ "--rise-delay": "80ms" }}>
              <Eyebrow tone="navy">{homeHero.eyebrow}</Eyebrow>
            </div>

            <h1 id="hero-heading" className="type-display mt-7 text-white">
              <FoldText
                text={homeHero.heading}
                splitBy="char"
                hinge="bottom"
                trigger="mount"
                duration={0.5}
                stagger={0.011}
                perspective={620}
                creaseShading={0.55}
              />
            </h1>

            <p
              className="hero-rise mt-7 max-w-xl text-[17px] leading-[1.6] font-light text-white/85 sm:text-[19px]"
              style={{ "--rise-delay": "620ms" }}
            >
              {homeHero.body}
            </p>

            <div className="hero-rise mt-11 flex" style={{ "--rise-delay": "780ms" }}>
              <ButtonLink
                href={homeHero.action.href}
                variant="outlineLight"
                size="heroPill"
              >
                {homeHero.action.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      {/* The bottom rail, in the reference's position: a hairline and a row of
          quiet marks that give the frame a floor to sit on. */}
      <div className="relative border-t border-white/20">
        <Container>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2.5 py-5 sm:justify-between sm:gap-x-6 sm:py-6">
            {homeHero.marks.map((mark) => (
              <li key={mark} className="type-label whitespace-nowrap text-white/75">
                {mark}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
