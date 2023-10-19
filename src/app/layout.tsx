import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "junyeol-components/style.css";
import "@/styles/_global.scss";
import { Footer } from "@/app/_components/Footer";
import { RccComponent } from "@/app/_components/RccComponent";

import { SidebarWrapper } from "@/app/_components/SidebarWrapper";

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
      <body className={inter.className}>
        <SidebarWrapper />
        <main>{children}</main>
        <Footer />
        <RccComponent />
      </body>
    </html>
  );
}
