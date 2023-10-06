import { performRequest } from "@/libs/dato";
import { REVALIDATE_TIME } from "@/utils/constant";

export const PAGE_CONTENT_QUERY = `
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
      query: PAGE_CONTENT_QUERY,
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
