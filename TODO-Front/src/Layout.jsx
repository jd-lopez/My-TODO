import { Outlet } from "react-router-dom";
import Top from "./Top";
import Dashboard from "./Dashboard";
import { useTheme } from "./ThemeContext";

export default function Layout() {
  const { isDark } = useTheme();
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Top />
      <main
        className={`
        
         ${isDark ? "text-white " : "text-black"}`}
      >
        <Dashboard />
      </main>
    </div>
  );
}
