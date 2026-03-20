import { Outlet } from "react-router-dom";
import Top from "../Top";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../Sidebar";
import { useState } from "react";

export default function Layout() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-dvh flex flex-col overflow-y-hidden relative">
      <Top onToggleSidebar={toggleSidebar} isSidebarOpen={isOpen} />

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 min-h-0 overflow-hidden ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
