/**
 * Step 2: 이미지를 S3에 업로드
 *
 * 실행: pnpm tsx scripts/migration/02-upload-images-s3.ts
 */

import * as fs from "fs";
import * as path from "path";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { config, validateConfig } from "./config";

interface ImageMap {
  [originalUrl: string]: {
    s3Key: string;
    uploadedAt: string;
    contentType: string;
    size: number;
  };
}

interface ExtractedData {
  posts: Array<{
    id: number;
    metaField: {
      image: {
        url: string;
        alt?: string;
        title?: string;
      };
    };
  }>;
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function getContentType(url: string): string {
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  const contentTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };
  return contentTypes[ext] || "image/jpeg";
}

function generateS3Key(url: string, postId: number): string {
  const ext = path.extname(new URL(url).pathname) || ".jpg";
  return `images/posts/${postId}/thumbnail${ext}`;
}

async function main() {
  console.log("=== Step 2: Upload images to S3 ===\n");

  // Validate required config
  validateConfig([
    "awsRegion",
    "s3Bucket",
    "awsAccessKeyId",
    "awsSecretAccessKey",
  ]);

  // Load extracted data
  if (!fs.existsSync(config.extractedDataPath)) {
    throw new Error(
      `Extracted data not found. Run 01-extract-datocms.ts first.`,
    );
  }

  const extractedData: ExtractedData = JSON.parse(
    fs.readFileSync(config.extractedDataPath, "utf-8"),
  );

  // Initialize S3 client
  const s3Client = new S3Client({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  });

  // Load existing image map or create new one
  let imageMap: ImageMap = {};
  if (fs.existsSync(config.imageMapPath)) {
    imageMap = JSON.parse(fs.readFileSync(config.imageMapPath, "utf-8"));
    console.log(`Loaded existing image map with ${Object.keys(imageMap).length} entries\n`);
  }

  // Collect unique images to upload
  const imagesToUpload: Array<{ url: string; postId: number }> = [];
  extractedData.posts.forEach((post) => {
    const imageUrl = post.metaField?.image?.url;
    if (imageUrl && !imageMap[imageUrl]) {
      imagesToUpload.push({ url: imageUrl, postId: post.id });
    }
  });

  console.log(`Images to upload: ${imagesToUpload.length}\n`);

  // Upload images
  let successCount = 0;
  let errorCount = 0;

  for (const { url, postId } of imagesToUpload) {
    try {
      console.log(`Uploading: ${url}`);

      // Download image
      const imageBuffer = await downloadImage(url);
      const contentType = getContentType(url);
      const s3Key = generateS3Key(url, postId);

      // Check if already exists in S3
      try {
        await s3Client.send(
          new HeadObjectCommand({
            Bucket: config.s3Bucket,
            Key: s3Key,
          }),
        );
        console.log(`  Already exists in S3: ${s3Key}`);
      } catch {
        // Upload to S3
        await s3Client.send(
          new PutObjectCommand({
            Bucket: config.s3Bucket,
            Key: s3Key,
            Body: imageBuffer,
            ContentType: contentType,
            CacheControl: "public, max-age=31536000", // 1 year cache
          }),
        );
        console.log(`  Uploaded to: ${s3Key}`);
      }

      // Update image map
      imageMap[url] = {
        s3Key,
        uploadedAt: new Date().toISOString(),
        contentType,
        size: imageBuffer.length,
      };

      successCount++;
    } catch (error) {
      console.error(`  Error: ${error}`);
      errorCount++;
    }

    // Save progress periodically
    if ((successCount + errorCount) % 10 === 0) {
      fs.writeFileSync(config.imageMapPath, JSON.stringify(imageMap, null, 2));
    }
  }

  // Save final image map
  fs.writeFileSync(config.imageMapPath, JSON.stringify(imageMap, null, 2));

  console.log(`\n=== Upload Summary ===`);
  console.log(`Successful: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total in map: ${Object.keys(imageMap).length}`);
  console.log(`\nImage map saved to: ${config.imageMapPath}`);
  console.log("\n=== Step 2 Complete ===");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
