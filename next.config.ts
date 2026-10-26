import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Content Security Policy.
 *
 * Next.js injects inline bootstrap and hydration scripts, so `'unsafe-inline'`
 * is required for `script-src` unless a nonce is threaded through the app.
 * Everything else is locked to the site's own origin. Blob storage is allowed
 * only for evidence images served from the Vercel Blob public hostname.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "manifest-src 'self'",
  "font-src 'self'",
  "img-src 'self' blob: data: https://*.public.blob.vercel-storage.com",
  "media-src 'self'",
  "worker-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "connect-src 'self' https://*.public.blob.vercel-storage.com",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  // Do not advertise the framework version.
  poweredByHeader: false,
  // The dev server otherwise writes an AGENTS.md file into the repo root.
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Evidence uploaded through /admin is served from Vercel Blob.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to every route, including static assets.
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // The admin surface and upload endpoint must never be cached.
        source: "/admin",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
};

export default nextConfig;
