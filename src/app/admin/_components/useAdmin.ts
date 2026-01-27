"use client";

import { useContext } from "react";
import { AdminAuthContext } from "./AdminAuthProvider";

export function useAdmin() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdmin must be used within AdminAuthProvider");
  }

  const { token, logout, isAuthenticated } = context;

  // Wrapper function that auto-adds Authorization header
  const apiFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  return {
    token,
    logout,
    isAuthenticated,
    apiFetch,
  };
}
