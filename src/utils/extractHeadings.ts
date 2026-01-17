import { HeadingType } from "@/types";

export const extractHeadings = (markdown: string): HeadingType[] => {
  const regex = /^(#{2,5})\s+(.*)$/gm;

  return Array.from(markdown.matchAll(regex), ([, hashes, title]) => ({
    text: title,
    level: hashes.length,
    id: title,
  }));
};
