import { User } from "@/interfaces/user/user";
import { create } from "zustand";


interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const userStore = create<UserStore>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: User | null) => set({ user }),
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  }));
  
  export default userStore