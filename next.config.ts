import type { NextConfig } from "next";

// Static export: the site is pure HTML/CSS/JS and can be hosted on Netlify,
// Vercel or GitHub Pages without a Node server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { globalNotFound: true },
};

export default nextConfig;
