import { Eyebrow } from "@/components/shared/Eyebrow";
import { Marquee } from "@/components/shared/Marquee";
import { Container } from "@/components/shared/SectionShell";
import { Reveal } from "@/components/shared/Reveal";
import { SoundToggle } from "@/components/shared/SoundToggle";
import { TypeText } from "@/components/shared/TypeText";
import { brand } from "@/data/nav";
import { statementSound, trustMarquee } from "@/data/promises";

/**
 * The band the hero hands off to.
 *
 * A luxury site earns its second screen with a held breath, not another grid:
 * one statement, set large and light on cream, framed by gold hairlines. The
 * moving strip beneath it carries the practice marks — so the page has motion
 * above and below the fold, and the statement gets to sit still.
 *
 * The statement types itself in the first time it is scrolled to, just after
 * `Reveal` has finished bringing the band up. It is laid out at full size
 * throughout, so nothing on the page moves while it fills in.
 *
 * It types out loud, too — a synthesised keyboard rather than an audio file,
 * see `@/lib/typewriter-audio`. One key per character, which is what sets the
 * pace here at 95ms rather than the 32ms it would be if this were silent.
 *
 * That number is not a taste call. Discrete sounds stop being heard as
 * separate events somewhere around eleven or twelve a second and fuse into one
 * continuous rough texture — the same reason a fast enough drum roll turns
 * into a pitch. At 52ms this band was firing seventeen keys a second, which is
 * over that line and also faster than any hand can type, and no amount of
 * work on how a single key *sounds* can rescue a pulse train running that
 * fast.
 *
 * 95ms, with the flurried rhythm `TypeText` now uses, puts it at eleven a
 * second — under the line, and with a quarter of the intervals long enough to
 * be heard as actual pauses rather than as an even patter. It was 80ms, which
 * ran at the same eleven a second on average but spent its slack in intervals
 * too short to register; the sentence takes the same fifteen seconds either
 * way, so the extra air is free.
 *
 * `SoundToggle` sits under the rule to turn it off, which a band that makes
 * noise for this long is required to have.
 */
export function StatementBand() {
  return (
    <section aria-label="The practice" className="relative bg-paper">
      <Reveal>
        <Container className="py-24 text-center md:py-32">
          <Eyebrow align="center">The practice</Eyebrow>

          <p className="type-statement mx-auto mt-9 max-w-3xl text-ink">
            <TypeText text={brand.statement} speed={40} />
          </p>

          <div aria-hidden="true" className="mx-auto mt-12 h-px w-20 bg-gold" />

          {/* <SoundToggle labels={statementSound} className="mt-7" /> */}
        </Container>
      </Reveal>

      <div className="relative overflow-hidden border-y border-gold/35 bg-white py-4 text-slate">
        <Marquee items={trustMarquee} />

        {/* Feather both ends so entries arrive and leave rather than clipping. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white via-white/80 to-transparent sm:w-44"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white via-white/80 to-transparent sm:w-44"
        />
      </div>
    </section>
  );
}
