"use client";

import Link from "next/link";
import styles from "./index.module.scss";
import { usePathname, useSearchParams } from "next/navigation";

export const Pagination = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("currentPage"));
  const pageSize = Number(searchParams.get("pageSize"));

  return (
    <ul className={styles.pagination_wrapper}>
      <li>
        <Link
          href={{
            pathname: `${pathname}`,
            query: {
              currentPage: currentPage - 1,
              pageSize,
            },
          }}
        >
          이전 페이지
        </Link>
      </li>
      <li>
        <Link
          href={{
            pathname: `${pathname}`,
            query: {
              currentPage: currentPage + 1,
              pageSize,
            },
          }}
        >
          다음 페이지
        </Link>
      </li>
    </ul>
  );
};
