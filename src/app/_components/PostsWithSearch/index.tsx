"use client";

import { useState } from "react";
import { PostType } from "@/types";
import { Posts } from "@/app/_components/Posts";
import { Search } from "@/app/_components/Search";

interface PostsWithSearchProps {
  initialPosts: PostType[];
}

export const PostsWithSearch = ({ initialPosts }: PostsWithSearchProps) => {
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(initialPosts);

  const handleSearchResults = (results: PostType[]) => {
    setFilteredPosts(results);
  };

  return (
    <>
      <Search posts={initialPosts} onSearchResults={handleSearchResults} />
      <Posts posts={filteredPosts} />
    </>
  );
};
