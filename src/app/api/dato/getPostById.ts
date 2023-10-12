import { performRequest } from "@/libs/dato";
import { PostType } from "@/types";
import { REVALIDATE_TIME } from "@/utils/constant";

export const GET_POST_BY_ID = `
  query Article($ItemId: ItemId!) {
    article(filter: { id: { eq: $ItemId } }) {
      id
      markdown(markdown: false)
      metaField {
        description
        title
        image {
          alt
          url
        }
      }
    }
  }
`;

export const getPostById = async <T extends keyof PostType>({
  postId,
}: {
  postId: string;
}): Promise<{
  article: Pick<PostType, T>;
}> => {
  try {
    const { data } = await performRequest<{
      article: Pick<PostType, T>;
    }>({
      query: GET_POST_BY_ID,
      variables: {
        ItemId: postId,
      },
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
