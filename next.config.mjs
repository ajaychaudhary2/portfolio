import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ✅ REQUIRED to avoid Image Optimization crash in export mode
  },
};

export default withSentryConfig(
  nextConfig,
  {
    org: "Aj",
    project: "portfolio",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: false,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);
