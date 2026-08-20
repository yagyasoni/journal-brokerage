"use client";

import { useEffect, useMemo, useRef } from "react";

import { armOnFirstGesture, keystroke } from "@/lib/typewriter-audio";
import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const SPACE = /\s/;

/**
 * The rhythm: how long to wait after typing a given character.
 *
 * This matters more than any amount of work on the sound itself, and the
 * previous version got it subtly but completely wrong. It rolled a die per
 * character — a third fast, one in ten a hesitation, the rest in between — and
 * a per-character die produces a *statistically even* texture. Fast letters
 * came out scattered singly through the sentence rather than clustered, so the
 * gaps never lasted long enough to be heard as gaps. Measured over the
 * statement, only 14% of the intervals were long enough to register as a pause
 * at all, which is why it read as a rate rather than as a person.
 *
 * A hand does not type at a rate. It fires off three or four letters it knows
 * the shape of, stops dead while the next ones are found, and fires again. So
 * the flurry is *stateful* here: one pause buys a run of characters, and the
 * run is what makes the pause audible. Same sentence, same total duration, and
 * now 26% of the intervals are real pauses at nearly five to one contrast
 * between the fastest and the slowest.
 *
 * On top of that: a space is the gap between words, a comma is a breath, a
 * full stop is a thought. The word after a gap starts flowing immediately — a
 * typist pauses *before* a word, not after its first letter.
 *
 * @param {number} speed The unit interval, in milliseconds.
 */
function createRhythm(speed) {
  /** Characters left in the current flurry. */
  let run = 0;

  /** Arms the next flurry: two to five characters. */
  const flurry = () => {
    run = 2 + Math.floor(Math.random() * 4);
  };

  return (char) => {
    if (char === "." || char === "—" || char === ";" || char === ":") {
      run = 0;
      return speed * (3.4 + Math.random() * 1.6);
    }

    if (char === ",") {
      run = 0;
      return speed * (2.4 + Math.random() * 0.9);
    }

    if (SPACE.test(char)) {
      flurry();
      return speed * (1.5 + Math.random() * 0.9);
    }

    // Inside a flurry: as fast as fingers go, and no gap to speak of.
    if (run > 0) {
      run -= 1;
      return speed * (0.4 + Math.random() * 0.22);
    }

    // Between flurries, mid-word: the hand catching up with itself. This is
    // the interval the whole function exists to produce.
    flurry();
    return speed * (1.2 + Math.random() * 1.1);
  };
}

/** How long the caret lingers and fades once the sentence lands. */
const CARET_OUTRO = 900;

/**
 * Types a sentence out once, the first time it scrolls into view — and only
 * while it is in view.
 *
 * Every character is laid out from the start and merely hidden, rather than
 * appended one at a time. That matters here: this text is centred and wraps to
 * four lines, and a growing string would re-wrap and re-centre on every
 * keystroke, sliding the finished lines around and pushing the rest of the page
 * down. Hiding pre-placed characters means the paragraph occupies its final box
 * from the first frame and nothing below it ever moves.
 *
 * The characters render *visible*, and JS hides them on mount. So the server
 * sends the real sentence — it is also the site's meta description — and a
 * reader with no JavaScript, or with reduced motion, simply gets the paragraph.
 * The band sits well below the fold, so the arming happens off-screen.
 *
 * Typography is not a prop: the parent's `type-*` class owns all of it.
 *
 * `sound` gives the writing a voice: one keystroke per character, on the exact
 * frame that character lands — see `@/lib/typewriter-audio`. There is no
 * throttle between the two, so they cannot drift apart; the rhythm they share
 * comes from `beat` above, which is uneven on purpose. Off by default, because
 * a paragraph that makes a noise is a decision a page has to take deliberately.
 * It is silent under reduced motion for the same reason the typing is: it
 * never arms.
 *
 * It also stops the moment the band is scrolled off. Sound coming from a
 * section that is no longer on screen is the one thing an ambient effect can
 * do that is genuinely rude, and the sentence has no reason to go on writing
 * itself to an empty room either — so both hold on the character they reached
 * and carry on from it if the reader comes back.
 *
 * @param {{
 *   text: string,
 *   speed?: number,
 *   startDelay?: number,
 *   threshold?: number,
 *   cursorCharacter?: string,
 *   sound?: boolean,
 *   className?: string,
 * }} props
 */
