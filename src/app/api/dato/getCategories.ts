import { performRequest } from "@/libs/dato";
import { IMAGE_SIZE_IN_POSTS, REVALIDATE_TIME } from "@/utils/constant";

export const GET_CATEGORIES = `
  query allArticles {
    allArticles {
        _publishedAt
        category
    }
  }
`;

export const getCategories = async <T>(): Promise<T> => {
  try {
    const { data } = await performRequest<T>({
      query: GET_CATEGORIES,
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
