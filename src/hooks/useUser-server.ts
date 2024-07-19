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
    const accessToken = cookiesStore.get("access_token")?.value;
    const response = await fetch(api_url + "/api/auth/profile", {
      cache: "no-store",
      credentials: "include",
      method: "GET",

      headers: {
        // Agrega todas las cookies al header 'Cookie'
        Cookie: `access_token=${accessToken}`,
      },
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

export default async function useAuthServer(): Promise<UseAuthResult> {
  const data = await fetchUser();

  if (!data) {
    userStore.setState({ user: null, isAuthenticated: false });
    return { user: userStore.getState().user, isAuthenticated: false };
  }

  userStore.setState({ user: data, isAuthenticated: true });
  return { user: userStore.getState().user, isAuthenticated: true };
}
