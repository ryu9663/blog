import { getPostIds } from "@/app/api/dato/getPostIds";
import { getPosts } from "@/app/api/dato/getPosts";
import { PostType } from "@/types";
import { Category } from "junyeol-components";
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
  const __categories = _categories.map(({ category }) => category.category);

  const categoriesSet = new Set(
    __categories.flatMap((item) => Object.keys(item))
  );
  const subCategoriesSet = new Set(
    __categories.flatMap((item) =>
      Object.entries(item).map(([key, value]) => `${key}/${value}`)
    )
  );

  const categories = Array.from(categoriesSet).map(
    (category) => `posts/${category}`
  );
  const subCategories = Array.from(subCategoriesSet).map(
    (subCategory) => `posts/${subCategory}`
  );

  return { categories, subCategories };
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

  const postIds = allPostIds.map(({ id }) => `post/${id}`);
  const { categories, subCategories } =
    getCategoriesAndSubCategories(_categories);

  const changeFrequency: ChangeFrequencyType = "daily";
  const routes: SitemapType[] = [
    "",
    "about",
    "posts",
    ...postIds,
    ...categories,
    ...subCategories,
  ].map((route) => ({
    url: `https://www.wnsdufdl.com/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority: 1,
  }));

  return [...routes];
}
