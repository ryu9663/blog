/* eslint-disable @typescript-eslint/ban-ts-comment */
export const extractHeadings = (markdown: string): string[] => {
  const regex = /^(###)\s+(.*)$/gm;
  const matches = markdown.matchAll(regex);
  const headings: string[] = [];
  //   @ts-expect-error
  for (const match of matches) {
    const [, hashes, title] = match;
    const level = hashes.length - 1;
    headings.push(`${"#".repeat(level)} ${title}`);
  }

  const cleanIndexes = headings.map((heading) =>
    heading
      .replace(/^#+\s*/, "")
      .split(" ")
      .join("-")
      .replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\w\s-]/g, "")
      .toLowerCase(),
  );
  return cleanIndexes;
};
