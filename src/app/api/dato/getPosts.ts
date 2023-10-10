import { performRequest } from "@/libs/dato";
import { REVALIDATE_TIME } from "@/utils/constant";

export const GET_POSTS = `
  query AllArticles {
    allAritlcles {
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

export const getPosts = async () => {
  try {
    const { data } = await performRequest({
      query: GET_POSTS,
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};
