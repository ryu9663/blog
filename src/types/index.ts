export interface PostMetaField {
  description: string;
  title: string;
  image: {
    alt: string;
    url: string;
  };
}
export interface PostWithMeta {
  id?: number;
  markdown: string;
  metaField: PostMetaField;
}
