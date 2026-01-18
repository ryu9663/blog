"use client";

import { useEffect, useState, useRef } from "react";
import type Fuse from "fuse.js";
import { PostWithoutMarkdownType } from "@/types/apiResponseType";

const fuseOptions = {
  keys: [
    { name: "metaField.title", weight: 0.5 },
    { name: "metaField.description", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

interface UseFuseSearchProps {
  posts: PostWithoutMarkdownType[];
  searchQuery: string;
  onSearchResults: (results: PostWithoutMarkdownType[]) => void;
}

export const useDynamicFuseSearch = ({
  posts,
  searchQuery,
  onSearchResults,
}: UseFuseSearchProps) => {
  const [fuse, setFuse] = useState<Fuse<PostWithoutMarkdownType> | null>(null);
  const fuseLoadingRef = useRef(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      onSearchResults(posts);
      return;
    }

    const performSearch = async () => {
      if (!fuse && !fuseLoadingRef.current) {
        fuseLoadingRef.current = true;
        const FuseModule = await import("fuse.js");
        const fuseInstance = new FuseModule.default(posts, fuseOptions);
        setFuse(fuseInstance);
        fuseLoadingRef.current = false;

        const results = fuseInstance.search(searchQuery);
        const filteredPosts = results.map((result) => result.item);
        onSearchResults(filteredPosts);
        return;
      }

      if (fuse) {
        const results = fuse.search(searchQuery);
        const filteredPosts = results.map((result) => result.item);
        onSearchResults(filteredPosts);
      }
    };

    performSearch();
  }, [searchQuery, fuse, posts, onSearchResults]);
};
