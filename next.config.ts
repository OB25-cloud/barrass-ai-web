import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The audit report links to barrassai.com/contact; contact lives on the homepage.
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
