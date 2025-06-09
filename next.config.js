/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['files.vercel-storage.com'], // For Vercel Blob storage
  },
  // Add any other Next.js config options here
}

module.exports = nextConfig
