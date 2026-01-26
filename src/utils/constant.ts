export const REVALIDATE_TIME = 10; // 300 seconds
export const DATO_API_END_POINT = "https://graphql.datocms.com/";
export const IMAGE_SIZE_IN_POSTS = {
  width: 180,
  height: 120,
};

// NO_IMAGE는 DATA_SOURCE에 따라 동적으로 결정되어야 하지만,
// 빌드 타임에 결정되어야 하므로 CloudFront URL이 없으면 DatoCMS 폴백 사용
export const NO_IMAGE = {
  src: process.env.CLOUDFRONT_DOMAIN
    ? `https://${process.env.CLOUDFRONT_DOMAIN}/images/noimage.jpg`
    : "https://www.datocms-assets.com/107137/1699598396-noimage.jpg",
  alt: "No image",
};

export const BASE_URL = "https://www.wnsdufdl.com/";
