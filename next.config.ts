import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emits .next/standalone: a self-contained server bundle with only the
  // node_modules the traced routes actually need. Used by the Dockerfile.
  output: "standalone",
};

export default nextConfig;
