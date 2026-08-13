// @ts-check

/** Everything the /contact page says. */
export const contactPage = {
  eyebrow: "Order / consultation",
  title: "Start a search or ask a question.",
  intro:
    "Tell us the property and scope and we’ll confirm turnaround the same day. Fields marked required keep your request moving.",
  formLabel: "Your request",
  requiredNote: "Required",
  submitLabel: "Send request",
  cta: {
    eyebrow: "Another way in",
    heading: "Prefer to start another way",
    body: "Send a file straight to the order desk, or book time with a specialist before you commit anything.",
  },
};

/**
 * ⚠️ SUBMISSION IS NOT WIRED UP YET.
 *
 * The form is UI only: there is no action, no API route, and no email
 * provider in this project. The submit button is disabled and this note is
 * shown beneath it so a visitor can never fill the form in and lose the
 * enquiry. Delete `submitDisabledNote`, drop the `disabled` prop in
 * `EnquiryForm`, and point the form at your handler — all three together.
 */
export const submitDisabledNote =
  "This form is not connected yet. Please use the details opposite in the meantime.";

/** @type {import("./types").FormFieldDef[]} */
export const enquiryFields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    required: true,
    autoComplete: "name",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    required: true,
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "need",
    label: "What do you need?",
    type: "select",
    required: true,
    full: true,
    options: [
      "Title search",
      "Property tax search",
      "Municipal lien search",
      "Bundled search",
      "Ongoing overflow",
    ],
  },
  {
    name: "property",
    label: "Property & county",
    type: "text",
    required: true,
    full: true,
    placeholder: "Street address, county, state",
  },
];

/** The highlighted promise beside the form. */
export const responsePromise = {
  label: "Response time",
  heading: "Same-day turnaround confirmation",
  body: "Send a file before noon and we confirm the scope and the delivery window the same business day.",
};

/**
 * ⚠️ PLACEHOLDERS — replace every value before launch.
 *
 * These deliberately use example.com and a 000 phone number, both reserved
 * and unroutable, so that if this ships unfinished it cannot misdirect a real
 * enquiry. Swap them for the real details and consider linking the email and
 * phone once they are genuine.
 *
 * @type {import("./types").ReportRow[]}
 */
export const contactDetails = [
  { label: "Email", value: "hello@example.com" },
  { label: "Phone", value: "+1 (000) 000-0000", mono: true },
  { label: "Address", value: "Address line, City, ST 00000" },
  { label: "Website", value: "example.com" },
];

export const detailsSection = {
  label: "Contact",
  note: "Details to be confirmed.",
};
