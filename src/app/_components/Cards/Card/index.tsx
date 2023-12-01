import {
  CardProps as StorybookCardProps,
  Card as StorybookCard,
} from "junyeol-components";
import Link from "next/link";
import styles from "./index.module.scss";

interface CardProps extends StorybookCardProps {
  id: number;
}

export const Card = ({
  id,
  Thumbnail,
  title,
  description,
  boxShadow = true,
  createdAt,
  subCategoryLink,
}: CardProps) => {
  console.log("hi");
  return (
    <Link href={`/post/${id}`}>
      <StorybookCard
        className={styles.card}
        createdAt={createdAt}
        subCategoryLink={subCategoryLink}
        boxShadow={boxShadow}
        title={title}
        description={description}
        Thumbnail={Thumbnail}
      />
    </Link>
  );
};
