"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import styles from "./Code.module.scss";

interface CodeProps extends PropsWithChildren {
  match: RegExpExecArray;
}

export default function Code({ match, children }: CodeProps) {
  const [html, setHtml] = useState<string>("");
  const language = match[1];
  const code = String(children).replace(/\n$/, "");

  useEffect(() => {
    const highlight = async () => {
      const { codeToHtml } = await import("shiki");
      const result = await codeToHtml(code, {
        lang: language,
        theme: "github-dark",
      });
      setHtml(result);
    };

    highlight();
  }, [code, language]);

  if (!html) {
    return <code>{children}</code>;
  }

  return (
    <div
      className={styles.codeBlock}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
