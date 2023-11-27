import { performRequest } from "@/libs/dato";
import { REVALIDATE_TIME } from "@/utils/constant";

export const GET_CATEGORIES = `
  query allArticles {
    allArticles {
        _createdAt
        category
    }
  }
`;

export const getCategories = async <T>(query = GET_CATEGORIES): Promise<T> => {
  try {
    const { data } = await performRequest<T>({
      query,
      revalidate: REVALIDATE_TIME,
    });
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
  }
};
