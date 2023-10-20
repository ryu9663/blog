import { performRequest } from "@/libs/dato";
import { IMAGE_SIZE_IN_POSTS, REVALIDATE_TIME } from "@/utils/constant";

export const GET_META_FIELDS = `
  query allArticles {
    allArticles {
      id
      category
      _createdAt
      metaField {
        description
        title
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
    }
  }
`;

export const getPosts = async <T>(): Promise<T> => {
  try {
    const { data } = await performRequest<T>({
      query: GET_META_FIELDS,
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
