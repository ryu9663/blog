/**
 * Admin 컴포넌트용 타입 정의
 * Supabase 테이블 구조에 직접 매핑되는 타입
 */

export interface AdminCategoryType {
  id: string;
  main_category: string;
  sub_category: string | null;
}

export interface AdminThumbnailType {
  id: string;
  s3_key: string;
  alt: string | null;
  title: string | null;
  width: number;
  height: number;
  blur_data_url: string | null;
}

export interface AdminPostType {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  category: AdminCategoryType;
  thumbnail: AdminThumbnailType | null;
}

export interface PostFormDataType {
  title: string;
  description: string;
  markdown: string;
  category_id: string;
  thumbnail_id: string | null;
  is_public: boolean;
  datocms_id?: string | null;
}
