import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/github-wrapped-ai",
  images: { unoptimized: true },
};

export default nextConfig;
