import { performRequest } from "@/libs/dato";
import { REVALIDATE_TIME } from "@/utils/constant";

export const GET_POSTIDS = `
  query allArticles {
    allArticles(orderBy: _createdAt_DESC) {
      id
    }
  }
`;

export const getPostIds = async <T>(
  query = GET_POSTIDS,
): Promise<{ allArticles: T }> => {
  try {
    const { data } = await performRequest<{ allArticles: T }>({
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
