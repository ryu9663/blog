/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { PostType } from "@/types";
import Loading from "@/app/post/[id]/loading";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("./Markdown"), {
  ssr: false,
});

interface PostProps {
  article: {
    metaField: PostType["metaField"];
    markdown: PostType["markdown"];
  };
}
export default function Post({ article }: PostProps) {
  const { markdown } = article;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {isMounted && <Markdown>{markdown}</Markdown>}
    </Suspense>
  );
}
