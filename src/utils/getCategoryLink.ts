import { CategoryType } from "junyeol-components";

export const devideCategoryObject = (
  _category: Partial<Record<CategoryType, string>>,
) => {
  const mainCategory = Object.keys(_category)[0] as CategoryType;
  const subCategory = Object.values(_category)[0];

  return { mainCategory, subCategory };
};
