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
 * Which only holds if nothing inside it is given a fixed size. On a phone the
 * copy used to be pushed clear of the picture band by a top padding of
 * `--hero-band`, and a reserved height plus the stack's own height is not one
 * screen — it is whatever the two happen to add up to, so the rail dropped
 * below the fold on any handset where that came to more than the viewport.
 * The copy hangs off the bottom of the frame instead now. It takes the height
 * it needs, the picture takes what is left above it, and the two meet wherever
 * the screen says they meet: nothing reserves space it might not have.
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

      <div className="relative flex flex-1 items-end pt-(--band-pad-tight) pb-(--band-pad-tight) sm:items-center sm:pt-[calc(var(--nav-h)+var(--band-pad-tight))]">
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

            {/* The standfirst, in capitals — set the way capitals have to be
                set to stay elegant rather than shouted.

                Uppercase removes every ascender and descender, so the word
                shapes a reader normally scans by are gone and the letters have
                to be told apart one at a time. That is survivable at this
                length, but only if the setting gives it room — and the room
                comes from tracking, weight and leading, not from size. Wide
                letter-spacing puts air between forms that have lost their
                silhouettes; the lightest weight stops the line competing with
                the display headline above it; near-double leading keeps two
                capital lines from stacking into a block.

                Semibold at default tracking — what this was — is the one
                combination that makes capitals read as shouting.

                `uppercase` rather than `.toUpperCase()`: the case is a
                typographic decision, so it lives in the styling and the
                sentence stays a sentence in `hero.js`. */}
            <p
              className="hero-rise mt-8 max-w-lg text-[15.5px] leading-[2] font-medium tracking-[0.16em] text-balance text-white/90 uppercase sm:text-[17px] sm:tracking-[0.18em]"
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
          quiet marks that give the frame a floor to sit on.

          Two arrangements, because one row of four does not survive a phone.
          The marks are different lengths, so a wrapping flex row packed them
          left and broke wherever the widths happened to run out — three on one
          line and a lonely fourth under them, which reads as a mistake rather
          than as a rail. A two-column grid cannot do that: whatever the
          viewport, it is always two even rows of two, aligned to the same left
          edges as the copy above. From `sm` the row fits across the full
          measure and the original spread returns untouched.

          `.hero-marks` (globals.css) keeps each mark on a single line at any
          width — a mark broken across two lines was the other half of what
          made this rail look accidental. */}
      <div className="relative border-t border-white/20">
        <Container>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 py-5 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2.5 sm:py-6">
            {homeHero.marks.map((mark) => (
              <li key={mark} className="type-label hero-marks text-white/75">
                {mark}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
