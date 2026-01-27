"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useAdmin } from "./useAdmin";
import MarkdownPreview from "./MarkdownPreview";
import styles from "./PostForm.module.scss";

interface Category {
  id: string;
  main_category: string;
  sub_category: string;
}

interface PostFormData {
  title: string;
  description: string;
  markdown: string;
  category_id: string;
  thumbnail_id: string | null;
  is_public: boolean;
  datocms_id?: string | null;
}

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (formData: PostFormData) => Promise<void>;
}

export default function PostForm({ initialData, onSubmit }: PostFormProps) {
  const { apiFetch } = useAdmin();
  const isEditMode = !!initialData;

  // Form state
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    markdown: initialData?.markdown || "",
    category_id: initialData?.category_id || "",
    thumbnail_id: initialData?.thumbnail_id || null,
    is_public: initialData?.is_public ?? true,
    datocms_id: initialData?.datocms_id || null,
  });

  // UI state
  const [categories, setCategories] = useState<Category[]>([]);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiFetch("/api/admin/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("카테고리를 불러오는데 실패했습니다.");
        console.error(err);
      }
    };

    fetchCategories();
  }, [apiFetch]);

  // Handle text/select input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("alt", formData.title || "Thumbnail");
      uploadFormData.append("title", formData.title || "Thumbnail");

      const response = await apiFetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, thumbnail_id: data.image.id }));
      setThumbnailPreviewUrl(data.url);
    } catch (err) {
      setError("이미지 업로드에 실패했습니다.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error("제목을 입력해주세요.");
      }
      if (!formData.category_id) {
        throw new Error("카테고리를 선택해주세요.");
      }
      if (!formData.markdown.trim()) {
        throw new Error("본문을 입력해주세요.");
      }

      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          제목 <span className={styles.hint}>(OG 타이틀로 사용됩니다)</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={styles.input}
          value={formData.title}
          onChange={handleInputChange}
          placeholder="포스트 제목을 입력하세요"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          설명 <span className={styles.hint}>(OG 설명으로 사용됩니다)</span>
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="포스트 설명을 입력하세요"
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category_id" className={styles.label}>
          카테고리
        </label>
        <select
          id="category_id"
          name="category_id"
          className={styles.select}
          value={formData.category_id}
          onChange={handleInputChange}
          required
        >
          <option value="">카테고리를 선택하세요</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.main_category}
              {category.sub_category && ` > ${category.sub_category}`}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="thumbnail" className={styles.label}>
          썸네일 이미지
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          className={styles.fileInput}
          onChange={handleThumbnailUpload}
          accept="image/*"
          disabled={isUploading}
        />
        {isUploading && <p className={styles.uploadStatus}>업로드 중...</p>}
        {thumbnailPreviewUrl && (
          <div className={styles.thumbnailPreview}>
            <img src={thumbnailPreviewUrl} alt="Thumbnail preview" />
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="is_public"
            checked={formData.is_public}
            onChange={handleInputChange}
            className={styles.checkbox}
          />
          <span>공개</span>
        </label>
      </div>

      <div className={styles.markdownSection}>
        <label className={styles.label}>본문 (Markdown)</label>
        <div className={styles.splitView}>
          <div className={styles.editorPane}>
            <h3 className={styles.paneTitle}>편집기</h3>
            <textarea
              name="markdown"
              className={styles.markdownEditor}
              value={formData.markdown}
              onChange={handleInputChange}
              placeholder="마크다운 형식으로 본문을 작성하세요..."
              required
            />
          </div>
          <div className={styles.previewPane}>
            <h3 className={styles.paneTitle}>미리보기</h3>
            <MarkdownPreview markdown={formData.markdown} />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : isEditMode ? "수정" : "저장"}
        </button>
      </div>
    </form>
  );
}
