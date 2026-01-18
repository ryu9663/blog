"use client";

import { PostWithoutMarkdownType } from "@/types/apiResponseType";
import styles from "./index.module.scss";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useDynamicFuseSearch } from "@/utils/hooks/useDynamicFuseSearch";

interface SearchProps {
  posts: PostWithoutMarkdownType[];
  onSearchResults: (results: PostWithoutMarkdownType[]) => void;
}

export const Search = ({ posts, onSearchResults }: SearchProps) => {
  const [searchTerm, setSearchTerm, searchQuery] = useDebounce(500);

  useDynamicFuseSearch({ posts, searchQuery, onSearchResults });

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
