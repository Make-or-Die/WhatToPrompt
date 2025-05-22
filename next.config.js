/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  poweredByHeader: false,
  outputFileTracingExcludes: {
    '**/*': ['./prisma/client/generated/**'],
  },
  serverExternalPackages: ['@prisma/client'],
}

module.exports = nextConfig
