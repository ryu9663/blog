"use client";

import { useState } from "react";
import { ClientPostType } from "@/types";
import { Posts } from "@/app/_components/Posts";
import { Search } from "@/app/_components/Search";

interface PostsWithSearchProps {
  initialPosts: ClientPostType[];
}

export const PostsWithSearch = ({ initialPosts }: PostsWithSearchProps) => {
  const [filteredPosts, setFilteredPosts] =
    useState<ClientPostType[]>(initialPosts);

  const handleSearchResults = (results: ClientPostType[]) => {
    setFilteredPosts(results);
  };

  return (
    <>
      <Search posts={initialPosts} onSearchResults={handleSearchResults} />
      <Posts posts={filteredPosts} />
    </>
  );
};
