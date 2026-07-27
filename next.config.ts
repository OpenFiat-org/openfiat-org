import type { NextConfig } from "next";
import { LOCALES } from "./lib/i18n/config";

/** Paths that have moved. Roles now live under /participate. */
const MOVED = [
  { from: "merchants", to: "participate/merchants" },
  { from: "developers", to: "participate/developers" },
  { from: "node-operators", to: "participate/node-operators" },
  { from: "actors", to: "participate" },
  { from: "actors/:slug", to: "participate/:slug" },
  { from: "participate/traders", to: "participate/buyers" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return LOCALES.flatMap((locale) =>
      MOVED.map(({ from, to }) => ({
        source: `/${locale}/${from}`,
        destination: `/${locale}/${to}`,
        permanent: true,
      })),
    );
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
