import parser from "html-react-parser";
import { Metadata } from "next";
import { getPostById } from "@/app/api/dato/getPostById";
import { preventCLS } from "@/utils/preventCLS";

export const metadata: Metadata = {
  title: "류준열 기술 블로그 | 이력서",
  description: "프론트엔드 개발자 류준열 이력서",
};

export default async function About() {
  const { data } = await getPostById({ postId: "198173441" });
  const markdown = preventCLS(data.aritlcle.markdown);
  return (
    <main>
      hello world About
      <div style={{ marginTop: "200px" }}>{parser(markdown)}</div>
    </main>
  );
}
