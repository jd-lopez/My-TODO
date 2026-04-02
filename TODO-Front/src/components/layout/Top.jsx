import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import AccountModal from "../../features/boards/components/modals/AccountModal";

function Top({ onToggleSidebar, isSidebarOpen, showModal, setShowModal }) {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const { isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const initials =
    `${user?.name?.first?.[0] || ""}${user?.name?.last?.[0] || ""}`.toUpperCase();

  return (
    <header
      className={` flex justify-between items-center px-4 py-3 md:p-4 transition-all duration-300 border-b border-gray-300 ${
        isDark ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSidebar}
          className={`inline-flex items-center justify-center rounded-md border p-2 md:hidden ${
            isDark
              ? "border-slate-600 hover:bg-slate-800"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faXmark : faBars} />
        </button>
        <NavLink
          className="text-2xl font-bold bg-linear-to-r from-blue-800 to-cyan-300 bg-clip-text text-transparent"
          to="/app"
        >
          TODO
        </NavLink>
      </div>
      <div className="flex items-center gap-2 md:gap-3 text-sm md:text-lg">
        <button
          className={`bg-blue-500  hover:bg-blue-700 transition-all ease-in text-white rounded-md px-2 py-1 font-bold cursor-pointer `}
          onClick={() => {
            if (showModal) {
              return;
            }

            setShowModal((prev) => !prev);
          }}
        >
          Create
        </button>

        {isAuthenticated ? (
          <button
            id="user-account"
            type="button"
            className={`relative  isolate inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold border ${
              isDark ? "text-white" : "text-slate-900 "
            }`}
            style={{
              backgroundColor: user?.color,
            }}
            aria-label={
              user?.name
                ? `${user.name.first} ${user.name.last}`.trim()
                : "User initials"
            }
            title={
              user?.name
                ? `${user.name.first} ${user.name.last}`.trim()
                : "User initials"
            }
            onClick={() => {
              setShowModal(false);
              setAccountMenuOpen(!accountMenuOpen);
              console.log("fgu");
            }}
          >
            <span className="relative z-10">{initials || "U"}</span>
          </button>
        ) : null}
      </div>

      {isAuthenticated && accountMenuOpen && <AccountModal />}
    </header>
  );
}

export default Top;
