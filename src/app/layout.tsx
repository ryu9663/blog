import { Header } from "@/app/_components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "junyeol-components/style.css";
import "@/styles/_global.scss";
import Script from "next/script";

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
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/prism.js"></Script>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
