import { extractHeadings } from "@/utils/extractHeadings";
import styles from "./index.module.scss";

interface HeadingIndexProps {
  markdown: string;
}
export const HeadingIndexNav = ({ markdown }: HeadingIndexProps) => {
  const headingIndexes = extractHeadings(markdown);
  console.log("h32i");
  return (
    <nav className={styles.heading_index_nav}>
      {headingIndexes.map((heading, i) => (
        <li className={styles.heading_index} key={i}>
          <a href={`#${heading}`}>{`${heading}`}</a>
        </li>
      ))}
    </nav>
  );
};
