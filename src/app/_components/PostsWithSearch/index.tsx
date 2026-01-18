"use client";

import { useState } from "react";
import { PostWithoutMarkdownType } from "@/types/apiResponseType";
import { Posts } from "@/app/_components/Posts";
import { Search } from "@/app/_components/Search";

interface PostsWithSearchProps {
  initialPosts: PostWithoutMarkdownType[];
}

export const PostsWithSearch = ({ initialPosts }: PostsWithSearchProps) => {
  const [filteredPosts, setFilteredPosts] =
    useState<PostWithoutMarkdownType[]>(initialPosts);

  const handleSearchResults = (results: PostWithoutMarkdownType[]) => {
    setFilteredPosts(results);
  };

  return (
    <>
      <Search posts={initialPosts} onSearchResults={handleSearchResults} />
      <Posts posts={filteredPosts} />
    </>
  );
};
