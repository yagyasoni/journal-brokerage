/**
 * The sound of the statement being typed.
 *
 * A good keyboard on a heavy desk, synthesised: a struck keycap is a burst of
 * noise thrown at a handful of resonances, and that is a few filters. No file
 * to licence, nothing to download, and — the reason it matters here — every
 * press can be detuned, re-levelled, re-placed and re-voiced a hair, so a
 * hundred and sixty of them in a row are a person typing rather than one
 * sample retriggering.
 *
 * Two earlier versions of this were wrong, and both failures were about
 * timing rather than timbre:
 *
 *   The first ran on its own throttle instead of on the text, so the clicking
 *   drifted out of step with the letters, and at fifteen a second a transient
 *   stops reading as typing and starts reading as a rotor.
 *
 *   The second answered that by abandoning keys for musical notes, which was
 *   not what a brokerage sounds like.
 *
 * So: one key per character, no throttle at all, and the typing itself slowed
 * to a speed a hand could actually reach. What you hear is exactly the letter
 * you are watching land. `TypeText` supplies the rhythm — uneven, longer after
 * punctuation — because the metronome was always the unluxurious part.
 *
 * The third and fourth failures were both the same mistake, made twice, in
 * opposite directions:
 *
 *   The third chased *realism*. Wide dynamics, presses that were only brushed,
 *   releases dropped the way a hand masks them, a convolution room, seven
 *   layers. Every one of those was defensible on its own and together they
 *   removed the transient, so what came out was a soft dark mush. A sound with
 *   no attack in it cannot be recognised as a key however accurate it is.
 *
 *   The fourth was the level, which then went wrong the other way. It measured
 *   about -40dBFS — below the noise floor of a room with a window open, and
 *   the reason the earlier work on timbre was never really being heard at all
 *   — and the correction took it to -11dBFS, which is a foreground level. It
 *   sits at -19dBFS now, where an ambient effect belongs.
 *
 * So this version is three layers, no dice, and audible: a bright tick for the
 * switch, a low body for the cap on the desk, a lighter knock for the release.
 * Every press gets all three, because the ear recognises a *repeated gesture*,
 * and a gesture that is differently constituted each time is not one.
 *
 * Two things constrain when it can be heard, and both are handled here rather
 * than at the call site:
 *
 *   1. Autoplay policy. An `AudioContext` built without user activation starts
 *      `suspended`, and scrolling is not activation in Chrome or Safari. So we
 *      keep listening and keep trying until one actually resumes — see
 *      `armOnFirstGesture`.
 *   2. WCAG 1.4.2. The statement takes over three seconds to type, so sound
 *      that starts on its own needs a control — `SoundToggle` is it, and the
 *      choice persists here.
 */

const STORAGE_KEY = "jb:type-sound";

let ctx = null;
let master = null;
let noise = null;
let armed = false;

let enabled = true;
let loaded = false;
const listeners = new Set();

/* ---- The reader's choice ------------------------------------------------ */

/**
 * Read once, lazily, and never during render — `localStorage` on the server is
 * undefined and on the client would desynchronise the first paint.
 */
function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) enabled = stored === "on";
  } catch {
    // Private mode, or storage denied. The default stands.
  }
}

export function isEnabled() {
  load();
  return enabled;
}

export function setEnabled(next) {
  load();
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Not being able to remember the choice does not stop us honouring it.
  }
  if (next) arm();
  for (const fn of listeners) fn(next);
}

/** @param {(on: boolean) => void} fn */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ---- The instrument ----------------------------------------------------- */

/**
 * Where on the board a character lives, as a stereo position. Kept narrow —
 * about a third of the way out — so it reads as a board on a desk rather than
 * as an effect. It is the one piece of scene-setting here that costs nothing
 * in clarity.
 */
const LEFT_HAND = new Set("12345qwertasdfgzxcvb");
const RIGHT_HAND = new Set("67890yuiophjklnm,.;:'\"/?-");

function placement(char) {
  if (!char) return -0.06 + Math.random() * 0.12;
  const key = char.toLowerCase();
  if (LEFT_HAND.has(key)) return -0.32 + Math.random() * 0.12;
  if (RIGHT_HAND.has(key)) return 0.2 + Math.random() * 0.12;
  return -0.06 + Math.random() * 0.12;
}

