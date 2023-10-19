"use client";

import React from "react";

import styles from "./index.module.scss";
import { NestedObject, PostType } from "@/types";

import Image from "next/image";
import { Card } from "@/app/_components/Cards/Card";
import Link from "next/link";

interface CardsProps {
  articles: Pick<
    PostType,
    "id" | "metaField" | "media" | "category" | "_publishedAt"
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
          _publishedAt,
          category: { category },
        } = article;
        const publishedAt = new Date(_publishedAt).toLocaleDateString();
        const categoryLink = `/posts/${Object.keys(category)[0]}/${
          Object.values(category)[1]
        }`;
        return (
          metaField &&
          media && (
            <Card
              id={id as number}
              key={metaField.title}
              title={metaField?.title || "no title"}
              description={metaField.description || "no description"}
              publishedAt={publishedAt}
              subCategoryLink={<Link href="/posts">{categoryLink}</Link>}
              Thumbnail={
                <Image
                  {...media.responsiveImage}
                  src={media.responsiveImage?.src || ""}
                  alt={media.responsiveImage?.alt || ""}
                  placeholder="blur"
                  blurDataURL={media.responsiveImage?.base64}
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
