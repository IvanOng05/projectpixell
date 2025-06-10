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
  // Remove 'turbo' configuration to avoid the warning
  // turbo: {
  //   rules: {},
  // },
};

export default nextConfig;