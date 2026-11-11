import type { NextConfig } from "next";

// The site is served from https://ibrn-labs.org/cbrg.
// Keep this in sync with BASE_PATH in src/lib/constants.ts.
const BASE_PATH = "/cbrg";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  async redirects() {
    return [
      // Until the domain root has its own page, send visitors to the CBRG site.
      { source: "/", destination: BASE_PATH, basePath: false, permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
