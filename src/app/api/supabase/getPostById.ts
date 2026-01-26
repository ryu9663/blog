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

const _getPostById = async <T>({
  postId,
}: GetPostByIdParams): Promise<{ article: T }> => {
  let data: PostWithRelations | null = null;
  let error: { message: string } | null = null;

  // UUID 형식이면 Supabase id로 조회
  if (isUuid(postId)) {
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
  // 그 외 형식 (DatoCMS ID - 숫자 또는 문자열)은 datocms_id로 조회
  else {
    const { data: dataByDatocmsId, error: errorByDatocmsId } = await supabase
      .from("posts")
      .select(
        `
        *,
        category:categories(*),
        thumbnail:images(*)
      `,
      )
      .eq("datocms_id", postId)
      .single();

    data = dataByDatocmsId as PostWithRelations | null;
    error = errorByDatocmsId;
  }

  if (error || !data) {
    throw new Error(`Post not found: ${postId}`);
  }

  const post = toPostType(data) as unknown as T;

  return { article: post };
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPostById = cache(_getPostById);
