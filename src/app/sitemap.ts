import { getPostIds } from "@/app/api/dato/getPostIds";
import { getPosts } from "@/app/api/dato/getPosts";
import { PostType } from "@/types";
import { MetadataRoute } from "next";

type ChangeFrequencyType =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapType {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

const getCategoriesAndSubCategories = (
  _categories: Pick<PostType, "category">[]
) => {
  const categories = _categories.map(({ category }) => category.category);

  const categoriesSet = new Set(
    categories.flatMap((item) => Object.keys(item))
  );
  const subCategoriesSet = new Set(
    categories.flatMap((item) =>
      Object.entries(item).map(([key, value]) => `${key}/${value}`)
    )
  );

  const mainCategoriesUrlPath = Array.from(categoriesSet).map(
    (category) => `posts/${category}`
  );
  const subCategoriesUrlPath = Array.from(subCategoriesSet).map(
    (subCategory) => `posts/${subCategory}`
  );

  return { mainCategoriesUrlPath, subCategoriesUrlPath };
};

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allArticles: allPostIds } = await getPostIds<{ id: string }[]>();
  const { allArticles: _categories } = await getPosts<{
    allArticles: Pick<PostType, "category">[];
  }>(`query allArticles {
    allArticles(orderBy: _createdAt_DESC) {
      category 
    }
  }`);

  const postIdsUrlPath = allPostIds.map(({ id }) => `post/${id}`);
  const { mainCategoriesUrlPath, subCategoriesUrlPath } =
    getCategoriesAndSubCategories(_categories);

  const changeFrequency: ChangeFrequencyType = "daily";
  const routes: SitemapType[] = [
    "",
    "about",
    ...postIdsUrlPath,
    ...mainCategoriesUrlPath,
    ...subCategoriesUrlPath,
  ].map((route) => ({
    url: `https://www.wnsdufdl.com/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority: 1,
  }));

  return [...routes];
}
