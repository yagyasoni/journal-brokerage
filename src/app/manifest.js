import { brand } from "@/data/nav";
import { site } from "@/data/seo";

/**
 * The web app manifest. Not a ranking factor, but it is what a phone reads
 * when the site is saved to a home screen, and what fills in the install
 * prompt — so the icons sit on brand navy rather than showing a transparent
 * mark that Android would crop to a blob.
 */
export default function manifest() {
  return {
    name: brand.name,
    short_name: site.shortName,
    description: brand.statement,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: brand.themeColor,
    icons: [
      { src: "/media/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/media/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
