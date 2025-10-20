import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  productionBrowserSourceMaps: true,
  sentry: {
    disableLogger: true,
  },
};

export default nextConfig;
