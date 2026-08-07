"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * The hero's full-bleed backdrop.
 *
 * The still (`.hero-still`) is always painted underneath, so the hero is never
 * empty and never flashes black: the footage fades in on top of it once the
 * browser says it can play, and simply never arrives if it can't. That covers
 * the four cases that matter — a reader who asked for reduced motion, a metered
 * or 2G connection, a browser that refuses autoplay, and a missing or
 * unsupported file.
 *
 * The pause control is not decoration: an autoplaying background loop has to be
 * stoppable (WCAG 2.2.2), and the reference hero carries the same affordance.
 *
 * To use real footage, drop it at `public/media/hero-loop.{webm,mp4}` with a
 * matching `hero-poster.jpg`. Nothing else changes.
 */
export function HeroVideo() {
  const videoRef = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.(REDUCED_MOTION).matches) return;

    // Don't spend someone else's data plan on decoration.
    const connection = navigator.connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return;

    setAllowed(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay can still be refused (low-power mode, per-site settings). The
    // rejection is expected, not exceptional — the still just stays put.
    video.play().catch(() => setPaused(true));
  }, [allowed]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-still absolute inset-0" />

        {allowed ? (
          <video
            ref={videoRef}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            poster="/media/hero-poster.jpg"
            onPlaying={() => {
              setVisible(true);
              setPaused(false);
            }}
            onPause={() => setPaused(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-[1200ms] ease-[var(--ease-quiet)] ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/media/journal.webm" type="video/webm" />
            <source src="/media/journal.mp4" type="video/mp4" />
          </video>
        ) : null}
      </div>

      {allowed && visible ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className="absolute right-6 bottom-28 z-10 flex size-11 items-center justify-center rounded-full border border-white/45 text-white transition-colors duration-300 ease-[var(--ease-quiet)] hover:border-white hover:bg-white hover:text-navy md:right-10 md:bottom-32"
        >
          {paused ? (
            <Play aria-hidden="true" strokeWidth={1.5} className="ml-0.5 size-4" />
          ) : (
            <Pause aria-hidden="true" strokeWidth={1.5} className="size-4" />
          )}
        </button>
      ) : null}
    </>
  );
}
