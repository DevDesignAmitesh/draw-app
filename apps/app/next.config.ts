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
      {
        hostname: "excalidraw.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
