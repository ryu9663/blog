import Cards from "@/app/_components/Cards";
import { getPosts } from "@/app/api/dato/getPosts";
import { Metadata } from "next";
import { PostType } from "@/types";
import { Posts } from "@/app/_components/Posts";

export const metadata: Metadata = {
  title: "류준열 기술 블로그",
  description: "프론트엔드 개발자 류준열 이력서",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default async function Home() {
  const { allArticles: articles } = await getPosts<{
    allArticles: Pick<
      PostType,
      "id" | "metaField" | "media" | "category" | "_createdAt"
    >[];
  }>();

  return (
    <>
      <Posts>
        <Cards articles={articles} />
      </Posts>
    </>
  );
}
