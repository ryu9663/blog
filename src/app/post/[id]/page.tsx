import { getPostById } from "@/app/api/dato/getPostById";
import { getPosts } from "@/app/api/dato/getPosts";
import Markdown from "@/app/post/[id]/Markdown";
import { PostType } from "@/types";
import { Metadata } from "next";

interface PostPageParams {
  params: { id: string };
}

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
  const { article } = await getPostById<
    Pick<PostType, "markdown" | "metaField">
  >({
    postId: params.id,
  });

  return <Markdown article={article} />;
}

export async function generateMetadata({
  params,
}: PostPageParams): Promise<Metadata> {
  const data = await getPostById<Pick<PostType, "metaField">>({
    postId: String(params.id),
  });

  const { metaField } = data.article;

  return {
    title: metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
