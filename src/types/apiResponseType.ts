export interface MetaField {
  description?: string;
  title?: string;
  image: {
    alt: string;
    url: string;
  };
}

export interface ResponsiveImageType {
  src: string;
  sizes: string;
  height: number;
  width: number;
  alt: string;
  title: string;
  base64: string;
}
export interface MediaType {
  title?: string;
  responsiveImage: ResponsiveImageType;
}
export interface PostType {
  id: number;
  markdown: string;
  metaField: MetaField;
  media?: MediaType | null;
}
