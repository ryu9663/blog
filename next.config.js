const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "drive.google.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "junesdevlog-s3.s3.ap-northeast-2.amazonaws.com",
      "img1.daumcdn.net",
      "www.datocms-assets.com",
      "image4.coupangcdn.com",
    ],
  },
};

module.exports = nextConfig;
