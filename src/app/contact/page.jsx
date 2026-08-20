import { CTABand } from "@/components/sections/CTABand";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { RecordRow } from "@/components/shared/RecordRow";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  contactDetails,
  contactPage,
  detailsSection,
  enquiryFields,
  responsePromise,
} from "@/data/contact";
import { primaryCta, secondaryCta } from "@/data/nav";

export const metadata = {
  title: "Contact",
  description: "Start a search or ask a question.",
};

export default function ContactPage() {
  const { eyebrow, title, intro, formLabel, requiredNote, submitLabel, cta } =
    contactPage;

  return (
    <>
      <SectionShell tone="white" size="opening" labelledBy="contact-heading">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="contact-heading" className="type-heading mt-7 text-ink">
            {title}
          </h1>
          <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-12 lg:mt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <EnquiryForm
            fields={enquiryFields}
            legend={formLabel}
            requiredNote={requiredNote}
            submitLabel={submitLabel}
          />

          <div>
            {/* The promise sits above the details: it is the reason to send
                the file now rather than the way to reach us later. */}
            <div className="border-l-2 border-gold bg-paper px-6 py-7">
              <p className="type-label text-gold-deep">{responsePromise.label}</p>
              <p className="type-title mt-4 text-ink">{responsePromise.heading}</p>
              <p className="mt-3.5 text-[15.5px] leading-[1.7] text-slate">
                {responsePromise.body}
              </p>
            </div>

            <p className="type-label mt-12 text-slate">{detailsSection.label}</p>

            <dl className="mt-6 border-t border-rule">
              {contactDetails.map((detail) => (
                <RecordRow
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                  mono={detail.mono}
                />
              ))}
            </dl>

            <p className="mt-5 text-[12.5px] leading-snug text-slate">
              {detailsSection.note}
            </p>
          </div>
        </div>
      </SectionShell>

      {/* <CTABand
        headingId="contact-cta"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      /> */}
    </>
  );
}
