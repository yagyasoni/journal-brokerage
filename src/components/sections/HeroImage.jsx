import Image from "next/image";

/**
 * The hero's full-bleed backdrop: one photograph, held alive.
 *
 * This is where the looping video used to be. A still costs ~600KB instead of
 * ~20MB, needs no autoplay permission and no codec negotiation, and — given
 * the right motion — reads as footage all the same. There is no pause control
 * because there is nothing to pause: the animation is decorative, carries no
 * information, and stops outright under `prefers-reduced-motion`.
 *
 * Three nested elements, one job each, because a single element cannot do all
 * three and stay smooth:
 *
 *   `.hero-fade`   fades the picture up off the gradient still underneath, so
 *                  the frame is never empty while the photograph decodes.
 *   `.hero-drift`  moves the frame sideways, very slowly, forever.
 *   `.hero-push`   scales the picture, opening on its full cover fit and
 *                  pushing in from there.
 *
 * Splitting scale from translation is the whole reason this reads as a camera
 * rather than a wobble — see the keyframes in globals.css for why the two run
 * at periods that do not divide into one another.

 * The frame itself is not the same shape on a phone. Full bleed, a portrait
 * viewport scales this 3:2 photograph to a full screen of height and throws
 * most of its width off both edges — so it holds a band across the top
 * (`--hero-band`) instead, and the crop lands on the height. Same picture,
 * nearly all of it visible, and the copy sits below rather than over it.
 *
 * Its bottom edge is masked, not veiled: `.hero-band-dissolve` takes the
 * picture's own alpha to nothing so the section's navy shows through, rather
 * than painting navy on top of it. Overlay and mask look identical in a
 * mockup; on a real photograph only one of them stops looking like a tint.
 *
 * @param {{ src: string }} props
 */
export function HeroImage({ src }) {
  return (
    <>
      {/* Phone only, and the answer to the blue.

          Below the band the frame was the section's own `bg-navy-black` — a
          flat panel filling the lower sixty per cent of the screen, where the
          eye expects the photograph to carry on. No veil or gradient could
          have fixed that, because the panel was never an overlay: it was the
          floor showing through once the picture stopped.

          So the picture does not stop. The same photograph runs full bleed,
          thrown well out of focus and dimmed — the same `src`, `sizes` and
          `quality`, so it is one download drawn twice. The sharp
          band then dissolves into a soft continuation of itself rather than
          into a colour, and the copy underneath still sits on the place. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden sm:hidden"
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          // Deliberately the same `quality` as the band below, not a lower
          // one: `next/image` keys its optimised URL on it, so matching it
          // makes this the identical request and the browser serves it from
          // cache. A cheaper number here would cost a whole second download.
          quality={90}
          className="hero-soft object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="hero-band-dissolve pointer-events-none absolute inset-x-0 top-0 h-(--hero-band) overflow-hidden sm:inset-0 sm:h-auto"
      >
        <div className="hero-still absolute inset-0" />

        <div className="hero-fade absolute inset-0">
          <div className="hero-drift absolute inset-0">
            {/* Decorative: the copy above carries the meaning, so no alt. */}
            <Image
              src={src}
              alt=""
              fill
              priority
              sizes="100vw"
              // The push takes the picture to 1.34, so most of what is on
              // screen is enlarged. At the default quality of 75 the night
              // sky bands visibly once magnified.
              quality={90}
              className="hero-push object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
