import type { NextConfig } from 'next';

const blobHostname = process.env.BLOB_HOSTNAME;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: blobHostname
      ? [
          {
            protocol: 'https',
            hostname: blobHostname,
          },
        ]
      : [],
  },
};

export default nextConfig;
