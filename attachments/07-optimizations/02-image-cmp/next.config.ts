// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
    qualities: [50, 75],
  },
};

module.exports = nextConfig;
