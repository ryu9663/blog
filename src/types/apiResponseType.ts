export interface PostMetaField {
  description?: string;
  title?: string;
  image?: {
    alt: string;
    url: string;
  };
}
export interface Post {
  id?: number;
  markdown?: string;
  metaField?: PostMetaField;
}
