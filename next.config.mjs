import createMDX from "@next/mdx";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    unoptimized: true,
  },
  transpilePackages: ["next-mdx-remote"],
};

const withPWAConfig = withPWA({
  dest: "public",
});

const withMDX = createMDX({
  env: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
});

export default withPWAConfig(withMDX(nextConfig));