export function TypeText({
  text,
  speed = 22,
  startDelay = 400,
  threshold = 0.4,
  cursorCharacter = "|",
  sound = false,
  className,
  ...props
}) {
  const rootRef = useRef(null);

  // Built once per sentence. The typing itself is driven straight against the
  // DOM in the effect — re-rendering 165 spans on every keystroke would be a
  // lot of React for something the browser can do by flipping an attribute.
  const content = useMemo(() => {
    let index = 0;

    return text.split(/(\s+)/).flatMap((part, partIndex) => {
      if (!part) return [];
      if (/^\s+$/.test(part)) {
        // A real, breakable space. It still consumes indices so the caret
        // pauses between words the way a typist does.
        index += part.length;
        return [" "];
      }

      return (
        <span className="type-text-word" key={`w-${partIndex}`}>
          {Array.from(part).map((char, charIndex) => (
            <span
              className="type-text-char"
              data-i={index++}
              key={`c-${partIndex}-${charIndex}`}
            >
              {char}
            </span>
          ))}
        </span>
      );
    });
  }, [text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const chars = [...root.querySelectorAll(".type-text-char")];
    if (!chars.length) return undefined;

    // No observer, or the reader asked for less motion: leave the sentence
    // exactly as it was served. Never arm, so nothing can hide it.
    if (
      window.matchMedia?.(REDUCED_MOTION).matches ||
      !("IntersectionObserver" in window)
    ) {
      return undefined;
    }

    root.dataset.state = "armed";
    root.style.setProperty("--type-caret", `"${cursorCharacter}"`);

    // Autoplay policy: the context can only be built and resumed off a real
    // gesture, and scrolling is not one. Set the trap now so that by the time
    // the band is reached the context is usually already running.
    const disarmAudio = sound ? armOnFirstGesture() : undefined;

    const indices = chars.map((c) => Number(c.dataset.i));
    const total = text.length;
    const nextBeat = createRhythm(speed);

    let timer;
    let caret = null;
    let at = 0; // index into the source string, spaces included
    let next = 0; // index into `chars`, the printable ones
    let started = false;
    let finished = false;
    let onscreen = false;

    const setCaret = (el, mode) => {
      if (caret && caret !== el) delete caret.dataset.caret;
      if (el) el.dataset.caret = mode;
      caret = el;
    };

    const step = () => {
      while (next < chars.length && indices[next] < at) {
        chars[next].dataset.typed = "";
        next += 1;
      }

      if (at >= total) {
        finished = true;
        root.dataset.state = "done";
        setCaret(chars[chars.length - 1], "end");
        timer = setTimeout(() => setCaret(null), CARET_OUTRO);
        return;
      }

      // Scrolled away mid-sentence: hold on this character. Nothing is typed
      // and — the point of it — no key is struck, because a paragraph nobody
      // is looking at has no business still making a noise three screens up.
      // `resume` below picks the sentence up from exactly here.
      if (!onscreen) return;

      setCaret(chars[next] ?? null, "next");

      // One key, for the character being typed on this very tick. `at`
      // indexes the source string, so whitespace is visible here even
      // though it prints no `.type-text-char` of its own.
      const char = text[at];
      if (sound) keystroke({ kind: SPACE.test(char) ? "space" : "key", char });

      at += 1;
      timer = setTimeout(step, nextBeat(char));
    };

    // The observer is never disconnected now: it starts the sentence the first
    // time the band is reached, stops it the moment the band leaves, and
    // carries on from the held character when it comes back.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onscreen = entry.isIntersecting;
          if (finished) continue;

          // Silence is immediate: drop the pending tick rather than let one
          // more key fire after the band has gone.
          clearTimeout(timer);
          if (!onscreen) continue;

          if (!started && entry.intersectionRatio >= threshold) {
            started = true;
            root.dataset.state = "typing";
            timer = setTimeout(step, startDelay);
          } else if (started) {
            // Back in view. A beat to settle, then on from where it held.
            timer = setTimeout(step, speed * 2);
          }
        }
      },
      // Two thresholds, doing two different jobs: `threshold` is how much of
      // the band has to be showing before it begins, 0 is it having gone
      // entirely. Stopping on the same fraction it starts on would leave the
      // sentence stuttering on and off through the middle of a slow scroll.
      { threshold: [0, threshold] }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      disarmAudio?.();
    };
  }, [text, speed, startDelay, threshold, cursorCharacter, sound]);

  return (
    <span ref={rootRef} className={cn("type-text", className)} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{content}</span>
    </span>
  );
}
