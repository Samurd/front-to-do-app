import { api_url } from "@/constants/api";
import { User } from "@/interfaces/user/user";
import userStore from "@/store/user-store";
import { cookies } from "next/headers";

interface UseAuthResult {
  user: User | null;
  isAuthenticated: boolean;
}

async function fetchUser(): Promise<User | null> {
  try {
    const cookiesStore = cookies();
    const response = await fetch(api_url + "/api/auth/profile", {
      cache: "no-cache",
      credentials: "include",
      method: "GET",
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function useAuthServer(): Promise<UseAuthResult> {
  try {
    const user = await fetchUser();
    if (!user) {
      userStore.setState({ user: null, isAuthenticated: false });
      return { user: null, isAuthenticated: false };
    }

    userStore.setState({ user, isAuthenticated: true });
    return { user, isAuthenticated: true };
  } catch (error) {
    userStore.setState({ user: null, isAuthenticated: false });
    return { user: null, isAuthenticated: false };
  }
}
