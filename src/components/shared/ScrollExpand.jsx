"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * A picture held in a small frame that opens to fill the screen as the reader
 * scrolls past, then hands the stage to whatever is written over it.
 *
 * The band is pinned while it opens, so it costs real scrolling:
 * `1 + scrollDistance + holdDistance` screens in total. Keep that in mind
 * before adding a second one to a page.
 *
 * It renders *open* — full bleed, title gone, children showing. That is the
 * end state, so a reader with no JavaScript, or one who asked for reduced
 * motion, gets the finished picture and the whole message rather than a frame
 * that never opens. JS closes it on mount and lets the scroll open it again.
 *
 * Window scroll only: the source this was adapted from could also scroll
 * inside its own box, which on a marketing page traps the reader's wheel.
 *
 * @param {{
 *   src: string,
 *   alt?: string,
 *   title?: string,
 *   scrollHint?: string,
 *   children?: React.ReactNode,
 *   startWidth?: number,
 *   startHeight?: number,
 *   startRadius?: number,
 *   endRadius?: number,
 *   mediaZoom?: number,
 *   scrollDistance?: number,
 *   holdDistance?: number,
 *   smoothing?: number,
 *   overlayScrim?: number,
 *   className?: string,
 * }} props
 */
export function ScrollExpand({
  src,
  alt = "",
  title,
  scrollHint,
  children,
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 0.9,
  holdDistance = 0.25,
  smoothing = 0.1,
  overlayScrim = 0.8,
  className,
  ...props
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef = useRef(null);
  const hintRef = useRef(null);

  // Read inside rAF, so keep them off the effect's dependency list.
  const settings = useRef({});
  settings.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
  };

  const applyProgress = useCallback((p) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    const c = settings.current;
    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    // The soft edge that lets the closed frame sit in the surround instead of
    // on top of it. It retracts as the frame opens, so full bleed is full
    // bleed — edge to edge, nothing faded.
    frame.style.setProperty("--se-inset-x", `${ix}%`);
    frame.style.setProperty("--se-inset-y", `${iy}%`);
    frame.style.setProperty("--se-feather-k", `${1 - e}`);

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0)`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return undefined;

    // Reduced motion: never pin, never transform. The band stays exactly as it
    // was served — the open picture with the message on it — so the reader
    // loses the movement and nothing else.
    if (window.matchMedia?.(REDUCED_MOTION).matches) return undefined;

    let raf = 0;
    let running = false;
    let current = 0;
    let target = 0;
    let stageH = 0;

    const measure = () => {
      const c = settings.current;
      stageH = stage.clientHeight;
      if (stageH <= 0) return;
      const runway = 1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance);
      track.style.height = `${stageH * runway}px`;
    };

    const readProgress = () => {
      if (stageH <= 0) return 0;
      const span = stageH * Math.max(0.01, settings.current.scrollDistance);
      return clamp(-track.getBoundingClientRect().top / span, 0, 1);
    };

    const tick = () => {
      const s = settings.current.smoothing;
      const k = s <= 0 ? 1 : 1 - Math.exp(-1 / (60 * s));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (settings.current.smoothing <= 0) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const settle = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    settle();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", settle);
    const observer = new ResizeObserver(settle);
    observer.observe(stage);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", settle);
      observer.disconnect();
    };
  }, [applyProgress]);

  return (
    <div ref={rootRef} className={cn("scroll-expand", className)} {...props}>
      <div ref={trackRef} className="scroll-expand-track">
        <div ref={stageRef} className="scroll-expand-stage">
          <div ref={frameRef} className="scroll-expand-frame">
            {/* The frame masks the left and right edges, this masks the top and
                bottom. Two single-axis gradient masks rather than one composited
                pair, so the softening needs nothing newer than `mask-image`. */}
            <div className="scroll-expand-feather">
              <div ref={mediaRef} className="scroll-expand-media">
                <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
              </div>

              <div ref={scrimRef} aria-hidden="true" className="scroll-expand-scrim" />

              {children ? (
                <div ref={overlayRef} className="scroll-expand-overlay">
                  {children}
                </div>
              ) : null}
            </div>
          </div>

          {/* Decorative: it says the same thing the heading says, earlier and
              larger, and it is gone by the time the heading arrives. */}
          {title ? (
            <p
              ref={titleRef}
              aria-hidden="true"
              className="scroll-expand-title type-heading"
            >
              {title}
            </p>
          ) : null}

          {scrollHint ? (
            <p ref={hintRef} aria-hidden="true" className="scroll-expand-hint type-label">
              {scrollHint}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
