import { getPosts } from "@/app/api/notion";
import "@/styles/_global.scss";
import { REVALIDATE_TIME } from "@/utils/revalidate";
import { Metadata } from "next";
import Markdown from "react-markdown";

export const metadata: Metadata = {
  title: "Create Next About",
  description: "gjgj",
};

export const revalidate = REVALIDATE_TIME;

export default async function About() {
  const posts = await getPosts();

  return (
    <main>
      hello world About
      <div style={{ marginTop: "200px" }}>
        {posts.map((post, i) => (
          <Markdown key={i}>{post}</Markdown>
        ))}
      </div>
    </main>
  );
}
