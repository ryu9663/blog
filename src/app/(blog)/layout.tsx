import { Footer } from "@/app/_components/Footer";
import styles from "../layout.module.scss";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import Link from "next/link";
import Provider from "@/app/_components/Provider";
import Analytics from "@/utils/thirdParty/Analytics";
import { Suspense } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarWrapper />
      <Provider>
        <Link className={styles.link} href="/">
          <h1 className={`${styles.heading_1} ${styles["priority-0"]}`}>
            개발자
            <br /> 류준열
          </h1>
        </Link>
        {children}
      </Provider>
      <Footer />
      <Suspense>
        <Analytics />
      </Suspense>
    </>
  );
}
