import type { NextConfig } from 'next';

const blobHostname = process.env.BLOB_HOSTNAME;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/medlemmar',
        destination: '/',
        permanent: true,
      },
      {
        source: '/profil/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
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
