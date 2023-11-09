"use client";

import React from "react";

import styles from "./index.module.scss";
import { PostType } from "@/types";

import Image from "next/image";
import { Card } from "@/app/_components/Cards/Card";
import Link from "next/link";
import { devideCategoryObject } from "@/utils/getCategoryLink";
import { IMAGE_SIZE_IN_POSTS } from "@/utils/constant";

interface CardsProps {
  articles: Pick<
    PostType,
    "id" | "metaField" | "media" | "category" | "_createdAt"
  >[];
}

const Cards = ({ articles }: CardsProps) => {
  return (
    <div className={styles.cards_wrapper}>
      {articles.map((article) => {
        const {
          metaField,
          media,
          id,
          _createdAt,
          category: { category },
        } = article;
        const createdAt = new Date(_createdAt).toLocaleDateString();
        const { mainCategory, subCategory } = devideCategoryObject(category);
        const categoryLink = `/posts/${mainCategory}/${subCategory}`;

        return (
          metaField &&
          metaField.image.responsiveImage && (
            <Card
              id={id as number}
              key={metaField.title}
              title={metaField?.title || "no title"}
              description={metaField.description || "no description"}
              createdAt={createdAt}
              subCategoryLink={
                <Link href={`/posts/${categoryLink}`}>{subCategory}</Link>
              }
              Thumbnail={
                <Image
                  // {...media.responsiveImage}
                  // src={media.responsiveImage?.src || ""}
                  width={IMAGE_SIZE_IN_POSTS.width}
                  height={IMAGE_SIZE_IN_POSTS.height}
                  src={metaField.image.responsiveImage.src || ""}
                  alt={metaField.image.responsiveImage.alt || ""}
                  placeholder="blur"
                  blurDataURL={metaField.image.responsiveImage.base64}
                />
              }
            />
          )
        );
      })}
    </div>
  );
};

export default Cards;