function build() {
  const AC = window.AudioContext ?? window.webkitAudioContext;
  if (!AC) return false;

  ctx = new AC();

  // One lowpass, at 5500Hz, where the previous version had two at 3400.
  //
  // That pair was the mistake. They were put there to kill a brittleness that
  // came from the click being far too loud, and they did — along with the
  // click itself. A keystroke with no energy above 3kHz is a knock on a table;
  // the thing that makes the ear hear *a key* is a short bright tick, and this
  // is the only band it can live in. The brittleness is handled where it
  // belongs now, by mixing the tick at a tenth of the body rather than by
  // filtering the whole instrument until nothing survives.
  const shelf = ctx.createBiquadFilter();
  shelf.type = "lowpass";
  shelf.frequency.value = 5500;
  shelf.Q.value = 0.6;

  // Below 80Hz is rumble no laptop speaker will reproduce and every phone will
  // turn into distortion.
  const floor = ctx.createBiquadFilter();
  floor.type = "highpass";
  floor.frequency.value = 80;

  // A limiter, sitting last, as a safety net only. Noise-excited resonators do
  // not have a predictable peak and two or three keys overlap at this tempo,
  // so something has to catch the occasional stack. It should never be the
  // thing setting the level.
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -3;
  limiter.knee.value = 6;
  limiter.ratio.value = 6;
  limiter.attack.value = 0.003;
  // Short enough to recover inside the gap between two keys. A long release
  // would duck the next keystroke behind the last loud one, and audible
  // pumping is its own kind of cheap.
  limiter.release.value = 0.08;

  // The level, and it has now been wrong in both directions.
  //
  // It sat at about -40dBFS for a long time — below the noise floor of a room
  // with a window open — because every version had been mixed by ear against a
  // silent house. Correcting that overshot to -11dBFS, which is a foreground
  // level: loud enough that the typing became the thing you were doing rather
  // than something happening while you read.
  //
  // -19dBFS is where an ambient effect belongs. Present, unmistakably there,
  // and quiet enough that the sentence it is voicing stays the subject.
  master = ctx.createGain();
  master.gain.value = 3;
  master.connect(shelf).connect(floor).connect(limiter).connect(ctx.destination);

  // Two seconds of white noise, read from a random offset at a random rate on
  // every burst. Without that, each source starts at sample 0, every path in a
  // keystroke is excited by an identical waveform, and 167 identical waveforms
  // in a row are heard as one sample being retriggered.
  noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 2), ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;

  return true;
}

/**
 * Called from a real gesture. Builds the context the first time and resumes it
 * every time, since a tab can suspend one again after it has been backgrounded.
 */
export function arm() {
  if (typeof window === "undefined") return;
  if (!ctx && !build()) return;
  armed = true;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
}

/**
 * Listen for the first gesture anywhere on the page and arm on it. Returns a
 * teardown. Safe to call more than once.
 */
export function armOnFirstGesture() {
  if (typeof window === "undefined") return () => {};

  // `wheel` and `scroll` are in the list on purpose. Neither grants user
  // activation, so on a strict browser they will not resume anything — but a
  // reader who has scrolled has often earned activation some other way, and
  // trying costs a rejected promise we already swallow. The listeners are only
  // dropped once the context is genuinely running, so spending the first
  // attempt on a scroll that fails does not forfeit the click that follows.
  const events = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"];

  const attempt = () => {
    arm();
    if (ctx?.state === "running") {
      for (const type of events) window.removeEventListener(type, attempt);
    }
  };

  for (const type of events) {
    window.addEventListener(type, attempt, { passive: true });
  }
  attempt();

  return () => {
    for (const type of events) window.removeEventListener(type, attempt);
  };
}

