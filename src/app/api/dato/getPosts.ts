import { performRequest } from "@/libs/dato";
import { IMAGE_SIZE_IN_POSTS, REVALIDATE_TIME } from "@/utils/constant";

export const GET_META_FIELDS = `
  query allArticles {
    allArticles(orderBy: _createdAt_DESC) {
      id
      category
      _createdAt
      metaField {
        description
        title
        image {
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
      }    
    }
  }
`;

export const getPosts = async <T>(query = GET_META_FIELDS): Promise<T> => {
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
