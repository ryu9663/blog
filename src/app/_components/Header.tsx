"use client";
import { Button, Card, Header as StorybookHeader } from "junyeol-components";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <>
      <StorybookHeader>
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <Link href="/about">
          <Button>About</Button>
        </Link>
      </StorybookHeader>
    </>
  );
};
