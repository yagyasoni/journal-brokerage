import { ScrollExpand } from "@/components/shared/ScrollExpand";
import { recordBand } from "@/data/record-band";

/**
 * The breath after the service index.
 *
 * The index is a list and reads like one; this is the one band on the landing
 * page that argues from the house itself. The frame opens as the reader
 * scrolls it, so the building arrives rather than simply being there — and the
 * dark surround lets it emerge out of the same navy the hero sits in.
 *
 * It costs a little over two screens of scrolling. That is the whole point of
 * the effect, but it is also why there is exactly one of these on the page.
 */
export function RecordBand() {
  return (
    <section
      aria-labelledby="record-band-heading"
      className="relative bg-navy-black text-white"
    >
      <ScrollExpand
        src={recordBand.image}
        alt={recordBand.alt}
        title={recordBand.title}
        scrollHint={recordBand.scrollHint}
        scrollDistance={0.9}
        holdDistance={0.25}
      >
        <h2 id="record-band-heading" className="type-heading max-w-3xl text-white">
          {recordBand.heading}
        </h2>

        <p className="mt-7 max-w-xl text-[17px] leading-[1.7] font-light text-white/85">
          {recordBand.body}
        </p>
      </ScrollExpand>
    </section>
  );
}
