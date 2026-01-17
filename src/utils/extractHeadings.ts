import { HeadingType } from "@/types";

export const extractHeadings = (markdown: string): HeadingType[] => {
  const regex = /^(#{2,5})\s+(.*)$/gm;

  return [...markdown.matchAll(regex)].map(([, hashes, title]) => ({
    text: title,
    level: hashes.length,
    id: title,
  }));
};
