"use client";

import React from "react";
import { Card as StorybookCard } from "junyeol-components";
import styles from "./index.module.scss";

interface ImageProps {
  url: string;
  alt: string;
}

interface CardProps {
  img: ImageProps;
  title: string;
  description: string;
  boxShadow?: boolean;
  onClick?: () => void;
}

const Cards = ({ allAritlcles }: any) => {
  return (
    <div className={styles.cards_wrapper}>
      {allAritlcles.map((aritlcle: any, i: number) => {
        const { metaField } = aritlcle;
        return (
          metaField && (
            <Card
              key={i}
              title={metaField.title}
              description={metaField.description}
              img={metaField.image}
            />
          )
        );
      })}
    </div>
  );
};

const Card = ({
  img,
  title,
  description,
  boxShadow = true,
  onClick,
}: CardProps) => {
  return (
    <StorybookCard
      boxShadow={boxShadow}
      title={title}
      description={description}
      img={img}
      onClick={onClick}
    />
  );
};

export default Cards;
