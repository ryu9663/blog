"use client";

import Link from "next/link";
import styles from "./PostList.module.scss";

interface Category {
  id: string;
  main_category: string;
  sub_category: string | null;
}

interface Thumbnail {
  id: string;
  s3_key: string;
  alt: string | null;
  title: string | null;
  width: number;
  height: number;
  blur_data_url: string | null;
}

interface Post {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
  thumbnail: Thumbnail | null;
}

interface PostListProps {
  posts: Post[];
  onDelete: (id: string) => Promise<void>;
}

export default function PostList({ posts, onDelete }: PostListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getCategoryLabel = (category: Category) => {
    if (category.sub_category) {
      return `${category.main_category} / ${category.sub_category}`;
    }
    return category.main_category;
  };

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>아직 작성된 글이 없습니다.</p>
        <Link href="/admin/posts/new" className={styles.emptyLink}>
          첫 글 작성하기
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>제목</th>
            <th>카테고리</th>
            <th>상태</th>
            <th>작성일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className={styles.titleCell}>
                <div className={styles.titleContent}>
                  <span className={styles.title}>{post.title}</span>
                  {post.description && (
                    <span className={styles.description}>{post.description}</span>
                  )}
                </div>
              </td>
              <td className={styles.categoryCell}>
                <span className={styles.category}>{getCategoryLabel(post.category)}</span>
              </td>
              <td className={styles.statusCell}>
                <span
                  className={`${styles.badge} ${
                    post.is_public ? styles.public : styles.draft
                  }`}
                >
                  {post.is_public ? "공개" : "비공개"}
                </span>
              </td>
              <td className={styles.dateCell}>{formatDate(post.created_at)}</td>
              <td className={styles.actionsCell}>
                <div className={styles.actions}>
                  <Link href={`/admin/posts/${post.id}/edit`} className={styles.editButton}>
                    수정
                  </Link>
                  <button
                    onClick={() => onDelete(post.id)}
                    className={styles.deleteButton}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
