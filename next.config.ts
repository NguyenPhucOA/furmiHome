import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 👈 Cho phép tất cả domain HTTPS
      },
    ],
  },
};

export default nextConfig;
