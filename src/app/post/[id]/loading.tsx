"use client";
import React from "react";
import { Backdrop } from "junyeol-components";
import { LoadingCircle } from "@/app/_components/LoadingCircle";

const Loading = () => {
  return (
    <Backdrop isOpen={true} onClose={() => {}} type={"blur"}>
      <LoadingCircle />
    </Backdrop>
  );
};
export default Loading;
