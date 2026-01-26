import { cache } from "react";
import { supabase } from "@/libs/supabase";
import { toPostType } from "@/libs/supabase/converter";
import type { PostWithRelations } from "@/libs/supabase/types";

interface GetPostByIdParams {
  postId: string;
}

// UUID 형식인지 확인하는 함수
const isUuid = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// 숫자 형식인지 확인하는 함수
const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str);
};

const _getPostById = async <T>({
  postId,
}: GetPostByIdParams): Promise<{ article: T }> => {
  let data: PostWithRelations | null = null;
  let error: { message: string } | null = null;

  // 숫자 형식이면 legacy_id로 조회
  if (isNumeric(postId)) {
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

    data = dataByLegacyId as PostWithRelations | null;
    error = errorByLegacyId;
  }
  // UUID 형식이면 id로 조회
  else if (isUuid(postId)) {
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
  // 그 외 형식 (DatoCMS 문자열 ID 등)은 title로 조회 시도
  else {
    // 지원하지 않는 ID 형식
    error = { message: `Unsupported ID format: ${postId}` };
  }

  if (error || !data) {
    throw new Error(`Post not found: ${postId}`);
  }

  const post = toPostType(data) as unknown as T;

  return { article: post };
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPostById = cache(_getPostById);
