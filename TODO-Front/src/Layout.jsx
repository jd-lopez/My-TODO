import { Outlet } from "react-router-dom";
import Top from "./Top";
import Dashboard from "./Dashboard";
import { useTheme } from "./ThemeContext";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Top />

      <div className="flex h-full">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 overflow-auto 
        
         ${isDark ? "text-white " : "text-black"}`}
        >
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
