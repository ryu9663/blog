import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  // DatoCMS
  datoApiToken: process.env.API_TOKEN!,
  datoApiEndpoint: "https://graphql.datocms.com/",

  // Supabase
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,

  // AWS S3
  awsRegion: process.env.AWS_REGION || "ap-northeast-2",
  s3Bucket: process.env.S3_BUCKET!,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,

  // CloudFront
  cloudfrontDomain: process.env.CLOUDFRONT_DOMAIN!,

  // Migration output paths
  outputDir: path.resolve(process.cwd(), "scripts/migration/output"),
  extractedDataPath: path.resolve(
    process.cwd(),
    "scripts/migration/output/extracted-data.json",
  ),
  imageMapPath: path.resolve(
    process.cwd(),
    "scripts/migration/output/image-map.json",
  ),
  blurMapPath: path.resolve(
    process.cwd(),
    "scripts/migration/output/blur-map.json",
  ),
};

export const validateConfig = (requiredKeys: (keyof typeof config)[]) => {
  const missing = requiredKeys.filter((key) => !config[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};
