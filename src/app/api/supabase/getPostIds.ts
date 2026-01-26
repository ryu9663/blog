import { cache } from "react";
import { supabase } from "@/libs/supabase";

interface PostId {
  id: number;
}

interface PostIdRow {
  id: string;
  legacy_id: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getPostIds = async <T>(_query?: string): Promise<{ allArticles: T }> => {
  const { data, error } = await supabase
    .from("posts")
    .select("id, legacy_id")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch post IDs: ${error.message}`);
  }

  if (!data) {
    return { allArticles: [] as unknown as T };
  }

  // legacy_id가 있으면 그것을 사용, 없으면 UUID의 일부를 숫자로 변환
  const postIds: PostId[] = (data as PostIdRow[]).map((row) => ({
    id:
      row.legacy_id ||
      parseInt(row.id.replace(/-/g, "").slice(0, 8), 16),
  }));

  return { allArticles: postIds as unknown as T };
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPostIds = cache(_getPostIds);
