"use client";

import { useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { PostType } from "@/types";
import styles from "./index.module.scss";
import { useDebounce } from "@/utils/hooks/useDebounce";

interface SearchProps {
  posts: PostType[];
  onSearchResults: (results: PostType[]) => void;
}

export const Search = ({ posts, onSearchResults }: SearchProps) => {
  const [searchTerm, setSearchTerm, searchQuery] = useDebounce(500);

  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: "metaField.title", weight: 0.5 },
        { name: "metaField.description", weight: 0.3 },
        { name: "markdown", weight: 0.2 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    };
    return new Fuse(posts, options);
  }, [posts]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      onSearchResults(posts);
      return;
    }

    const results = fuse.search(searchQuery);
    const filteredPosts = results.map((result) => result.item);
    onSearchResults(filteredPosts);
  }, [searchQuery, fuse, posts]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <div className={styles.searchIcon}>🔍</div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="관심있는 키워드를 검색해보세요"
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};
