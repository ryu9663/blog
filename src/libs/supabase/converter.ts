import { CategoryType } from "junyeol-components";
import { CLOUDFRONT_DOMAIN } from "@/config/dataSource";
import { IMAGE_SIZE_IN_POSTS } from "@/utils/constant";
import type {
  PostType,
  PostWithoutMarkdownType,
  ResponsiveImageType,
} from "@/types/apiResponseType";
import type { PostWithRelations, CategoryRow } from "./types";

/**
 * CloudFront URL 생성
 */
const getCloudFrontUrl = (s3Key: string): string => {
  if (!CLOUDFRONT_DOMAIN) {
    throw new Error("CLOUDFRONT_DOMAIN is not configured");
  }
  return `https://${CLOUDFRONT_DOMAIN}/${s3Key}`;
};

/**
 * Supabase PostRow를 기존 PostType으로 변환
 */
export const toPostType = (row: PostWithRelations): PostType => {
  const imageUrl = row.thumbnail
    ? getCloudFrontUrl(row.thumbnail.s3_key)
    : "";

  const responsiveImage: ResponsiveImageType = row.thumbnail
    ? {
        src: imageUrl,
        sizes: `(max-width: ${IMAGE_SIZE_IN_POSTS.width}px) 100vw, ${IMAGE_SIZE_IN_POSTS.width}px`,
        width: row.thumbnail.width || IMAGE_SIZE_IN_POSTS.width,
        height: row.thumbnail.height || IMAGE_SIZE_IN_POSTS.height,
        alt: row.thumbnail.alt || "",
        title: row.thumbnail.title || "",
        base64: row.thumbnail.blur_data_url || "",
      }
    : {
        src: "",
        sizes: "",
        width: IMAGE_SIZE_IN_POSTS.width,
        height: IMAGE_SIZE_IN_POSTS.height,
        alt: "",
        title: "",
        base64: "",
      };

  return {
    id: row.id, // Supabase UUID
    datocmsId: row.datocms_id || row.id, // URL용 DatoCMS ID
    _createdAt: row.created_at,
    category: {
      category: {
        [row.category.main_category as CategoryType]: row.category.sub_category,
      },
    },
    markdown: row.markdown,
    metaField: {
      title: row.title,
      description: row.description || "",
      image: {
        alt: row.thumbnail?.alt || "",
        url: imageUrl,
        responsiveImage,
      },
    },
    isPublic: row.is_public,
  };
};

/**
 * Supabase PostRow를 기존 PostWithoutMarkdownType으로 변환
 */
export const toPostWithoutMarkdownType = (
  row: PostWithRelations,
): PostWithoutMarkdownType => {
  const full = toPostType(row);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { markdown, ...withoutMarkdown } = full;
  return withoutMarkdown;
};

/**
 * CategoryRow를 기존 카테고리 형식으로 변환
 */
export const toCategoryFormat = (
  row: CategoryRow,
): Pick<PostWithoutMarkdownType, "category" | "_createdAt"> => {
  return {
    _createdAt: row.created_at,
    category: {
      category: {
        [row.main_category as CategoryType]: row.sub_category,
      },
    },
  };
};
