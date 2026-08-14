"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Which edge each piece is hinged on, and which way it starts folded away. */
const HINGES = {
  top: { origin: "50% 0%", rotateX: -92, rotateY: 0 },
  bottom: { origin: "50% 100%", rotateX: 92, rotateY: 0 },
  left: { origin: "0% 50%", rotateX: 0, rotateY: 92 },
  right: { origin: "100% 50%", rotateX: 0, rotateY: -92 },
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Text that unfolds into place: every piece starts rotated flat about one edge
 * and swings down to face the reader, staggered across the line, with a crease
 * shadow that rakes off the glyph as it opens.
 *
 * Typography is deliberately not a prop. The component inherits size, weight,
 * tracking and case from whatever `type-*` class the call site put on the
 * parent element — see invariant 1 in CLAUDE.md. The visual state lives in
 * globals.css under `.fold-text*`; this file only drives it, the same division
 * `Reveal` uses.
 *
 * Splitting by character wraps each word in a `nowrap` box so the line still
 * breaks and balances between words rather than mid-word.
 *
 * The pieces render already folded away, so the server output matches the first
 * frame of the tween and there is no flash of settled text before it starts.
 * `@media (scripting: none)` in globals.css puts them back for readers with no
 * JavaScript.
 *
 * @param {{
 *   text: string,
 *   splitBy?: "char" | "word" | "line",
 *   hinge?: "top" | "bottom" | "left" | "right",
 *   trigger?: "mount" | "hover" | "loop",
 *   duration?: number,
 *   stagger?: number,
 *   ease?: string,
 *   perspective?: number,
 *   creaseShading?: number,
 *   className?: string,
 * }} props
 */
export function FoldText({
  text,
  splitBy = "char",
  hinge = "top",
  trigger = "mount",
  duration = 0.65,
  stagger = 0.045,
  ease = "power3.out",
  perspective = 700,
  creaseShading = 0.55,
  className,
  ...props
}) {
  const rootRef = useRef(null);

  const config = HINGES[hinge] ?? HINGES.top;
  const crease = clamp(creaseShading, 0, 1);
  const depth = Math.max(120, perspective);

  // On hover the line has to be readable before the cursor ever arrives, so it
  // starts settled; every other trigger starts folded away.
  const startFolded = trigger !== "hover";

  const content = useMemo(() => {
    const segment = (value, key) => (
      <span
        className="fold-text-segment"
        key={key}
        style={{ "--fold-perspective": `${depth}px` }}
      >
        <span
          className="fold-text-piece"
          data-fold-hinge={hinge}
          style={{
            transformOrigin: config.origin,
            "--fold-crease": startFolded ? crease : 0,
            ...(startFolded && {
              opacity: 0,
              transform: `rotateX(${config.rotateX}deg) rotateY(${config.rotateY}deg)`,
            }),
          }}
        >
          {value}
        </span>
      </span>
    );

    if (splitBy === "line") {
      return text.split("\n").map((line, index) => (
        <span className="fold-text-line" key={`line-${index}`}>
          {segment(line || " ", `line-piece-${index}`)}
        </span>
      ));
    }

    // A real space between the words, not a non-breaking one: it is the only
    // thing left for the line to break on once every piece is inline-block.
    return text.split(/(\s+)/).flatMap((part, index) => {
      if (!part) return [];
      if (/^\s+$/.test(part)) return [" "];
      if (splitBy === "word") return segment(part, `word-${index}`);

      return (
        <span className="fold-text-word" key={`word-${index}`}>
          {Array.from(part).map((char, charIndex) =>
            segment(char, `char-${index}-${charIndex}`)
          )}
        </span>
      );
    });
  }, [text, splitBy, hinge, config, crease, depth, startFolded]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const pieces = gsap.utils.toArray(".fold-text-piece", root);
    if (!pieces.length) return undefined;

    const settled = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      "--fold-crease": 0,
      transformOrigin: config.origin,
    };

    // Honour the OS setting by not animating at all, the way `Reveal` does.
    // The blanket override in globals.css cannot help here — it caps CSS
    // animations, and GSAP writes inline styles instead.
    if (window.matchMedia?.(REDUCED_MOTION).matches) {
      gsap.set(pieces, settled);
      return undefined;
    }

    const from = {
      ...settled,
      opacity: 0,
      rotateX: config.rotateX,
      rotateY: config.rotateY,
      "--fold-crease": crease,
      willChange: "transform, opacity",
      force3D: true,
    };

    const to = { ...settled, duration, ease, stagger, clearProps: "willChange" };

    let timeline = null;

    const play = () => {
      timeline?.kill();
      timeline = gsap.timeline({
        repeat: trigger === "loop" ? -1 : 0,
        repeatDelay: trigger === "loop" ? 0.75 : 0,
      });
      timeline.fromTo(pieces, from, to);
    };

    if (trigger === "hover") {
      gsap.set(pieces, settled);
      root.addEventListener("mouseenter", play);
    } else {
      play();
    }

    return () => {
      root.removeEventListener("mouseenter", play);
      timeline?.kill();
      gsap.killTweensOf(pieces);
    };
  }, [text, splitBy, config, crease, duration, stagger, ease, trigger]);

  return (
    <span ref={rootRef} className={cn("fold-text", className)} {...props}>
      <span className="fold-text-sr-only">{text}</span>
      <span aria-hidden="true" className="fold-text-visual">
        {content}
      </span>
    </span>
  );
}
