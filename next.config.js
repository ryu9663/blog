/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
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

const shouldAnalyzeBundles = process.env.ANALYZE === "true";

const withBundleAnalyzer = shouldAnalyzeBundles
  ? require("@next/bundle-analyzer")({
      enabled: true,
      openAnalyzer: true,
    })
  : (config) => config;

module.exports = withBundleAnalyzer(nextConfig);
