import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // i18n configuration is handled through App Router file structure and middleware
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
