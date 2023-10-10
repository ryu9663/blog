import { Metadata } from "next";
import { getPostById } from "@/app/api/dato/getPostById";
import { convertImgTag } from "@/utils/convertImgTag";
import { Post } from "@/app/_components/Post";

export default async function About() {
  const { aritlcle } = await getPostById({ postId: "198173441" });
  const { markdown: _markdown } = aritlcle;
  const markdown = convertImgTag(_markdown);

  return (
    <>
      <Post markdown={markdown} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const { aritlcle } = await getPostById({ postId: "198173441" });
  const { metaField } = aritlcle;

  return {
    title: metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
