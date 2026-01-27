"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdmin } from "../../_components/useAdmin";
import PostForm from "../../_components/PostForm";
import styles from "./page.module.scss";

interface PostFormData {
  title: string;
  description: string;
  markdown: string;
  category_id: string;
  thumbnail_id: string | null;
  is_public: boolean;
}

export default function NewPostPage() {
  const router = useRouter();
  const { apiFetch } = useAdmin();

  const handleSubmit = async (formData: PostFormData) => {
    const response = await apiFetch("/api/admin/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create post");
    }

    // Redirect to admin dashboard on success
    router.push("/admin");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>새 글 작성</h1>
        <Link href="/admin" className={styles.backLink}>
          대시보드로 돌아가기
        </Link>
      </header>

      <main className={styles.main}>
        <PostForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
