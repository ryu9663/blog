import { cache } from "react";
import { supabase } from "@/libs/supabase";

interface PostId {
  id: string;
}

interface PostIdRow {
  id: string;
  datocms_id: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getPostIds = async <T>(_query?: string): Promise<{ allArticles: T }> => {
  const { data, error } = await supabase
    .from("posts")
    .select("id, datocms_id")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch post IDs: ${error.message}`);
  }

  if (!data) {
    return { allArticles: [] as unknown as T };
  }

  // datocms_id가 있으면 그것을 사용, 없으면 UUID 사용
  const postIds: PostId[] = (data as PostIdRow[]).map((row) => ({
    id: row.datocms_id || row.id,
  }));

  return { allArticles: postIds as unknown as T };
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPostIds = cache(_getPostIds);
