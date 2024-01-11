import Link from "next/link";
import styles from "./index.module.scss";
import { ReactNode } from "react";

interface CardProps {
  id: number;
  Thumbnail: JSX.Element;
  title: string;
  description: string;
  createdAt: string;
  subCategory?: ReactNode;
}

export const Card = ({
  id,
  Thumbnail,
  title,
  description,
  createdAt,
  subCategory,
}: CardProps) => (
  <Link href={`/post/${id}`}>
    <div className={`${styles.card} ${styles["card_box-shadow"]} `}>
      {Thumbnail}
      <div className={styles["card_content"]}>
        <h3 className={`${styles["card_content-title"]}`}>{title}</h3>
        <div className={`${styles["card_content-description"]}`}>
          {description}
        </div>
        <div className={`${styles["card_content-tagbox"]}`}>
          <div className={`${styles["card_content-tagbox-createdAt"]}`}>
            {createdAt}
          </div>
          <div className={`${styles["card_content-tagbox-tag"]}`}>
            {subCategory}
          </div>
        </div>
      </div>
    </div>
  </Link>
);
