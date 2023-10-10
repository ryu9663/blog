import { Post } from "@/app/_components/Post";
import { getPostById } from "@/app/api/dato/getPostById";
import { convertImgTag } from "@/utils/convertImgTag";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const { aritlcle } = await getPostById({ postId: params.id });
  const { markdown: _markdown } = aritlcle;
  const markdown = convertImgTag(_markdown);
  return (
    <>
      <span>TODO : router.push로 해도 코드스니펫 스크립트 안날아가게 하기</span>
      <Post markdown={markdown} />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { aritlcle } = await getPostById({ postId: String(params.id) });
  const { metaField } = aritlcle;

  return {
    title: metaField.title,
    openGraph: {
      images: metaField.image.url,
    },
    description: metaField.description,
  };
}
