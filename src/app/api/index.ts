import { DATA_SOURCE } from "@/config/dataSource";
import * as dato from "./dato";
import * as supabase from "./supabase";

// Feature Flag 기반 API 전환
const api = DATA_SOURCE === "supabase" ? supabase : dato;

export const { getPosts, getPostById, getCategories, getPostIds } = api;

// 타입 re-export (기존 코드 호환성 유지)
export type { PostType, PostWithoutMarkdownType } from "@/types/apiResponseType";
