import { cache } from "react";
import { supabase } from "@/libs/supabase";
import { toCategoryFormat } from "@/libs/supabase/converter";
import type { PostWithoutMarkdownType } from "@/types/apiResponseType";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getCategories = async <T>(_query?: string): Promise<T> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  if (!data) {
    return { allArticles: [] } as T;
  }

  const categories: Pick<PostWithoutMarkdownType, "category" | "_createdAt">[] =
    data.map((row) => toCategoryFormat(row));

  return { allArticles: categories } as T;
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getCategories = cache(_getCategories);
