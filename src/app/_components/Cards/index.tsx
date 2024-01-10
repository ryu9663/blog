/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styles from "./index.module.scss";
import { PostType } from "@/types";
import Image from "next/image";
import { Card } from "@/app/_components/Cards/Card";
import { devideCategoryObject } from "@/utils/getCategoryLink";
import { IMAGE_SIZE_IN_POSTS } from "@/utils/constant";

interface CardsProps {
  articles: Pick<PostType, "id" | "metaField" | "category" | "_createdAt">[];
}

const Cards = ({ articles }: CardsProps) => (
  <div className={styles.cards_wrapper}>
    {articles.map((article, i) => {
      const {
        metaField,
        id,
        _createdAt,
        category: { category },
      } = article;
      const createdAt = new Date(_createdAt).toLocaleDateString();
      const { subCategory } = devideCategoryObject(category);
      // const categoryLink = `/posts/${mainCategory}/${subCategory}`;
      return (
        metaField.image.responsiveImage && (
          <Card
            id={id as number}
            key={metaField.title}
            title={metaField?.title || "no title"}
            description={metaField.description || "no description"}
            createdAt={createdAt}
            subCategory={<>{subCategory}</>}
            Thumbnail={
              <Image
                width={IMAGE_SIZE_IN_POSTS.width}
                height={IMAGE_SIZE_IN_POSTS.height}
                src={metaField.image.responsiveImage.src || ""}
                alt={metaField.image.responsiveImage.alt || ""}
                placeholder="blur"
                blurDataURL={metaField.image.responsiveImage.base64}
                loading={i < 3 ? "eager" : "lazy"}
              />
            }
          />
        )
      );
    })}
  </div>
);

export default Cards;
