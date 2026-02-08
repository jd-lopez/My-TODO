import { createContext, useContext, useMemo, useState, useEffect } from "react";

const ThemeContext = createContext(null);
const THEME_KEY = "todo_theme";
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved ? saved === "dark" : false;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);
  const value = useMemo(() => ({ isDark, toggleTheme, setIsDark }), [isDark]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);
  return (
    <ThemeContext.Provider value={value}> {children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Fuck");
  return ctx;
}
