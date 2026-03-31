/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      { hostname: "drive.google.com" },
      { hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { hostname: "junesdevlog-s3.s3.ap-northeast-2.amazonaws.com" },
      { hostname: "img1.daumcdn.net" },
      { hostname: "www.datocms-assets.com" }, // 롤백용 유지
      { hostname: "image4.coupangcdn.com" },
    ].concat(
      process.env.CLOUDFRONT_DOMAIN
        ? [{ hostname: process.env.CLOUDFRONT_DOMAIN }]
        : [],
    ),
  },
  crossOrigin: "anonymous",
};

const shouldAnalyzeBundles = process.env.ANALYZE === "true";

const withBundleAnalyzer = shouldAnalyzeBundles
  ? require("@next/bundle-analyzer")({
      enabled: true,
      openAnalyzer: true,
    })
  : (config) => config;

module.exports = withBundleAnalyzer(nextConfig);
