import { DM_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { brand } from "@/data/nav";

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

export const metadata = {
  metadataBase: new URL("https://journalbrokerage.com"),
  title: {
    default: "Journal Brokerage — Title, Tax & Municipal Lien Research",
    template: `%s — ${brand.name}`,
  },
  description: brand.statement,
  openGraph: {
    title: "Journal Brokerage — Title, Tax & Municipal Lien Research",
    description: brand.statement,
    siteName: brand.name,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: brand.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="flex min-h-screen flex-col bg-white">
        <a
          href="#main"
          className="sr-only rounded-xs bg-navy px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
