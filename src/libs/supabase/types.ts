export interface Database {
  public: {
    Tables: {
      categories: {
        Row: CategoryRow;
        Insert: CategoryInsert;
        Update: CategoryUpdate;
      };
      images: {
        Row: ImageRow;
        Insert: ImageInsert;
        Update: ImageUpdate;
      };
      posts: {
        Row: PostRow;
        Insert: PostInsert;
        Update: PostUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Category
export interface CategoryRow {
  id: string;
  main_category: string;
  sub_category: string;
  created_at: string;
}

export type CategoryInsert = Omit<CategoryRow, "id" | "created_at">;
export type CategoryUpdate = Partial<CategoryInsert>;

// Image
export interface ImageRow {
  id: string;
  s3_key: string;
  original_url: string | null;
  alt: string | null;
  title: string | null;
  width: number | null;
  height: number | null;
  blur_data_url: string | null;
  created_at: string;
}

export type ImageInsert = Omit<ImageRow, "id" | "created_at">;
export type ImageUpdate = Partial<ImageInsert>;

// Post
export interface PostRow {
  id: string;
  legacy_id: number | null;
  title: string;
  description: string | null;
  markdown: string;
  thumbnail_id: string | null;
  category_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export type PostInsert = Omit<PostRow, "id" | "created_at" | "updated_at">;
export type PostUpdate = Partial<PostInsert>;

// Joined types for queries
export interface PostWithRelations extends PostRow {
  category: CategoryRow;
  thumbnail: ImageRow | null;
}
