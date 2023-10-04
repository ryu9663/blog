import { performRequest } from "@/libs/datocms";
import parser from "html-react-parser";
import "@/styles/_global.scss";
import { REVALIDATE_TIME } from "@/utils/revalidate";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next About",
  description: "gjgj",
};

export const revalidate = 10;

export default async function About() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });

  const { markdown } = data.aritlcle;
  const regex = /<img src="([^?]+)\?w=(\d+)&h=(\d+)" alt="([^"]+)">/g;

  const updatedStr = markdown.replace(
    regex,
    //layout shift방지를 위해 width,height를 img태그에 추가
    '<img src="$1" alt="$4" width="$2" height="$3">'
  );

  console.log(markdown);

  return (
    <main>
      hello world About
      <div style={{ marginTop: "200px" }}>{parser(updatedStr)}</div>
    </main>
  );
}
const PAGE_CONTENT_QUERY = `
  query {
    aritlcle(filter: {id: {eq: "198173441"}}) {
      id
      markdown(markdown: true)
    }
  }`;
