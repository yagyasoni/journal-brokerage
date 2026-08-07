import { Eyebrow } from "@/components/shared/Eyebrow";
import { Marquee } from "@/components/shared/Marquee";
import { Container } from "@/components/shared/SectionShell";
import { Reveal } from "@/components/shared/Reveal";
import { brand } from "@/data/nav";
import { trustMarquee } from "@/data/promises";

/**
 * The band the hero hands off to.
 *
 * A luxury site earns its second screen with a held breath, not another grid:
 * one statement, set large and light on cream, framed by gold hairlines. The
 * moving strip beneath it carries the practice marks — so the page has motion
 * above and below the fold, and the statement gets to sit still.
 */
export function StatementBand() {
  return (
    <section aria-label="The practice" className="relative bg-paper">
      <Reveal>
        <Container className="py-24 text-center md:py-32">
          <Eyebrow align="center">The practice</Eyebrow>

          <p className="type-statement mx-auto mt-9 max-w-3xl text-ink">
            {brand.statement}
          </p>

          <div aria-hidden="true" className="mx-auto mt-12 h-px w-20 bg-gold" />
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
