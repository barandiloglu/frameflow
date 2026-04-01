"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("ff-theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    // Add transitioning class for smooth animation
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.setAttribute("data-theme", next);

    setTheme(next);
    localStorage.setItem("ff-theme", next);

    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 700);
  }, [theme]);

  // Prevent flash of wrong theme
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