/**
 * One key. Three layers, and deliberately no more.
 *
 * The version before this had seven, plus a convolution room, plus per-press
 * dice deciding whether each layer sounded at all. Every one of those was
 * added to chase realism and every one of them cost clarity, until what came
 * out was a soft dark mush that did not read as typing because there was no
 * longer a transient in it to read. Realism was never the brief. A sound that
 * is unmistakably a key, and pleasant a hundred and sixty times in a row, is.
 *
 * So, three:
 *
 *   1. **The tick.** Noise through a wide bandpass at 2.6kHz, gone in 9ms.
 *      This is the layer that says *key* — the click of the switch itself, and
 *      the one thing the previous version had filtered away almost entirely.
 *      Mixed at about a tenth of the body, because loud is a typewriter and
 *      absent is a table knock. Bright, brief, and well behind the weight.
 *
 *   2. **The body.** Two bandpasses at 168Hz and 330Hz, 55ms and 32ms. The
 *      keycap bottoming out on a solid desk. This is where the money is: a
 *      thin case over an air gap has almost nothing down here and rattles
 *      instead, which is exactly what a cheap keyboard sounds like.
 *
 *   3. **The release.** The cap returning against the housing about 70ms
 *      later, at a third the level. A key makes two sounds. Take this away and
 *      it reads as a drum machine, because a drum machine hits once.
 *
 * Nothing is randomly omitted any more — every press gets all three, so the
 * sound is the *same gesture* each time, which is what lets the ear recognise
 * it. What varies is small and physical: level by ±12%, resonant frequencies
 * by ±12%, decays by ±10%, the release time by ±20ms, and a fresh read of the
 * noise bed for every burst. Enough that no two keys are identical, not so
 * much that they stop being the same instrument.
 *
 * The spacebar is a longer cap on a stabiliser over a bigger cavity: lower
 * everything, longer decay, slightly louder, near the middle of the board.
 *
 * @param {{ kind?: "key" | "space", char?: string }} [options]
 */
export function keystroke({ kind = "key", char } = {}) {
  if (!enabled || !armed || !ctx || ctx.state !== "running") return;

  const space = kind === "space";
  const t = ctx.currentTime;
  const level = 0.88 + Math.random() * 0.24;

  // Where on the board this key is. Falls back to the master bus on a browser
  // with no stereo panner rather than dropping the keystroke.
  const pan = ctx.createStereoPanner?.();
  let out = master;
  if (pan) {
    pan.pan.value = space ? -0.04 + Math.random() * 0.08 : placement(char);
    pan.connect(master);
    out = pan;
  }

  /** A fresh read of the noise bed, from its own place in it, at its own rate. */
  const burst = (at = t) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    src.start(at, Math.random() * 1.6);
    src.stop(at + 0.2);
    return src;
  };

  /** Struck: on almost instantly, off exponentially. */
  const shape = (peak, decay, at = t, attack = 0.0008) => {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(peak, at + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + decay);
    return gain;
  };

  /** One noise-excited resonance, enveloped, into the keystroke's own panner. */
  const voice = (type, freq, q, peak, decay, at = t, attack) => {
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq * (0.88 + Math.random() * 0.24);
    filter.Q.value = q;
    burst(at)
      .connect(filter)
      .connect(shape(peak * level, decay * (0.9 + Math.random() * 0.2), at, attack))
      .connect(out);
  };

  /* 1. The tick — the switch. Short, bright, and the reason this reads as a
        keyboard at all. Q is low on purpose: a narrow filter here rings like a
        bell, and a bell is the sound of something manufactured. */
  voice("bandpass", space ? 1900 : 2600, 1.1, space ? 0.055 : 0.075, 0.009, t, 0.0005);

  /* 2. The body — the cap arriving on the desk. */
  if (space) {
    voice("bandpass", 112, 2.6, 0.62, 0.078);
    voice("bandpass", 225, 1.9, 0.3, 0.046);
    voice("lowpass", 520, 0.7, 0.1, 0.032);
  } else {
    voice("bandpass", 168, 2.6, 0.55, 0.055);
    voice("bandpass", 330, 1.9, 0.26, 0.032);
    voice("lowpass", 700, 0.7, 0.085, 0.024);
  }

  /* 3. The release — the cap coming back up. Lighter, brighter, shorter, and
        scheduled on the audio clock so it cannot drift off a timer. */
  const up = t + 0.06 + Math.random() * 0.02;
  voice("bandpass", space ? 1400 : 1800, 1.2, space ? 0.03 : 0.026, 0.011, up, 0.0006);
}
