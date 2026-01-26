import { cache } from "react";
import { supabase } from "@/libs/supabase";
import { toPostWithoutMarkdownType } from "@/libs/supabase/converter";
import type { PostWithoutMarkdownType } from "@/types/apiResponseType";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getPosts = async <T>(_query?: string): Promise<T> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      category:categories(*),
      thumbnail:images(*)
    `,
    )
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  if (!data) {
    return { allArticles: [] } as T;
  }

  const posts: PostWithoutMarkdownType[] = data.map((row) =>
    toPostWithoutMarkdownType(row),
  );

  return { allArticles: posts } as T;
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPosts = cache(_getPosts);
