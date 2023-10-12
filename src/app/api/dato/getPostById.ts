import { performRequest } from "@/libs/dato";
import { PostType } from "@/types";
import { IMAGE_SIZE_IN_POSTS, REVALIDATE_TIME } from "@/utils/constant";

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
        media {
          title
          responsiveImage(imgixParams: { fit: crop, w: ${IMAGE_SIZE_IN_POSTS.width}, h: ${IMAGE_SIZE_IN_POSTS.height}, auto: format }) {
            src
            sizes
            height
            width
            alt
            title
            base64
          }
      }
      media {
        title
        responsiveImage(imgixParams: { fit: crop, w:800 , auto: format }) {
          src
          sizes
          height
          width
          alt
          title
          base64
        }
      }
    }
  }
`;

export const getPostById = async <T>({
  postId,
}: {
  postId: string;
}): Promise<{
  article: T;
}> => {
  try {
    const { data } = await performRequest<{
      article: T;
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
