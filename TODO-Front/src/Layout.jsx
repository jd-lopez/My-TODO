import { Outlet } from "react-router-dom";
import Top from "./Top";
import { useTheme } from "./context/ThemeContext";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Top onToggleSidebar={toggleSidebar} isSidebarOpen={isOpen} />

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 overflow-auto ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
