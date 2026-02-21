import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "./context/ThemeContext";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faSign } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Top({ onToggleSidebar, isSidebarOpen }) {
  const { isDark, toggleTheme } = useTheme();

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
        <NavLink className="font-bold text-sm md:text-base" to="/">
          TODO
        </NavLink>
      </div>
      <div className="flex items-center gap-2 md:gap-3 text-sm md:text-lg">
        <NavLink
          to="/login"
          className="flex items-center gap-1 cursor-pointer"
        >
          <FontAwesomeIcon icon={faSignIn} />
          <span className="hidden sm:inline">Log in</span>
        </NavLink>
        <NavLink to="/signup" className="flex items-center gap-1 cursor-pointer">
          <FontAwesomeIcon icon={faSign} />
          <span className="hidden sm:inline">Sign Up</span>
        </NavLink>
        <button
          onClick={toggleTheme}
          className={`rounded-md border px-2 py-1 ${
            isDark
              ? "border-slate-600 hover:bg-slate-800"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
        >
          {isDark ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>
      </div>
    </header>
  );
}

export default Top;
