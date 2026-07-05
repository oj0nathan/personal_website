/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // react-pdf: prevent bundling the optional node-only "canvas" package
    config.resolve.alias.canvas = false
    return config
  },
}

export default nextConfig
