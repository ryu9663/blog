"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface AdminAuthContextType {
  token: string | null;
  login: (password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const STORAGE_KEY = "admin_token";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  // Redirect to login if not authenticated (skip on login page)
  useEffect(() => {
    if (!isLoading && !token && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isLoading, token, pathname, router]);

  const login = async (password: string) => {
    // Verify password by calling an admin API endpoint
    const response = await fetch("/api/admin/posts", {
      headers: {
        Authorization: `Bearer ${password}`,
      },
    });

    if (response.status === 401) {
      throw new Error("Invalid password");
    }

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    // Password is valid, store token
    localStorage.setItem(STORAGE_KEY, password);
    setToken(password);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    router.push("/admin/login");
  };

  const value: AdminAuthContextType = {
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
