import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost", // optional, in case you also use localhost
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
