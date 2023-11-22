import { BigImageModal } from "@/app/_components/MarkdownImage/BigImageModal";
import { NO_IMAGE } from "@/utils/constant";
import ImageComponent from "next/image";
import React, { ImgHTMLAttributes, MouseEventHandler, useState } from "react";
import styles from "./index.module.scss";

export type ImageSrcAltType = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
>;
export const MarkdownImage = ({
  src = NO_IMAGE.src,
  alt = NO_IMAGE.alt,
}: ImageSrcAltType) => {
  const urlParams = new URLSearchParams(new URL(src || NO_IMAGE.src).search);
  const width = Number(urlParams.get("w"));
  const height = Number(urlParams.get("h"));

  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const preloadImage: MouseEventHandler<HTMLImageElement> = () => {
    const img = new Image();
    img.src = src || NO_IMAGE.src;
  };

  return (
    <>
      <ImageComponent
        onMouseOver={preloadImage}
        className={styles.img}
        onClick={handleOpenModal}
        width={width || 600}
        height={height || 300}
        src={src}
        alt={alt}
      />
      <BigImageModal
        isOpen={isOpenModal}
        handleClose={handleCloseModal}
        src={src}
        alt={alt}
      />
    </>
  );
};
