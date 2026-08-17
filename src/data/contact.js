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
 * Everything the form says while it is being filled in, sent, or answered.
 *
 * Submission posts to `/api/lead`, which validates with the same schema the
 * browser used (`@/lib/lead-schema`) and forwards the enquiry by email. Keep
 * these strings here rather than in the component: an error a visitor reads is
 * copy like any other.
 */
export const enquiryStatus = {
  sending: "Sending…",
  successTitle: "Request sent",
  successBody:
    "We have your file and will confirm the scope and turnaround the same business day.",
  errorTitle: "Request not sent",
  errorBody:
    "Something went wrong on our side. Please try again, or use the details opposite.",
  invalidBody: "Please check the highlighted fields and try again.",
};

/** Per-field validation messages, read by `@/lib/lead-schema`. */
export const enquiryErrors = {
  name: "Enter your full name.",
  email: "Enter a valid work email so we can reply.",
  emailLong: "That email address is too long.",
  company: "That company name is too long.",
  phone: "That phone number is too long.",
  need: "Choose the search you need.",
  property: "Enter the property address, county and state.",
  tooLong: "That entry is too long.",
};

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
