import {
  CardProps as StorybookCardProps,
  Card as StorybookCard,
} from "junyeol-components";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <StorybookCard
      boxShadow={boxShadow}
      title={title}
      description={description}
      image={image}
      onClick={() => router.push(`/post/${id}`)}
    />
  );
};
