import { cache } from "react";
import { performRequest } from "@/libs/dato";

import { REVALIDATE_TIME } from "@/utils/constant";

export const GET_POST_BY_ID = `
  query Article($ItemId: ItemId!) {
    article(filter: { 
      id: { eq: $ItemId },
    }) {
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

const _getPostById = async <T>(
  {
    postId,
  }: {
    postId: string;
  },
  query = GET_POST_BY_ID,
): Promise<{
  article: T;
}> => {
  try {
    const { data } = await performRequest<{
      article: T;
    }>({
      query,
      variables: {
        ItemId: postId,
        BooleanType: true,
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

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPostById = cache(_getPostById);
