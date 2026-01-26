/**
 * Step 4: Supabase에 데이터 삽입
 *
 * 실행: pnpm tsx scripts/migration/04-insert-supabase.ts
 */

import * as fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { config, validateConfig } from "./config";

interface ExtractedData {
  posts: Array<{
    id: number;
    _createdAt: string;
    markdown: string;
    ispublic: boolean;
    category: {
      category: Record<string, string>;
    };
    metaField: {
      title: string;
      description: string;
      image: {
        url: string;
        alt?: string;
        title?: string;
        width?: number;
        height?: number;
      };
    };
  }>;
}

interface ImageMap {
  [originalUrl: string]: {
    s3Key: string;
    contentType: string;
    size: number;
  };
}

interface BlurMap {
  [s3Key: string]: {
    base64: string;
  };
}

async function main() {
  console.log("=== Step 4: Insert data into Supabase ===\n");

  // Validate required config
  validateConfig(["supabaseUrl", "supabaseServiceKey"]);

  // Load all data
  if (!fs.existsSync(config.extractedDataPath)) {
    throw new Error(
      `Extracted data not found. Run 01-extract-datocms.ts first.`,
    );
  }

  if (!fs.existsSync(config.imageMapPath)) {
    throw new Error(`Image map not found. Run 02-upload-images-s3.ts first.`);
  }

  if (!fs.existsSync(config.blurMapPath)) {
    throw new Error(`Blur map not found. Run 03-generate-blur.ts first.`);
  }

  const extractedData: ExtractedData = JSON.parse(
    fs.readFileSync(config.extractedDataPath, "utf-8"),
  );

  const imageMap: ImageMap = JSON.parse(
    fs.readFileSync(config.imageMapPath, "utf-8"),
  );

  const blurMap: BlurMap = JSON.parse(
    fs.readFileSync(config.blurMapPath, "utf-8"),
  );

  // Initialize Supabase client with service role key
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

  // Collect unique categories
  const categoryMap = new Map<string, string>(); // "main/sub" -> category_id

  console.log("Step 4.1: Inserting categories...\n");

  for (const post of extractedData.posts) {
    const cat = post.category?.category;
    if (!cat) continue;

    for (const [mainCategory, subCategory] of Object.entries(cat)) {
      const key = `${mainCategory}/${subCategory}`;
      if (categoryMap.has(key)) continue;

      // Check if category exists
      const { data: existing } = await supabase
        .from("categories")
        .select("id")
        .eq("main_category", mainCategory)
        .eq("sub_category", subCategory)
        .single();

      if (existing) {
        categoryMap.set(key, existing.id);
        console.log(`Category exists: ${key}`);
      } else {
        // Insert new category
        const { data: inserted, error } = await supabase
          .from("categories")
          .insert({
            main_category: mainCategory,
            sub_category: subCategory,
          })
          .select("id")
          .single();

        if (error) {
          console.error(`Error inserting category ${key}:`, error);
          continue;
        }

        categoryMap.set(key, inserted.id);
        console.log(`Inserted category: ${key}`);
      }
    }
  }

  console.log(`\nTotal categories: ${categoryMap.size}\n`);

  console.log("Step 4.2: Inserting images...\n");

  const imageIdMap = new Map<string, string>(); // s3Key -> image_id

  for (const [originalUrl, imageInfo] of Object.entries(imageMap)) {
    const { s3Key } = imageInfo;

    // Find post that uses this image
    const post = extractedData.posts.find(
      (p) => p.metaField?.image?.url === originalUrl,
    );

    // Check if image exists
    const { data: existing } = await supabase
      .from("images")
      .select("id")
      .eq("s3_key", s3Key)
      .single();

    if (existing) {
      imageIdMap.set(s3Key, existing.id);
      console.log(`Image exists: ${s3Key}`);
      continue;
    }

    // Get blur data
    const blurData = blurMap[s3Key];

    // Insert new image
    const { data: inserted, error } = await supabase
      .from("images")
      .insert({
        s3_key: s3Key,
        original_url: originalUrl,
        alt: post?.metaField?.image?.alt || null,
        title: post?.metaField?.image?.title || null,
        width: post?.metaField?.image?.width || null,
        height: post?.metaField?.image?.height || null,
        blur_data_url: blurData?.base64 || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error(`Error inserting image ${s3Key}:`, error);
      continue;
    }

    imageIdMap.set(s3Key, inserted.id);
    console.log(`Inserted image: ${s3Key}`);
  }

  console.log(`\nTotal images: ${imageIdMap.size}\n`);

  console.log("Step 4.3: Inserting posts...\n");

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const post of extractedData.posts) {
    // Check if post already exists by legacy_id
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("legacy_id", post.id)
      .single();

    if (existing) {
      console.log(`Post exists (legacy_id: ${post.id}): ${post.metaField?.title}`);
      skippedCount++;
      continue;
    }

    // Get category ID
    const cat = post.category?.category;
    let categoryId: string | null = null;

    if (cat) {
      const [mainCategory, subCategory] = Object.entries(cat)[0];
      const key = `${mainCategory}/${subCategory}`;
      categoryId = categoryMap.get(key) || null;
    }

    if (!categoryId) {
      console.error(`No category found for post ${post.id}`);
      errorCount++;
      continue;
    }

    // Get thumbnail ID
    let thumbnailId: string | null = null;
    const imageUrl = post.metaField?.image?.url;

    if (imageUrl) {
      const imageInfo = imageMap[imageUrl];
      if (imageInfo) {
        thumbnailId = imageIdMap.get(imageInfo.s3Key) || null;
      }
    }

    // Insert post
    const { error } = await supabase.from("posts").insert({
      legacy_id: post.id,
      title: post.metaField?.title || "Untitled",
      description: post.metaField?.description || null,
      markdown: post.markdown || "",
      thumbnail_id: thumbnailId,
      category_id: categoryId,
      is_public: post.ispublic !== false,
      created_at: post._createdAt,
      updated_at: post._createdAt,
    });

    if (error) {
      console.error(`Error inserting post ${post.id}:`, error);
      errorCount++;
      continue;
    }

    console.log(`Inserted post: ${post.metaField?.title}`);
    successCount++;
  }

  console.log(`\n=== Insert Summary ===`);
  console.log(`Categories: ${categoryMap.size}`);
  console.log(`Images: ${imageIdMap.size}`);
  console.log(`Posts - Successful: ${successCount}`);
  console.log(`Posts - Skipped (already exists): ${skippedCount}`);
  console.log(`Posts - Errors: ${errorCount}`);
  console.log("\n=== Step 4 Complete ===");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
