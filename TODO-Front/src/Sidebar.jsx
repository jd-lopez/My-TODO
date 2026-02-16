import { useTheme } from "./context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const { isDark } = useTheme();
  return (
    <aside
      className={` w-1/6 p-4 min-h-0 transition-all duration-500 ${isOpen ? "" : " md:block w-16"} ${isDark ? "bg-slate-900 text-white border-r border-gray-100" : "bg-white border-black/20 border-r"}`}
      onClick={toggleSidebar}
    >
      <ul className="flex flex-col gap-8 text-lg">
        {isOpen ? (
          <>
            <NavLink
              to="/"
              className="flex items-center gap-2 justify-between cursor-pointer"
              label="Home"
            >
              <span className="whitespace-nowrap">Home</span>
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
            <li
              className="flex items-center gap-2 justify-between cursor-pointer"
              label="Dashboard"
            >
              <span className="whitespace-nowrap">Dashboard</span>
              <FontAwesomeIcon icon={faDashboard} />
            </li>

            <li className="flex items-center gap-2 justify-between cursor-pointer">
              <span className="whitespace-nowrap">Log Out</span>
              <FontAwesomeIcon icon={faSignOut} className="rotate-180" />
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faHome} />
            </li>
            <li className="flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faDashboard} />
            </li>
            <li className="flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faSignOut} className="rotate-180" />
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
