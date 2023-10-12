import { Metadata } from "next";
import { getPostById } from "@/app/api/dato/getPostById";
import { convertImgTag } from "@/utils/convertImgTag";
import { Post } from "@/app/_components/Post";

export default async function About() {
  const { article } = await getPostById<"markdown">({
    postId: "198173441",
  });

  return (
    <>
      <Post article={article} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const { article } = await getPostById<"metaField">({ postId: "198173441" });
  const { metaField } = article;

  return {
    title: metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
