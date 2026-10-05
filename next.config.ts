import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Pin the project root so a lockfile elsewhere on the machine is ignored.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
