import {
  CardProps as StorybookCardProps,
  Card as StorybookCard,
} from "junyeol-components";
import Link from "next/link";

interface CardProps extends StorybookCardProps {
  id: number;
}

export const Card = ({
  id,
  Thumbnail,
  title,
  description,
  boxShadow = true,
  publishedAt,
  subCategoryLink,
}: CardProps) => {
  return (
    <Link href={`/post/${id}`}>
      <StorybookCard
        publishedAt={publishedAt}
        subCategoryLink={subCategoryLink}
        boxShadow={boxShadow}
        title={title}
        description={description}
        Thumbnail={Thumbnail}
      />
    </Link>
  );
};
