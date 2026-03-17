import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "./context/ThemeContext";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NewBoard from "./features/boards/components/NewBoard";
import { Fragment } from "react";

function Top({ onToggleSidebar, isSidebarOpen }) {
  const [showModal, setShowModal] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const initials =
    `${user?.name?.first?.[0] || ""}${user?.name?.last?.[0] || ""}`.toUpperCase();

  return (
    <header
      className={`flex justify-between items-center px-4 py-3 md:p-4 transition-all duration-300 border-b border-gray-300 ${
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
          className=" text-sm md:text-base font-bold bg-linear-to-r from-blue-800 to-cyan-300  bg-clip-text text-transparent"
          to="/app"
        >
          TODO
        </NavLink>
      </div>
      <div className="flex items-center gap-2 md:gap-3 text-sm md:text-lg">
        <button
          className={`bg-blue-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer ${isDark ? "hover:darkShadow" : "hover:lightShadow"}`}
          onClick={() => setShowModal(!showModal)}
        >
          Create
        </button>

        {showModal && (
          <Fragment>
            <div
              className={`fixed z-40 ${showModal ? "top-14 bottom-0 left-0 right-0" : ""} ${isDark ? "bg-black/40" : "bg-gray-500/20"}`}
            ></div>
            <NewBoard onClose={() => setShowModal(false)} />
          </Fragment>
        )}

        {isAuthenticated ? (
          <button
            onClick={logout}
            className={`rounded-md border px-2 py-1 ${
              isDark
                ? "border-slate-600 hover:bg-slate-800 hover:darkShadow"
                : "border-gray-300 hover:bg-gray-100 hover:lightShadow"
            }`}
            aria-label="Log out"
          >
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        ) : null}
        <button
          onClick={toggleTheme}
          className={`rounded-md border px-2 py-1 ${
            isDark
              ? "border-slate-600 hover:bg-slate-800 hover:darkShadow"
              : "border-gray-300 hover:bg-gray-100 hover:lightShadow"
          }`}
          aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
        >
          {isDark ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>

        {isAuthenticated ? (
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-xs font-bold ${
              isDark
                ? "border-slate-600 bg-slate-800 text-white hover:darkShadow"
                : "border-gray-300 bg-gray-100 text-slate-900 hover:lightShadow"
            }`}
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
          >
            {initials || "U"}
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default Top;
