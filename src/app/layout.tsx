import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "junyeol-components/style.css";
import "@/styles/_global.scss";
import { Footer } from "@/app/_components/Footer";
import styles from "./layout.module.scss";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import Link from "next/link";
import { BASE_URL } from "@/utils/constant";
import Provider from "@/app/_components/Provider";
import { Suspense } from "react";
import Analytics from "@/utils/thirdParty/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: {
      default: "류준열의 기술 블로그",
      template: "류준열의 기술 블로그 | %s",
    },
    description: "프론트엔드 개발자 류준열의 기술 블로그",
    url: BASE_URL,
    siteName: "류준열의 기술 블로그",
    images: [
      {
        url: "/android-chrome-192x192.png",
        width: 800,
        height: 600,
      },
      { url: "/android-chrome-512x512.png", width: 1800, height: 1600 },
    ],
    locale: "ko_KR",
    type: "website",
  },
  title: {
    default: "류준열의 기술 블로그",
    template: "류준열의 기술 블로그 | %s",
  },
  description: "류준열의 기술 블로그",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "favicon-16x16.png",
      url: "/favicon-16x16.png",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="68-iOKYYrEPp2KDfr6ERlG1WN9dJG3QCWYGBfLja4BA"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-7611913966171206"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7611913966171206"
        ></script>
        <link rel="icon" type="image/svg+xml" href="/favicon-32x32.png" />
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
