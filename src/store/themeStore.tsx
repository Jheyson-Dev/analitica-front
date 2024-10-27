import { useEffect } from "react";
import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const getPreferredTheme = (): "light" | "dark" => {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

const useThemeStore = create<ThemeState>((set) => ({
  theme: getPreferredTheme(),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

// Custom hook to update body class
const useBodyClass = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
};

export { useThemeStore, useBodyClass };