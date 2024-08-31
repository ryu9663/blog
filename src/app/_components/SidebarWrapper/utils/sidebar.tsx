import { PostType } from "@/types";
import { devideCategoryObject } from "@/utils/getCategoryLink";
import { CategoryType, LinkType, SubCategoryType } from "junyeol-components";
import Link from "next/link";

export const formatSidebarData = (
  input: {
    category: Partial<Record<CategoryType, string>>;
    _createdAt: string;
  }[],
) => {
  const result: {
    [key: string]: {
      category: CategoryType;
      subcategories: { subCategoryLink: LinkType; createdAt: string }[];
    };
  } = {};
  // 입력 배열을 순회하면서 카테고리와 서브카테고리를 추출하고 그룹화합니다.
  input.forEach((item) => {
    const createdAt = item._createdAt;
    const { mainCategory, subCategory } = devideCategoryObject(item.category);
    const categoryLink = `/posts/${mainCategory}/${subCategory}`;

    const subCategoryLink = <Link href={categoryLink}>{subCategory}</Link>;

    if (!result[mainCategory]) {
      result[mainCategory] = {
        category: mainCategory,
        subcategories: [],
      };
    }
    // 중복 제거
    if (
      !result[mainCategory].subcategories.some(
        (sub) => sub.subCategoryLink.props.href === subCategoryLink.props.href,
      )
    ) {
      result[mainCategory].subcategories.push({
        subCategoryLink,
        createdAt,
      });
    }
  });

  return Object.values(result);
};

/** 현재 퍼블리시 된 게시글들의 subCategory, side바에 게시글이 없는 subCategory를 보여주지 않기 위함. */
export const getPublishedSubCategories = ({
  posts,
  categories,
}: {
  posts: PostType[];
  categories: {
    category: CategoryType;
    subcategories: SubCategoryType[];
  }[];
}) => {
  const publishedSubCategories = posts
    .map((post) => post.category.category)
    .map((category) => Object.values(category)[0]);

  const allPublishedCategories: {
    category: CategoryType;
    subcategories: SubCategoryType[];
  }[] = categories.map(({ category, subcategories }) => {
    return {
      category,
      subcategories: subcategories.filter((e) => {
        console.log(
          !!publishedSubCategories.includes(e.subCategoryLink.props.children),
        );
        return !!publishedSubCategories.includes(
          e.subCategoryLink.props.children,
        );
      }),
    };
  });

  return allPublishedCategories;
};
