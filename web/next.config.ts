import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // YouTube video thumbnails for the Learn section
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  async redirects() {
    return [
      // "Learn" in the nav is a dropdown parent with no page of its own.
      // Temporary rather than permanent: browsers cache a 308 hard, and a real
      // Learn hub page here later is plausible.
      { source: "/learn", destination: "/learn/youtube", permanent: false },
    ];
  },
};

export default nextConfig;
