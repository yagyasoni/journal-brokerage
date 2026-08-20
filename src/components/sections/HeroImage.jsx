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
 *
 * @param {{ src: string }} props
 */
export function HeroImage({ src }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-still absolute inset-0" />

      <div className="hero-fade absolute inset-0">
        <div className="hero-drift absolute inset-0">
          {/* Decorative: the copy above carries the meaning, so no alt text. */}
          <Image
            src={src}
            alt=""
            fill
            priority
            sizes="100vw"
            // The push takes the picture to 1.34, so most of what is on
            // screen is enlarged. At the default quality of 75 the night sky
            // bands visibly once magnified.
            quality={90}
            className="hero-push object-cover"
          />
        </div>
      </div>
    </div>
  );
}
