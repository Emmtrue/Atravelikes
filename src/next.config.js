/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Add wasm support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    
    // Fallbacks and aliases are removed to rely on proper code separation
    // instead of Webpack workarounds.

    return config;
  },
};

module.exports = nextConfig;
