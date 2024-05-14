"use client";
import React, { PropsWithChildren, useState } from "react";
import styles from "./Heading3.module.scss";
import Image from "next/image";
import LinkCopySvg from "@/assets/link_copy.svg";
import { usePathname } from "next/navigation";

export default function Heading3({ children }: PropsWithChildren) {
  const [isHover, setIsHover] = useState(false);
  const pathname = usePathname();

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
            navigator.clipboard.writeText(
              window.location.host + pathname + "#" + children,
            );
          }}
        >
          <Image src={LinkCopySvg} width={30} height={30} alt="링크복사svg" />
        </button>
      )}
      <h3 className={styles.anchor} id={children as string}>
        {children}
      </h3>
    </div>
  );
}
