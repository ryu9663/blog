import { CategoryType } from "junyeol-components";

export type NestedObject = {
  //* 몇 depth인지 모르는 객체 *//
  [key: string]: NestedObject | string;
};
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
  _publishedAt: Date;
  category: {
    category: Partial<Record<CategoryType, string>>;
  };
  markdown: string;
  metaField: MetaField;
  media?: MediaType | null;
}
