/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any hostname
        port: '', // Optional: You can specify a port or leave it empty for any port
        pathname: '/**', // Allows any path
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://35.243.150.92/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
