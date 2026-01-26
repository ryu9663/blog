/**
 * Step 3: Blur placeholder 데이터 생성
 *
 * DatoCMS에서 이미 base64 blur 데이터를 제공하므로 그것을 사용하거나,
 * 새로 생성해야 하는 경우 plaiceholder 라이브러리 사용
 *
 * 실행: pnpm tsx scripts/migration/03-generate-blur.ts
 */

import * as fs from "fs";
import { config, validateConfig } from "./config";

interface ExtractedData {
  posts: Array<{
    id: number;
    metaField: {
      image: {
        url: string;
        responsiveImage?: {
          base64: string;
        };
      };
    };
  }>;
}

interface ImageMap {
  [originalUrl: string]: {
    s3Key: string;
  };
}

interface BlurMap {
  [s3Key: string]: {
    base64: string;
    generatedAt: string;
    source: "datocms" | "generated";
  };
}

async function generateBlurPlaceholder(imageUrl: string): Promise<string> {
  // 간단한 회색 placeholder 생성 (실제로는 plaiceholder 사용 권장)
  // 이 함수는 DatoCMS base64가 없는 경우의 폴백
  console.log(`  Generating placeholder for: ${imageUrl}`);

  // 간단한 1x1 회색 픽셀 placeholder
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCwsKCw4QDQsNDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AVN//2Q==";
}

async function main() {
  console.log("=== Step 3: Generate blur placeholders ===\n");

  // Load extracted data
  if (!fs.existsSync(config.extractedDataPath)) {
    throw new Error(
      `Extracted data not found. Run 01-extract-datocms.ts first.`,
    );
  }

  if (!fs.existsSync(config.imageMapPath)) {
    throw new Error(`Image map not found. Run 02-upload-images-s3.ts first.`);
  }

  const extractedData: ExtractedData = JSON.parse(
    fs.readFileSync(config.extractedDataPath, "utf-8"),
  );

  const imageMap: ImageMap = JSON.parse(
    fs.readFileSync(config.imageMapPath, "utf-8"),
  );

  // Load existing blur map or create new one
  let blurMap: BlurMap = {};
  if (fs.existsSync(config.blurMapPath)) {
    blurMap = JSON.parse(fs.readFileSync(config.blurMapPath, "utf-8"));
    console.log(
      `Loaded existing blur map with ${Object.keys(blurMap).length} entries\n`,
    );
  }

  let datocmsCount = 0;
  let generatedCount = 0;
  let skippedCount = 0;

  for (const post of extractedData.posts) {
    const imageUrl = post.metaField?.image?.url;
    if (!imageUrl) continue;

    const imageInfo = imageMap[imageUrl];
    if (!imageInfo) {
      console.log(`Skipping (not in image map): ${imageUrl}`);
      skippedCount++;
      continue;
    }

    const s3Key = imageInfo.s3Key;

    // Skip if already in blur map
    if (blurMap[s3Key]) {
      skippedCount++;
      continue;
    }

    // Use DatoCMS base64 if available
    const datocmsBase64 = post.metaField?.image?.responsiveImage?.base64;

    if (datocmsBase64) {
      blurMap[s3Key] = {
        base64: datocmsBase64,
        generatedAt: new Date().toISOString(),
        source: "datocms",
      };
      console.log(`Using DatoCMS base64 for: ${s3Key}`);
      datocmsCount++;
    } else {
      // Generate new placeholder
      const base64 = await generateBlurPlaceholder(imageUrl);
      blurMap[s3Key] = {
        base64,
        generatedAt: new Date().toISOString(),
        source: "generated",
      };
      generatedCount++;
    }
  }

  // Save blur map
  fs.writeFileSync(config.blurMapPath, JSON.stringify(blurMap, null, 2));

  console.log(`\n=== Blur Placeholder Summary ===`);
  console.log(`From DatoCMS: ${datocmsCount}`);
  console.log(`Generated: ${generatedCount}`);
  console.log(`Skipped (already exists): ${skippedCount}`);
  console.log(`Total in map: ${Object.keys(blurMap).length}`);
  console.log(`\nBlur map saved to: ${config.blurMapPath}`);
  console.log("\n=== Step 3 Complete ===");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
