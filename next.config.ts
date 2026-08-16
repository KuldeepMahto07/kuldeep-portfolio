import type { NextConfig } from "next";

/**
 * Static export so the site can be served anywhere (Vercel, GitHub Pages, etc.)
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
