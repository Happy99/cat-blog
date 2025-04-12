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
    domains: ['cat-blog-red.vercel.app', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cat-blog-red.vercel.app',
        pathname: '/api/images/getImage**',
      },
    ],
  },
}

export default nextConfig
