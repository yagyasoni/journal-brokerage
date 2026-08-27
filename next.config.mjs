/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next serves WebP only by default. AVIF is typically another 20–30%
    // smaller on exactly this kind of photograph — large, dark, gradient-heavy
    // exteriors — and every byte off the hero comes straight off the largest
    // contentful paint, which Google measures as a ranking signal.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // Nothing gained by announcing the framework on every response.
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Fingerprinted by content, never edited in place — so this can be
        // cached hard. Renaming a photograph is how it gets invalidated.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
