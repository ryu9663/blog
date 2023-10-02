import { Cards } from "@/app/_components/Cards";
import { getPostMetaDatas, getPosts } from "@/app/api/notion";
import "@/styles/_global.scss";
import { REVALIDATE_TIME } from "@/utils/revalidate";
import { Card } from "junyeol-components";
import { Metadata } from "next";
import Image from "next/image";
import Markdown from "react-markdown";

export const metadata: Metadata = {
  title: "Create Next About",
  description: "gjgj",
};

export const revalidate = REVALIDATE_TIME;

export default async function About() {
  const metas = await getPostMetaDatas();
  console.log(metas);
  return (
    <main>
      hello world About
      <div style={{ marginTop: "200px" }}>
        <Cards metas={metas} />
      </div>
    </main>
  );
}
