/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tiemphonui.com",
      "loremflickr.com",
      "flowbite.s3.amazonaws.com",
      "localhost",
    ],
  },
  // swcMinify: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
