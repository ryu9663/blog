/* eslint-disable @next/next/no-img-element */

import { ImageSrcAltType } from "@/app/_components/MarkdownImage";
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
}: BigImageModalProps) => (
  <>
    {isOpen && (
      <div
        className={`${styles.backdrop} ${styles["priority-0"]}`}
        onClick={handleClose}
      >
        <div className={`${styles.fill_img_wrapper} ${styles["priority-0"]}`}>
          <img
            onClick={(e) => e.stopPropagation()}
            className={styles.img}
            src={src}
            alt={alt}
          />
        </div>
      </div>
    )}
  </>
);
