import { Outlet } from "react-router-dom";
import Top from "../components/layout/Top";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/layout/Sidebar";
import { useState } from "react";
import NewBoard from "../features/boards/components/forms/NewBoard";

export default function Layout() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-dvh flex flex-col overflow-y-hidden relative">
      <Top
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isOpen}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 min-h-0 overflow-hidden relative ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <Outlet context={{ showModal, setShowModal }} />
        </main>
      </div>

      {showModal && (
        <>
          <div
            className={`fixed z-40 top-16 md:top-18 bottom-0 left-0 right-0 ${
              isDark ? "bg-black/40" : "bg-gray-500/20"
            }`}
            onClick={() => setShowModal(false)}
          ></div>
          <NewBoard onClose={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
}
