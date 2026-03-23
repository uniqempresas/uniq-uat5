/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removido - precisa de renderização dinâmica para Supabase
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
