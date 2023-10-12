"use client";

import React from "react";

import styles from "./index.module.scss";
import { PostWithMeta } from "@/types";

import { Card } from "@/app/_components/Cards/Card";

const Cards = ({ allArticles }: any) => {
  return (
    <div className={styles.cards_wrapper}>
      {allArticles.map((article: PostWithMeta) => {
        const { metaField, id } = article;

        return (
          metaField && (
            <Card
              id={id as number}
              key={metaField.title}
              title={metaField.title}
              description={metaField.description}
              image={metaField.image}
            />
          )
        );
      })}
    </div>
  );
};

export default Cards;
