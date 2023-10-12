import { Post } from "@/app/_components/Post";
import { getPostById } from "@/app/api/dato/getPostById";
import { PostType } from "@/types";
import { convertImgTag } from "@/utils/convertImgTag";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const { article } = await getPostById<"markdown">({
    postId: params.id,
  });
  const { markdown: _markdown } = article;
  const markdown = convertImgTag(_markdown);
  return (
    <>
      <Post markdown={markdown} />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { article } = await getPostById<"metaField">({
    postId: String(params.id),
  });
  const { metaField } = article;

  return {
    title: "류준열의 기술 블로그 | " + metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
