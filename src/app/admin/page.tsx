"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "./_components/useAdmin";
import PostList from "./_components/PostList";
import styles from "./page.module.scss";

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

export default function AdminDashboard() {
  const { apiFetch, logout, isAuthenticated } = useAdmin();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await apiFetch("/api/admin/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchPosts();
    }
  }, [apiFetch, isAuthenticated]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await apiFetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Remove post from list
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <div className={styles.actions}>
          <Link href="/admin/posts/new" className={styles.createButton}>
            새 글 작성
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            로그아웃
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}

        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <PostList posts={posts} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
