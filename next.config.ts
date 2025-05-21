/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asia-exstatic-vivofs.vivo.com',
      },
      {
        protocol: 'https',
        hostname: 'images.samsung.com',
      },
      {
        protocol: 'https',
        hostname: 'cdnpro.eraspace.com',
      },
      {
        protocol: 'https',
        hostname: 'www.oppo.com',
      },
      {
        protocol: 'https',
        hostname: 'cworld.id',
      },
    ],
  },
  turbo: {
    // Add Turbopack-specific rules if needed (currently none required)
    rules: {},
  },
};

export default nextConfig;