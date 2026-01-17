import { HeadingType } from "@/types";

export const extractHeadings = (markdown: string): HeadingType[] => {
  const regex = /^(#{2,5})\s+(.*)$/gm;
  const headings: HeadingType[] = [];

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const [, hashes, title] = match;
    headings.push({
      text: title,
      level: hashes.length,
      id: title,
    });
  }

  return headings;
};
