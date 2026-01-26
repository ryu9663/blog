export type DataSourceType = "datocms" | "supabase";

export const DATA_SOURCE: DataSourceType =
  (process.env.DATA_SOURCE as DataSourceType) || "datocms";

export const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN || "";
