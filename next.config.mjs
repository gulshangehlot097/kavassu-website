/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  images: {
    domains: ["192.168.1.50"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.50",
        port: "3000",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.1.50:3000/api/:path*", 
      },
    ];
  },
};

export default nextConfig;
