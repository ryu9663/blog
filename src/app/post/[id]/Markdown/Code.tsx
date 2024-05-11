"use client";
import React, { PropsWithChildren } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeProps extends PropsWithChildren {
  match: RegExpExecArray;
}
export default function Code({ match, children }: CodeProps) {
  return (
    <SyntaxHighlighter language={match[1]} style={github}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
}
