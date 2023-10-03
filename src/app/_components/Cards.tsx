"use client";

import { PostMetaDataType } from "@/app/api/notion/model/notionClient";
import { Card as StorybookCard } from "junyeol-components";
import React, { Fragment } from "react";
interface CardsProps {
  metas: PostMetaDataType[];
}
export const Cards = ({ metas }: CardsProps) => {
  return (
    <>
      {metas.map((meta, i) => (
        <Fragment key={i}>
          <StorybookCard
            img={{
              url: meta.ogImg.src,
              alt: meta.ogImg.alt,
            }}
            description={{ fontSize: "small", content: meta.description }}
          />
        </Fragment>
      ))}
    </>
  );
};
