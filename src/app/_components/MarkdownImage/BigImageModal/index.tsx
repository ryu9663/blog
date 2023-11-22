import { ImageSrcAltType } from "@/app/_components/MarkdownImage";
import Image from "next/image";
import styles from "./index.module.scss";

type RequiredImageSrcAltType = {
  [K in keyof ImageSrcAltType]-?: ImageSrcAltType[K];
};
interface BigImageModalProps extends RequiredImageSrcAltType {
  isOpen: boolean;
  handleClose: () => void;
}
export const BigImageModal = ({
  isOpen,
  handleClose,
  src,
  alt,
}: BigImageModalProps) => {
  return (
    <>
      {isOpen && (
        <div
          className={`${styles.backdrop} ${styles["priority-0"]}`}
          onClick={handleClose}
        >
          <div
            className={`${styles.fill_img_wrapper} ${styles["priority-0"]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image className={styles.img} fill src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  );
};
