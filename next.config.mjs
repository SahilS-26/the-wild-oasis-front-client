/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [new URL("https://assets.example.com/account123/**")],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oiacuuealxphliibmqof.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
