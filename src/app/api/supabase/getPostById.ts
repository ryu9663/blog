import { cache } from "react";
import { supabase } from "@/libs/supabase";
import { toPostType } from "@/libs/supabase/converter";
import type { PostWithRelations } from "@/libs/supabase/types";

interface GetPostByIdParams {
  postId: string;
}

const _getPostById = async <T>({
  postId,
}: GetPostByIdParams): Promise<{ article: T }> => {
  // legacy_id로 먼저 조회 시도
  const { data: dataByLegacyId, error: errorByLegacyId } = await supabase
    .from("posts")
    .select(
      `
      *,
      category:categories(*),
      thumbnail:images(*)
    `,
    )
    .eq("legacy_id", parseInt(postId, 10))
    .single();

  let data = dataByLegacyId as PostWithRelations | null;
  let error = errorByLegacyId;

  // legacy_id로 못 찾으면 UUID로 조회 시도
  if (error || !data) {
    const { data: dataByUuid, error: errorByUuid } = await supabase
      .from("posts")
      .select(
        `
        *,
        category:categories(*),
        thumbnail:images(*)
      `,
      )
      .eq("id", postId)
      .single();

    data = dataByUuid as PostWithRelations | null;
    error = errorByUuid;
  }

  if (error) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Post not found: ${postId}`);
  }

  const post = toPostType(data) as unknown as T;

  return { article: post };
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPostById = cache(_getPostById);
