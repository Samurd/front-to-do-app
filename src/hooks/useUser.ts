"use client";

import { api_url } from "@/constants/api";
import { User } from "@/interfaces/user/user";
import userStore from "@/store/user-store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseAuthResult {
  user: User | null;
}

async function fetchUser(router: AppRouterInstance): Promise<User | null> {
  try {
    let response = await fetch(api_url + "/api/auth/profile", {
      cache: "no-store",
      credentials: "include",
      method: "GET",
    });

    if (!response.ok && response.status === 401) {
      const refreshSuccess = await refreshToken();

      if (!refreshSuccess) {
        router.push("/login");
        return null;
      }

      response = await fetch(api_url + "/api/auth/profile", {
        cache: "no-store",
        credentials: "include",
        method: "GET",
      });

      if (!response.ok) {
        return null;
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

export function useAuth(): UseAuthResult {
  const { user, setUser, setIsAuthenticated } = userStore();
  const router = useRouter();

  const fetchData = async () => {
    const userData = await fetchUser(router);
    if (!userData) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }
    setUser(userData);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { user };
}