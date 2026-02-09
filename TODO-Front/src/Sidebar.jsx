import { useTheme } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isOpen, toggleSidebar }) {
  const { isDark } = useTheme();
  return (
    <aside
      className={` w-1/6 p-4 min-h-0 transition-all duration-500 ${isOpen ? "" : " md:block w-16"} ${isDark ? "bg-slate-900 text-white" : "bg-teal-800 text-white"}`}
      onClick={toggleSidebar}
    >
      <ul className="flex flex-col gap-8 text-lg">
        {isOpen ? (
          <>
            <li
              className="flex items-center gap-2 justify-between"
              label="Home"
            >
              <span className="whitespace-nowrap">Home</span>
              <FontAwesomeIcon icon={faHome} />
            </li>
            <li
              className="flex items-center gap-2 justify-between"
              label="Dashboard"
            >
              <span className="whitespace-nowrap">Dashboard</span>
              <FontAwesomeIcon icon={faDashboard} />
            </li>

            <li className="flex items-center gap-2 justify-between">
              <span className="whitespace-nowrap">Log Out</span>
              <FontAwesomeIcon icon={faSignOut} className="rotate-180" />
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center justify-center">
              <FontAwesomeIcon icon={faHome} />
            </li>
            <li className="flex items-center justify-center">
              <FontAwesomeIcon icon={faDashboard} />
            </li>
            <li className="flex items-center justify-center">
              <FontAwesomeIcon icon={faSignOut} className="rotate-180" />
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
