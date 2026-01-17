"use client";
import { useState, useEffect } from "react";
import { HeadingType } from "@/types";

export const useTOCHighlight = (headings: HeadingType[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-86px 0px -80% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

  return activeId;
};
