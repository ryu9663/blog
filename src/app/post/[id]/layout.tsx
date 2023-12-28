import { Inter } from "next/font/google";
import "junyeol-components/style.css";
import "@/styles/_global.scss";

import styles from "./page.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.post_wrapper} markdown-body `}>
      <section>{children}</section>
    </div>
  );
}
