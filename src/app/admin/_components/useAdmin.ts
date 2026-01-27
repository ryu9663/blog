"use client";

import { useCallback, useContext } from "react";
import { AdminAuthContext } from "./AdminAuthProvider";

export function useAdmin() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdmin must be used within AdminAuthProvider");
  }

  const { token, logout, isAuthenticated } = context;

  const apiFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const headers = new Headers(options.headers);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return fetch(url, {
        ...options,
        headers,
      });
    },
    [token]
  );

  return {
    token,
    logout,
    isAuthenticated,
    apiFetch,
  };
}
