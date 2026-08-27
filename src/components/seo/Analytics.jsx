import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * Renders nothing at all until `NEXT_PUBLIC_GA_ID` is set, so the site ships
 * with no third-party request and no consent surface it does not yet need.
 * Add the ID and the tag appears on the next build.
 *
 * `afterInteractive` deliberately: analytics must not compete with the hero
 * image for bandwidth, because that image is the largest contentful paint on
 * the landing page and Core Web Vitals is itself a ranking signal.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
