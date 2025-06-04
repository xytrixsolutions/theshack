import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "theshack.netlify.app",
        pathname: "/**", // allows all image paths
      },
    ],
  },
};

export default nextConfig;
