'use client';
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { apiGet } from "@/lib/api";

export function useSession() {
  const login = useUserStore((s) => s.login);
  useEffect(() => {
    apiGet("/me")
      .then(login)
      .catch(() => {}); // Not logged in, do nothing
  }, [login]);
} 