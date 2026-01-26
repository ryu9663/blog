/**
 * Step 5: 마이그레이션 검증
 *
 * 실행: pnpm tsx scripts/migration/05-verify.ts
 */

import * as fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { config, validateConfig } from "./config";

interface ExtractedData {
  posts: Array<{
    id: number;
    _createdAt: string;
    metaField: {
      title: string;
    };
  }>;
}

async function main() {
  console.log("=== Step 5: Verify Migration ===\n");

  // Validate required config
  validateConfig(["supabaseUrl", "supabaseServiceKey", "cloudfrontDomain"]);

  // Load extracted data for comparison
  if (!fs.existsSync(config.extractedDataPath)) {
    throw new Error(
      `Extracted data not found. Run 01-extract-datocms.ts first.`,
    );
  }

  const extractedData: ExtractedData = JSON.parse(
    fs.readFileSync(config.extractedDataPath, "utf-8"),
  );

  // Initialize Supabase client
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

  console.log("1. Checking record counts...\n");

  // Count posts
  const { count: postCount, error: postError } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  if (postError) {
    console.error("Error counting posts:", postError);
  } else {
    console.log(`Posts in DatoCMS: ${extractedData.posts.length}`);
    console.log(`Posts in Supabase: ${postCount}`);
    console.log(
      postCount === extractedData.posts.length
        ? "✓ Post count matches"
        : "✗ Post count mismatch",
    );
  }

  // Count categories
  const { count: categoryCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  console.log(`\nCategories in Supabase: ${categoryCount}`);

  // Count images
  const { count: imageCount } = await supabase
    .from("images")
    .select("*", { count: "exact", head: true });

  console.log(`Images in Supabase: ${imageCount}`);

  console.log("\n2. Checking image accessibility...\n");

  // Sample a few images to check CloudFront accessibility
  const { data: sampleImages } = await supabase
    .from("images")
    .select("s3_key")
    .limit(5);

  let accessibleCount = 0;
  let inaccessibleCount = 0;

  if (sampleImages) {
    for (const image of sampleImages) {
      const url = `https://${config.cloudfrontDomain}/${image.s3_key}`;

      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          console.log(`✓ Accessible: ${image.s3_key}`);
          accessibleCount++;
        } else {
          console.log(`✗ Not accessible (${response.status}): ${image.s3_key}`);
          inaccessibleCount++;
        }
      } catch (error) {
        console.log(`✗ Error checking: ${image.s3_key}`);
        inaccessibleCount++;
      }
    }
  }

  console.log(
    `\nImage accessibility: ${accessibleCount}/${sampleImages?.length || 0} accessible`,
  );

  console.log("\n3. Checking post data integrity...\n");

  // Verify a few posts have all required fields
  const { data: samplePosts } = await supabase
    .from("posts")
    .select(
      `
      id,
      legacy_id,
      title,
      markdown,
      category:categories(main_category, sub_category),
      thumbnail:images(s3_key, blur_data_url)
    `,
    )
    .limit(5);

  if (samplePosts) {
    for (const post of samplePosts) {
      const issues: string[] = [];

      if (!post.title) issues.push("missing title");
      if (!post.markdown) issues.push("missing markdown");
      if (!post.category) issues.push("missing category");

      if (issues.length === 0) {
        console.log(`✓ Post OK: ${post.title}`);
      } else {
        console.log(`✗ Post issues: ${post.title} - ${issues.join(", ")}`);
      }
    }
  }

  console.log("\n4. Checking legacy_id mapping...\n");

  // Verify legacy_id mapping
  let mappedCount = 0;
  let unmappedCount = 0;

  for (const datoPost of extractedData.posts.slice(0, 10)) {
    const { data } = await supabase
      .from("posts")
      .select("id, title")
      .eq("legacy_id", datoPost.id)
      .single();

    if (data) {
      console.log(`✓ Mapped: DatoCMS ID ${datoPost.id} -> Supabase`);
      mappedCount++;
    } else {
      console.log(`✗ Not mapped: DatoCMS ID ${datoPost.id}`);
      unmappedCount++;
    }
  }

  console.log(`\nLegacy ID mapping: ${mappedCount}/${mappedCount + unmappedCount} mapped`);

  console.log("\n=== Verification Summary ===\n");

  const allGood =
    postCount === extractedData.posts.length &&
    inaccessibleCount === 0 &&
    unmappedCount === 0;

  if (allGood) {
    console.log("✓ All checks passed! Migration appears successful.");
    console.log("\nNext steps:");
    console.log("1. Set DATA_SOURCE=supabase in .env");
    console.log("2. Run: pnpm dev");
    console.log("3. Verify all pages load correctly");
    console.log("4. Run: pnpm build");
    console.log("5. Deploy to staging for final verification");
  } else {
    console.log("✗ Some checks failed. Please review the issues above.");
    console.log("\nRecommendations:");
    if (postCount !== extractedData.posts.length) {
      console.log("- Re-run 04-insert-supabase.ts to insert missing posts");
    }
    if (inaccessibleCount > 0) {
      console.log("- Check S3 bucket permissions and CloudFront configuration");
    }
    if (unmappedCount > 0) {
      console.log("- Check for posts that failed to migrate");
    }
  }

  console.log("\n=== Step 5 Complete ===");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
