import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/relianceautoworks.com/index.html',
      },
    ];
  },
};

export default nextConfig;
