/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  async redirects() {
    return [
      { source: '/blog/tcpdump-traffic-analysis', destination: '/labs/sec401/tcpdump-traffic-analysis', permanent: true },
      { source: '/blog/wireshark-packet-analysis', destination: '/labs/sec401/wireshark-packet-analysis', permanent: true },
      { source: '/blog/vpc-flow-logs', destination: '/labs/sec401/vpc-flow-logs', permanent: true },
      { source: '/blog/password-auditing', destination: '/labs/sec401/password-auditing', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content-Security-Policy is set per-request in src/middleware.ts so the
          // nonce can rotate. Keep static-only headers here.
        ],
      },
    ]
  },
}

module.exports = nextConfig


