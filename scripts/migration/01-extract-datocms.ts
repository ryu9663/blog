/**
 * Step 1: DatoCMS에서 모든 데이터 추출
 *
 * 실행: pnpm tsx scripts/migration/01-extract-datocms.ts
 */

import * as fs from "fs";
import * as path from "path";
import { config, validateConfig } from "./config";

interface DatoCMSPost {
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
      alt: string;
      url: string;
      title?: string;
      width?: number;
      height?: number;
      responsiveImage?: {
        base64: string;
      };
    };
  };
}

interface ExtractedData {
  posts: DatoCMSPost[];
  extractedAt: string;
}

const QUERY = `
  query allArticles {
    allArticles(orderBy: _createdAt_DESC, first: "100") {
      id
      _createdAt
      markdown(markdown: false)
      ispublic
      category
      metaField {
        title
        description
        image {
          alt
          url
          title
          width
          height
          responsiveImage {
            base64
          }
        }
      }
    }
  }
`;

async function fetchFromDatoCMS(): Promise<DatoCMSPost[]> {
  console.log("Fetching data from DatoCMS...");

  const response = await fetch(config.datoApiEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.datoApiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!response.ok) {
    throw new Error(`DatoCMS API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data.allArticles;
}

async function main() {
  console.log("=== Step 1: Extract data from DatoCMS ===\n");

  // Validate required config
  validateConfig(["datoApiToken"]);

  // Ensure output directory exists
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Fetch data
  const posts = await fetchFromDatoCMS();
  console.log(`Found ${posts.length} posts\n`);

  // Log summary
  const publicPosts = posts.filter((p) => p.ispublic !== false);
  const privatePosts = posts.filter((p) => p.ispublic === false);
  console.log(`Public posts: ${publicPosts.length}`);
  console.log(`Private posts: ${privatePosts.length}`);

  // Extract unique categories
  const categories = new Set<string>();
  posts.forEach((post) => {
    const cat = post.category?.category;
    if (cat) {
      Object.entries(cat).forEach(([main, sub]) => {
        categories.add(`${main}/${sub}`);
      });
    }
  });
  console.log(`\nUnique categories: ${categories.size}`);
  categories.forEach((cat) => console.log(`  - ${cat}`));

  // Extract unique image URLs
  const imageUrls = new Set<string>();
  posts.forEach((post) => {
    if (post.metaField?.image?.url) {
      imageUrls.add(post.metaField.image.url);
    }
  });
  console.log(`\nUnique images: ${imageUrls.size}`);

  // Save extracted data
  const extractedData: ExtractedData = {
    posts,
    extractedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    config.extractedDataPath,
    JSON.stringify(extractedData, null, 2),
  );

  console.log(`\nData saved to: ${config.extractedDataPath}`);
  console.log("\n=== Step 1 Complete ===");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
