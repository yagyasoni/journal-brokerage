"use client";

import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** How long the caret lingers and fades once the sentence lands. */
const CARET_OUTRO = 900;

/**
 * Types a sentence out once, the first time it scrolls into view.
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
 * @param {{
 *   text: string,
 *   speed?: number,
 *   startDelay?: number,
 *   threshold?: number,
 *   cursorCharacter?: string,
 *   className?: string,
 * }} props
 */
export function TypeText({
  text,
  speed = 22,
  startDelay = 400,
  threshold = 0.4,
  cursorCharacter = "|",
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

    const indices = chars.map((c) => Number(c.dataset.i));
    const total = text.length;
    let timer;
    let caret = null;

    const setCaret = (el, mode) => {
      if (caret && caret !== el) delete caret.dataset.caret;
      if (el) el.dataset.caret = mode;
      caret = el;
    };

    const start = () => {
      root.dataset.state = "typing";
      let at = 0; // index into the source string, spaces included
      let next = 0; // index into `chars`, the printable ones

      const step = () => {
        while (next < chars.length && indices[next] < at) {
          chars[next].dataset.typed = "";
          next += 1;
        }

        if (at >= total) {
          root.dataset.state = "done";
          setCaret(chars[chars.length - 1], "end");
          timer = setTimeout(() => setCaret(null), CARET_OUTRO);
          return;
        }

        setCaret(chars[next] ?? null, "next");
        at += 1;
        timer = setTimeout(step, speed);
      };

      step();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          timer = setTimeout(start, startDelay);
        }
      },
      { threshold }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [text, speed, startDelay, threshold, cursorCharacter]);

  return (
    <span ref={rootRef} className={cn("type-text", className)} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{content}</span>
    </span>
  );
}
