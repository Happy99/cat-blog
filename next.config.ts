import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/',
      destination: '/articles',
      permanent: true,
    },
  ],
  images: {
    domains: ['cat-blog-red.vercel.app', 'fullstack.exercise.applifting.cz', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cat-blog-red.vercel.app',
        pathname: '/api/images/**',
      },
      {
        protocol: 'https',
        hostname: '**.exercise.applifting.cz',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/images/**',
      },
    ],
  },
}

export default nextConfig
