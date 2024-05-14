"use client";
import React, { PropsWithChildren, useState } from "react";
import styles from "./Heading3.module.scss";
import Image from "next/image";
import LinkCopySvg from "@/assets/link_copy.svg";
import { usePathname } from "next/navigation";
import { useToast } from "junyeol-components";

export default function Heading3({ children }: PropsWithChildren) {
  const [isHover, setIsHover] = useState(false);
  const pathname = usePathname();
  const toast = useToast();
  return (
    <div
      className={styles.heading}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover && (
        <button
          className={styles.link_copy_btn}
          onClick={() => {
            navigator.clipboard
              .writeText(window.location.host + pathname + "#" + children)
              .then(() => {
                toast({
                  children: "링크가 복사되었습니다.",
                  type: "success",
                });
              });
          }}
        >
          <div className={styles.link_copy_btn_wrapper}>
            <Image src={LinkCopySvg} width={30} height={30} alt="링크복사svg" />
          </div>
        </button>
      )}
      <h3 className={styles.anchor} id={children as string}>
        {children}
      </h3>
    </div>
  );
}
