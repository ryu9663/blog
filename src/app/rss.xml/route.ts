import { generateRss } from "@/app/rss.xml/generateRss";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET() {
  const feedXml = await generateRss();

  if (feedXml) {
    return new Response(feedXml, {
      headers: { "Content-Type": "application/xml" },
    });
  } else {
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
