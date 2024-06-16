import { PostType } from "@/types";

interface PaginateParams {
  posts: PostType[];
  currentPage: number;
  pageSize: number;
}
export const paginatePosts = ({
  posts,
  currentPage,
  pageSize,
}: PaginateParams) => {
  const starts = (currentPage - 1) * pageSize;
  const ends = currentPage * pageSize;
  const paginatedArticles = posts.slice(starts, ends);
  return paginatedArticles;
};
