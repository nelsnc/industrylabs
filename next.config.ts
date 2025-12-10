import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dl.airtable.com',
        pathname: '/**',
      },
    ],
  },
  // Note: allowedDevOrigins is available in Next.js 15+ for cross-origin dev access
  // The warning can be safely ignored or this can be configured when upgrading
};

export default nextConfig;
