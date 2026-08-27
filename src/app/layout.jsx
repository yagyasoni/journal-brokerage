import { DM_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Analytics } from "@/components/seo/Analytics";
import { brand } from "@/data/nav";
import { pageSeo, site } from "@/data/seo";

import "./globals.css";

/**
 * The only face on the site.
 *
 * Douglas Elliman sets its whole site in Euclid Circular A — a light geometric
 * sans whose circular bowls and tall x-height are what make that hero read so
 * easily. Euclid is licensed, so we use the closest open equivalent: DM Sans
 * has the same near-circular geometry, carries a 300 weight for the tracked
 * uppercase display treatment, and stayed the most legible of the candidates
 * at 15–17px body sizes.
 *
 * One family, deliberately. Weight, tracking, case and scale carry every
 * distinction the site used to spend a serif and a monospace on — which is
 * exactly why the reference reads as expensive rather than busy.
 */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Site-wide defaults only. Every page states its own title, description,
 * canonical and Open Graph card through `pageMetadata()` in `@/data/seo` —
 * which is what stops the child pages inheriting the home page's social
 * preview, as they used to.
 */
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pageSeo.home.title,
    template: `%s — ${brand.name}`,
  },
  description: brand.statement,
  applicationName: brand.name,
  creator: brand.name,
  publisher: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: site.locale,
    title: pageSeo.home.title,
    description: brand.statement,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo.home.title,
    description: brand.statement,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Without these two, Google shows a thumbnail-sized image and a
      // truncated snippet. Both are opt-in.
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Set GOOGLE_SITE_VERIFICATION and the tag appears; leave it blank and no
  // empty meta tag is rendered.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport = {
  themeColor: brand.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="flex min-h-screen flex-col bg-white">
        {/* Invisible until it takes focus, so this costs nothing on screen and
            saves a keyboard user tabbing the whole nav on every page. */}
        <a
          href="#main"
          className="sr-only rounded-xs bg-navy px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
