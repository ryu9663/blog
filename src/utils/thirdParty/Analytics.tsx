"use client";

import { pageview } from "@/libs/gtm";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname, searchParams]);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return null;
  }

  return;
}
