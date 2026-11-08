import type { NextConfig } from "next";

/**
 * GitHub Pages serves the site from /VELTRIX-Website/ (no custom domain yet).
 * The deploy workflow sets NEXT_PUBLIC_BASE_PATH; local dev leaves it empty so
 * the site still runs at http://localhost:3000/.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Build plain static files into ./out for GitHub Pages.
  output: "export",
  basePath,
  // Pages serves /products/ as /products/index.html.
  trailingSlash: true,
  // Image optimisation needs a server, which Pages doesn't have.
  images: { unoptimized: true },
  // Hide the Next.js "N" dev indicator (development only; errors still show).
  devIndicators: false,
  // cacheComponents / partialPrefetching are left off: both enable partial
  // prerendering, which static export does not support.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
