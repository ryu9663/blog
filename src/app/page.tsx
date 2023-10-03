import { Cards } from "@/app/_components/Cards";
import { getPostMetaDatas } from "@/app/api/notion/controller/notionController";
import { REVALIDATE_TIME } from "@/utils/revalidate";
import { Metadata } from "next";
import "@/styles/_global.scss";

export const metadata: Metadata = {
  title: "June's devlog",
  description: "June's devlog",
};

export const revalidate = REVALIDATE_TIME;

export default async function Home() {
  const metas = await getPostMetaDatas();
  return (
    <main>
      <div>June&apos;s devlog</div>
      <div style={{ marginTop: "200px" }}>
        <Cards metas={metas} />
      </div>
    </main>
  );
}
