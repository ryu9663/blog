import "@/styles/_global.scss";
import { REVALIDATE_TIME } from "@/utils/revalidate";
import parser from "html-react-parser";
import { Metadata } from "next";
import { getPostById } from "@/app/api/dato/getPostById";

export const metadata: Metadata = {
  title: "Create Next About",
  description: "gjgj",
};

export const revalidate = 10;

export default async function About() {
  const post = await getPostById({ postId: "198173441" });

  return (
    <main>
      hello world About
      <div style={{ marginTop: "200px" }}>{parser(post)}</div>
    </main>
  );
}
