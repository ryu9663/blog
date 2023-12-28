import { devideCategoryObject } from "@/utils/getCategoryLink";
import { CategoryType, LinkType } from "junyeol-components";
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
