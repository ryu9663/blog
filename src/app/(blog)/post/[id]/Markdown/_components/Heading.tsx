"use client";
import React, { PropsWithChildren } from "react";
import styles from "./Heading.module.scss";
import Image from "next/image";
import LinkCopySvg from "@/assets/link_copy.svg";
import { usePathname } from "next/navigation";
import { useToast } from "junyeol-components";

interface HeadingProps extends PropsWithChildren {
  level: 2 | 3 | 4 | 5;
}

export default function Heading({ children, level }: HeadingProps) {
  const pathname = usePathname();
  const toast = useToast();

  const Tag = `h${level}` as const;

  return (
    <div className={styles.heading}>
      <button
        className={styles.linkCopyBtn}
        onClick={() => {
          navigator.clipboard
            .writeText(window.location.host + pathname + "#" + children)
            .then(() => {
              toast({
                children: "링크가 복사되었습니다.",
                type: "success",
              });
            })
            .catch(() => {
              toast({
                children: (
                  <>
                    링크 복사에 실패했습니다.
                    <br />
                    홈페이지 하단의 연락처로 제보주세요
                  </>
                ),
                type: "fail",
              });
            });
        }}
      >
        <div className={styles.linkCopyBtnWrapper}>
          <Image src={LinkCopySvg} width={30} height={30} alt="링크복사svg" />
        </div>
      </button>
      <Tag className={styles.anchor} id={children as string}>
        {children}
      </Tag>
    </div>
  );
}
