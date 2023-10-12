"use client";

import React from "react";

import styles from "./index.module.scss";
import { PostType } from "@/types";

import { Card } from "@/app/_components/Cards/Card";

interface CardsProps {
  allArticles: Omit<PostType, "markdown">[];
}
const Cards = ({ allArticles }: CardsProps) => {
  return (
    <div className={styles.cards_wrapper}>
      {allArticles.map((article) => {
        const { metaField, media, id } = article;
        return (
          metaField &&
          media && (
            <Card
              id={id as number}
              key={metaField.title}
              title={metaField?.title || "no title"}
              description={metaField.description || "no description"}
              image={{
                url: media.responsiveImage.src,
                alt: media.responsiveImage.alt,
              }}
            />
          )
        );
      })}
    </div>
  );
};

export default Cards;
