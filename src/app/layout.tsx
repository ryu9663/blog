import { Header } from "@/app/_components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "junyeol-components/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "June's devlog",
  description: "June의 기술 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
