/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Habilitar ISR (Incremental Static Regeneration)
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Reduzir JavaScript no bundle
  swcMinify: true,
  // Habilitar experimental features para performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui"],
  },
}

export default nextConfig
