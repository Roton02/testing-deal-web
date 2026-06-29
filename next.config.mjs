/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is a scraping TEST site: keep <img> tags using absolute remote URLs so
  // the scraper extracts the original image URL. We use plain <img>, but allow
  // remote images too in case next/image is used anywhere.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
