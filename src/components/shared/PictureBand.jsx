import Image from "next/image";

import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { Container } from "@/components/shared/SectionShell";
import { cn } from "@/lib/utils";

/**
 * The one photograph on an interior page, arranged five different ways.
 *
 * Every interior page opens the same way — heading, paragraph, a ruled index
 * or a column of figures — and then runs on in hairlines to the footer. That
 * reads as a document, which is right, but a document with no held breath in
 * it reads as a long one. This is the breath.
 *
 * The five pages used to share one arrangement, which made five different
 * photographs look like one photograph reprinted. They now share only their
 * copy shape; the arrangement is the page's own, chosen for what its picture
 * actually holds:
 *
 *   `cinema`  one screen of photograph, copy held over its floor — the only
 *             variant that lets the picture behave like the home hero.
 *   `split`   the screen divided down the middle, picture against copy, the
 *             two meeting on a hard vertical edge.
 *   `portal`  the picture as a tall print on a light wall, hung off-centre
 *             inside an offset gold frame, copy beside it.
 *   `strip`   a letterbox across the top with the copy centred underneath —
 *             the one arrangement where type never sits on the photograph.
 *   `frame`   the picture cut off by a solid card that overlaps its lower
 *             edge and carries the copy down onto the page.
 *
 * Every height here is a fraction of the viewport, never a pixel count, so
 * each arrangement holds its proportions from a phone to a wide monitor.
 *
 * Unlike the hero picture, these are not decorative: each is the only image on
 * its page, so it carries real alt text and no motion at all.
 *
 * @param {{
 *   band: import("@/data/types").PictureBand,
 *   headingId: string,
 * }} props
 */
export function PictureBand({ band, headingId }) {
  const Layout = LAYOUTS[band.variant] ?? Cinema;
  return <Layout band={band} headingId={headingId} />;
}

/* -------------------------------------------------------------------------
   The copy, which is the one thing all five share.
   ---------------------------------------------------------------------- */

/**
 * @param {{
 *   band: import("@/data/types").PictureBand,
 *   headingId: string,
 *   ground?: "dark" | "light",
 *   rule?: boolean,
 *   align?: "start" | "center",
 *   className?: string,
 * }} props
 */
function BandCopy({
  band,
  headingId,
  ground = "dark",
  rule = true,
  align = "start",
  className,
}) {
  const dark = ground === "dark";
  return (
    <div
      className={cn(
        rule && "border-l border-gold/50 pl-6 md:pl-10",
        align === "center" && "text-center",
        className
      )}
    >
      <Eyebrow tone={dark ? "navy" : "light"} align={align}>
        {band.eyebrow}
      </Eyebrow>

      <h2
        id={headingId}
        className={cn("type-heading mt-7", dark ? "text-white" : "text-ink")}
      >
        {band.heading}
      </h2>

      <p
        className={cn(
          "mt-7 text-[17px] leading-[1.7]",
          dark ? "text-mist" : "text-slate"
        )}
      >
        {band.body}
      </p>
    </div>
  );
}

/** The shared `next/image` call. Only the crop differs between pages. */
function BandImage({ band, sizes = "100vw", className }) {
  return (
    <Image
      src={band.image}
      alt={band.alt}
      fill
      sizes={sizes}
      // These are dusk exteriors shown large; at the default quality of 75
      // their darkest gradients — sky, wet asphalt — band visibly.
      quality={90}
      className={cn("object-cover", className)}
      style={{ objectPosition: band.focus ?? "center" }}
    />
  );
}

/* -------------------------------------------------------------------------
   The five arrangements.
   ---------------------------------------------------------------------- */

/** One screen of photograph, copy held over its floor. */
function Cinema({ band, headingId }) {
  return (
    <section
      aria-labelledby={headingId}
      className="band relative isolate snap-start overflow-hidden bg-navy-black"
    >
      <BandImage band={band} />
      <div aria-hidden="true" className="picture-band-veil absolute inset-0" />

      {/* `mt-auto` over the band's centring: the copy takes the floor. */}
      <Container className="relative mt-auto py-(--band-pad)">
        <Reveal>
          <BandCopy band={band} headingId={headingId} className="max-w-xl" />
        </Reveal>
      </Container>
    </section>
  );
}

/** The screen divided, picture against copy, meeting on a hard edge. */
function Split({ band, headingId }) {
  return (
    <section aria-labelledby={headingId} className="band snap-start bg-navy-deep">
      {/* The row lives inside the band rather than replacing it: `.band` owns
          the column direction and the screen height, and this stretches to
          fill it. Overriding a utility class's `flex-direction` from a
          breakpoint is a coin-toss on source order — nesting is not. */}
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="relative h-[42svh] w-full shrink-0 overflow-hidden lg:h-auto lg:w-1/2">
          <BandImage band={band} sizes="(min-width: 1024px) 50vw, 100vw" />
          {/* The seam. A hairline of gold is the only thing between the two
              halves — the picture is not faded into the copy. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gold/60 lg:inset-x-auto lg:inset-y-0 lg:right-0 lg:h-auto lg:w-px"
          />
        </div>

        <div className="flex flex-1 items-center px-(--gutter) py-(--band-pad) lg:w-1/2">
          <Reveal className="w-full">
            <BandCopy
              band={band}
              headingId={headingId}
              rule={false}
              className="mx-auto max-w-[34rem]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** A tall print on a light wall, hung inside an offset frame. */
function Portal({ band, headingId }) {
  return (
    <section aria-labelledby={headingId} className="band snap-start bg-paper">
      <Container className="py-(--band-pad)">
        <Reveal>
          <div className="grid items-center gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            <BandCopy
              band={band}
              headingId={headingId}
              ground="light"
              className="max-w-xl"
            />

            <div className="relative">
              {/* The frame is drawn behind and offset, the way a print is
                  hung proud of its mount rather than flush inside it. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-[5%] translate-y-[6%] border border-gold/50"
              />
              <div className="relative h-[46svh] w-full overflow-hidden lg:h-[62svh]">
                <BandImage band={band} sizes="(min-width: 1024px) 42vw, 90vw" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** A letterbox across the top, copy centred underneath it. */
function Strip({ band, headingId }) {
  return (
    <section aria-labelledby={headingId} className="band snap-start bg-navy-deep">
      <div className="relative h-[34svh] w-full overflow-hidden md:h-[44svh]">
        <BandImage band={band} />
        {/* The picture is set into the band rather than laid on it: its lower
            edge dissolves into the navy the copy sits on. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy-deep to-transparent"
        />
      </div>

      <Container className="py-(--band-pad)">
        <Reveal>
          <BandCopy
            band={band}
            headingId={headingId}
            rule={false}
            align="center"
            className="mx-auto flex max-w-2xl flex-col items-center"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/** A card that overlaps the picture's lower edge and carries the copy down. */
function Frame({ band, headingId }) {
  return (
    <section aria-labelledby={headingId} className="band snap-start bg-paper">
      <div className="relative h-[48svh] w-full overflow-hidden md:h-[56svh]">
        <BandImage band={band} />
      </div>

      <Container>
        <Reveal>
          {/* Pulled up onto the photograph and left standing on the paper —
              the picture is cropped by the copy, not veiled by it. */}
          <div className="relative mt-[-12svh] max-w-2xl border-t-2 border-gold bg-navy-deep p-[clamp(1.75rem,4vw,3.25rem)]">
            <BandCopy band={band} headingId={headingId} rule={false} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const LAYOUTS = {
  cinema: Cinema,
  split: Split,
  portal: Portal,
  strip: Strip,
  frame: Frame,
};
