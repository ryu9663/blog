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
  image,
  title,
  description,
  boxShadow = true,
}: CardProps) => {
  return (
    <Link href={`/post/${id}`}>
      <StorybookCard
        boxShadow={boxShadow}
        title={title}
        description={description}
        image={image}
      />
    </Link>
  );
};
