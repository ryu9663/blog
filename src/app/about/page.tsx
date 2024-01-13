import { Metadata } from "next";
import { getPostById } from "@/app/api/dato/getPostById";
import { PostType } from "@/types";
import Markdown from "@/app/post/[id]/Markdown";

export default async function About() {
  const { article } = await getPostById<
    Pick<PostType, "markdown" | "metaField">
  >({
    postId: "198173441",
  });

  return <Markdown article={article} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const { article } = await getPostById<Pick<PostType, "metaField">>({
    postId: "198173441",
  });
  const { metaField } = article;

  return {
    title: metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
