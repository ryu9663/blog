import { AdminAuthProvider } from "./_components/AdminAuthProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
