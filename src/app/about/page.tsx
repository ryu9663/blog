import { getMarkdowns } from "@/app/api/notion/controller/notionController";
import "@/styles/_global.scss";
import { REVALIDATE_TIME } from "@/utils/revalidate";

import { Metadata } from "next";
import Image from "next/image";
import Markdown from "react-markdown";

export const metadata: Metadata = {
  title: "About",
  description: "About",
};

export const revalidate = REVALIDATE_TIME;

export default async function About() {
  const portfolioMarkdown = await getMarkdowns([
    process.env.NOTION_PORTFOLIO_POST_ID as string,
  ]);

  return (
    <main>
      hello world About
      <div style={{ marginTop: "200px" }}>
        <Image
          width={600}
          height={330}
          src="https://prod-files-secure.s3.us-west-2.amazonaws.com/bdc67cfb-afe7-4f3e-94cb-cdd0a20dafb1/13b4391d-a1c8-407e-871a-0196aed74d4a/portfolio_profile.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20231003%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231003T051455Z&X-Amz-Expires=3600&X-Amz-Signature=48de0cd6a235de3ff98f652ae5586d7fcad580c2bf3c3af59fa10ca524e6ec62&X-Amz-SignedHeaders=host&x-id=GetObject"
          alt="portfolio_profile.png"
        />
        <Markdown>{portfolioMarkdown[0]}</Markdown>
      </div>
    </main>
  );
}
