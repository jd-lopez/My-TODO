import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMoon,
  faSignOut,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import NewBoard from "../../features/boards/components/NewBoard";

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
          className="text-2xl font-bold bg-linear-to-r from-blue-800 to-cyan-300 bg-clip-text text-transparent"
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
              className={`fixed z-40 ${showModal ? "top-16 md:top-18 bottom-0 left-0 right-0" : ""} ${isDark ? "bg-black/40" : "bg-gray-500/20"}`}
              onClick={() => setShowModal(false)}
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
            id="user-account"
            type="button"
            className={`relative  isolate inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
              isDark ? "text-white" : "text-slate-900 "
            }`}
            style={{
              "--user-account-fill": isDark
                ? "rgb(30, 41, 59)"
                : "rgb(243, 244, 246)",
              "--user-account-start": isDark
                ? "rgb(157, 199, 251)"
                : "rgb(255, 249, 255)",
              "--user-account-end": isDark
                ? "rgb(0, 13, 107)"
                : "rgb(5, 3, 255)",
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
          >
            <span className="relative z-10">{initials || "U"}</span>
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default Top;
