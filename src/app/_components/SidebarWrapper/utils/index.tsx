import { CategoryType, LinkType } from "junyeol-components";
import Link from "next/link";

export const formatSidebarData = (
  input: {
    category: Partial<Record<CategoryType, string>>;
    _publishedAt: Date;
  }[]
) => {
  const result: {
    [key: string]: {
      category: CategoryType;
      subcategories: { subCategoryLink: LinkType; publishedAt: Date }[];
    };
  } = {};
  // 입력 배열을 순회하면서 카테고리와 서브카테고리를 추출하고 그룹화합니다.
  input.forEach((item) => {
    const publishedAt = item._publishedAt;
    const category = {
      linkText: Object.values(item.category)[0],
      linkPath: Object.keys(item.category)[0],
    };

    const categoryLink = `/posts/${category.linkPath}/${category.linkText}`;

    const categoryKey = Object.keys(item.category)[0] as CategoryType;
    const subCategoryLink = (
      <Link href={categoryLink}>{category.linkText}</Link>
    );

    if (!result[category.linkPath]) {
      result[categoryKey] = {
        category: categoryKey,
        subcategories: [],
      };
    }
    // 중복 제거
    if (
      !result[categoryKey].subcategories.some(
        (sub) => sub.subCategoryLink.props.href === subCategoryLink.props.href
      )
    ) {
      result[categoryKey].subcategories.push({ subCategoryLink, publishedAt });
    }
  });

  return Object.values(result);
};
