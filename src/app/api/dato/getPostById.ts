import { performRequest } from "@/libs/dato";

const PAGE_CONTENT_QUERY = `
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
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};
