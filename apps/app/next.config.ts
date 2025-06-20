import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.refero.design",
      },
      {
        hostname: "marketplace.atlassian.com",
      },
      {
        hostname: "images.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
