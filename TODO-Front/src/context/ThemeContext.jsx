import { createContext, useContext, useMemo, useState, useEffect } from "react";

const ThemeContext = createContext(null);
const THEME_KEY = "todo_theme";
export function ThemeProvider({ children }) {
  // Read the saved theme once on startup so the UI matches the user's previous choice.
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved ? saved === "dark" : false;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Memoize the context value so consumers do not re-render unless the theme state changes.
  const value = useMemo(() => ({ isDark, toggleTheme, setIsDark }), [isDark]);

  useEffect(() => {
    // Persist the current theme whenever it changes so refreshes keep the same mode.
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={value}> {children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  // This guards against using the hook outside ThemeProvider, which would return null.
  if (!ctx) throw new Error("Fuck");
  return ctx;
}
