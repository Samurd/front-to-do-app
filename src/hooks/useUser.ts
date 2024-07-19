"use client";

import { api_url } from "@/constants/api";
import { User } from "@/interfaces/user/user";
import userStore from "@/store/user-store";
import { useEffect } from "react";

interface UseAuthResult {
  user: User | null;
}

async function fetchUser(): Promise<User | null> {
  try {
    const response = await fetch(api_url +"/api/auth/profile", {
      credentials: "include",
      method: "GET",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export function useAuth(): UseAuthResult {
  const { user, setUser, setIsAuthenticated } = userStore();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUser();
      if (!userData) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      setUser(userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [user, setIsAuthenticated]);

  return { user };
}
