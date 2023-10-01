import { getPosts } from "@/app/api/notion";
import "@/styles/_global.scss";
import { Metadata } from "next";
import Markdown from "react-markdown";

export const metadata: Metadata = {
  title: "Create Next About",
  description: "gjgj",
};

export default async function About() {
  "use server";
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
