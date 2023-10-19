"use client";

import { ToastContainer } from "junyeol-components";

import React from "react";

export const RccComponent = () => {
  const currentDate = new Date();

  // 어제의 날짜를 계산합니다.
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  // 3일 전의 날짜를 계산합니다.
  const threeDaysAgo = new Date(currentDate);
  threeDaysAgo.setDate(currentDate.getDate() - 3);

  // 4일 전의 날짜를 계산합니다.
  const fourDaysAgo = new Date(currentDate);
  fourDaysAgo.setDate(currentDate.getDate() - 4);
  return (
    <>
      <ToastContainer />
    </>
  );
};
