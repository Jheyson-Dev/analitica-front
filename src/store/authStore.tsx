import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  role: string;
  area: string;
  status: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("token");
  let initialUser: User | null = null;
  let initialAuth = false;

  if (token) {
    try {
      initialUser = jwtDecode<User>(token);
      initialAuth = true;
    } catch (error) {
      console.error("Invalid token in localStorage");
      localStorage.removeItem("token");
    }
  }

  return {
    isAuthenticated: initialAuth,
    user: initialUser,
    login: (token: string) => {
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", token);
        const decoded: User = jwtDecode(token);
        set({ user: decoded, isAuthenticated: true });
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    },
  };
});

export default useAuthStore;
