"use client";
import {
  Button,
  Header as StorybookHeader,
  useToast,
} from "junyeol-components";
import Link from "next/link";
import React from "react";

export const Header = () => {
  const toast = useToast();
  return (
    <>
      <StorybookHeader>
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <Link href="/about">
          <Button>About</Button>
        </Link>
        <Button onClick={() => toast({ type: "success", children: "kk" })}>
          토스트 띄우기
        </Button>
      </StorybookHeader>
    </>
  );
};
