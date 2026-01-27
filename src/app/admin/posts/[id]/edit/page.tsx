"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAdmin } from "../../../_components/useAdmin";
import PostForm from "../../../_components/PostForm";
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
  description: string;
  markdown: string;
  is_public: boolean;
  category: Category;
  thumbnail: Thumbnail | null;
  created_at: string;
}

interface PostFormData {
  title: string;
  description: string;
  markdown: string;
  category_id: string;
  thumbnail_id: string | null;
  is_public: boolean;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { apiFetch } = useAdmin();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await apiFetch(`/api/admin/posts/${postId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, apiFetch]);

  const handleSubmit = async (formData: PostFormData) => {
    const response = await apiFetch(`/api/admin/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update post");
    }

    // Redirect to admin dashboard on success
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error || "Post not found"}</div>
        <Link href="/admin" className={styles.backLink}>
          대시보드로 돌아가기
        </Link>
      </div>
    );
  }

  // Map API response to initialData format for PostForm
  const initialData: PostFormData = {
    title: post.title,
    description: post.description,
    markdown: post.markdown,
    category_id: post.category.id,
    thumbnail_id: post.thumbnail?.id || null,
    is_public: post.is_public,
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>글 수정</h1>
        <Link href="/admin" className={styles.backLink}>
          대시보드로 돌아가기
        </Link>
      </header>

      <main className={styles.main}>
        <PostForm initialData={initialData} onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
