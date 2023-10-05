import { performRequest } from "@/app/api/dato";

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

    const { markdown } = data.aritlcle;
    const regex = /<img src="([^?]+)\?w=(\d+)&h=(\d+)" alt="([^"]+)">/g;
    const updatedStr = markdown.replace(
      regex,
      //layout shift방지를 위해 width,height를 img태그에 추가
      '<img src="$1" alt="$4" width="$2" height="$3">'
    );
    return updatedStr;
  } catch (err) {
    console.error(err);
  }
};
