import Post from "@/app/_components/Post";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";
import { getPostById } from "@/app/api/dato/getPostById";
import { PostType } from "@/types";
import { Metadata } from "next";

interface PostPageParams {
  params: { id: string };
}

export default async function PostPageFilteredById({ params }: PostPageParams) {
  const { article } = await getPostById<
    Pick<PostType, "markdown" | "metaField">
  >({
    postId: params.id,
  });

  console.log("안녕", params.id);
  return <Post article={article} />;
}

export async function generateMetadata({
  params,
}: PostPageParams): Promise<Metadata> {
  const data = await getPostById<Pick<PostType, "metaField">>({
    postId: String(params.id),
  });

  const { metaField } = data.article;

  return {
    title: "류준열의 기술 블로그 | " + metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
