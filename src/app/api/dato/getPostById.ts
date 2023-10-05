import { getClient } from "@/libs/apollo";
import { REVALIDATE_TIME } from "@/utils/revalidate";
import { gql } from "@apollo/client";

const PAGE_CONTENT_QUERY = gql`
  query Article($ItemId: ItemId!) {
    aritlcle(filter: { id: { eq: $ItemId } }) {
      id
      markdown(markdown: true)
    }
  }
`;

export const getPostById = async ({ postId }: { postId: string }) => {
  const query = await getClient().query({
    query: PAGE_CONTENT_QUERY,
    variables: { ItemId: postId },
    context: {
      fetchOptions: {
        next: { revalidate: REVALIDATE_TIME },
      },
    },
  });

  return query;
};
