import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "junyeol-components/style.css";
import "@/styles/_global.scss";
import { Footer } from "@/app/_components/Footer";
import { RccComponent } from "@/app/_components/RccComponent";
import styles from "./page.module.scss";

import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "류준열의 기술 블로그",
  description: "류준열의 기술 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon-32x32.png" />
      </head>
      <body className={inter.className}>
        <SidebarWrapper />
        <main>
          <Link className={styles.link} href="/">
            <h1 className={styles.heading}>{"프론트엔드 개발자 류준열"}</h1>
          </Link>

          {children}
        </main>
        <Footer />
        <RccComponent />
      </body>
    </html>
  );
}
