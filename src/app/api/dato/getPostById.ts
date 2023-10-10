import { performRequest } from "@/libs/dato";
import { REVALIDATE_TIME } from "@/utils/constant";

export const GET_POST_BY_ID = `
  query Article($ItemId: ItemId!) {
    aritlcle(filter: { id: { eq: $ItemId } }) {
      id
      markdown(markdown: true)
    }
  }
`;

export const getPostById = async ({ postId }: { postId: string }) => {
  try {
    const { data } = await performRequest({
      query: GET_POST_BY_ID,
      variables: {
        ItemId: postId,
      },
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};
