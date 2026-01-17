import { cache } from "react";
import { getPostById } from "@/app/api/dato/getPostById";
import { getPosts } from "@/app/api/dato/getPosts";
import { HeadingIndexNav } from "@/app/_components/HeadingIndexNav";
import Markdown from "@/app/post/[id]/Markdown";
import { PostType } from "@/types";
import { Metadata } from "next";
import styles from "./index.module.scss";

interface PostPageParams {
  params: { id: string };
}

// React.cache()로 같은 요청 내 중복 호출 방지
const getCachedPostById = cache(async (postId: string) => {
  return getPostById<Pick<PostType, "markdown" | "metaField">>({ postId });
});

export async function generateStaticParams() {
  const { allArticles: articles } = await getPosts<{
    allArticles: Pick<PostType, "id">[];
  }>(`
  query allArticles {
    allArticles(orderBy: _createdAt_DESC) {
      id
    }
  }
`);
  return articles.map(({ id }) => ({
    postId: id,
  }));
}

export default async function PostPageFilteredById({ params }: PostPageParams) {
  const {
    article: { markdown },
  } = await getCachedPostById(params.id);

  return (
    <div className={`${styles.post_wrapper}`}>
      <Markdown markdown={markdown} />
      <HeadingIndexNav markdown={markdown} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: PostPageParams): Promise<Metadata> {
  const data = await getCachedPostById(params.id);

  const { metaField } = data.article;

  return {
    title: metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
