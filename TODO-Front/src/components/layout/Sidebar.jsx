import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOut,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ isOpen, toggleSidebar }) {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          />
          <aside
            className={`relative h-full w-64 p-4 border-r flex flex-col ${
              isDark
                ? "bg-slate-900 text-white border-slate-700"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <h1 className="  text-2xl font-bold bg-linear-to-r from-blue-800 to-cyan-300 bg-clip-text text-transparent px-3 pt-1 ">
              TODO
            </h1>
            <ul className="mt-12 flex flex-col gap-6 text-base">
              <li>
                <NavLink
                  to="/app"
                  end
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? "bg-white text-black"
                        : isDark
                          ? "hover:bg-slate-800"
                          : "hover:bg-gray-100"
                    }`
                  }
                >
                  <span>Home</span>
                  <FontAwesomeIcon icon={faHome} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/app/dashboard"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-2 rounded-md px-3 py-2 ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : isDark
                          ? "hover:bg-slate-800"
                          : "hover:bg-gray-100"
                    }`
                  }
                >
                  <span>Members</span>
                  <FontAwesomeIcon icon={faUserGroup} />
                </NavLink>
              </li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleSidebar();
                }}
                className="flex mt-auto items-center justify-between gap-2 px-3 py-2"
              >
                Log Out
                <FontAwesomeIcon icon={faSignOut} className="rotate-180" />
              </button>
            </ul>
          </aside>
        </div>
      )}

      <aside
        className={`hidden md:flex md:flex-col items-center min-h-0 transition-all duration-300 border-r ${
          isOpen ? "w-52 p-4" : "w-20 p-3"
        } ${
          isDark
            ? "bg-slate-900 text-white border-gray-700"
            : "bg-white text-black border-black/20"
        }`}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          className={`mb-4 rounded-md border px-2 w-fit py-1 text-xs ${
            isDark
              ? "border-slate-600 hover:bg-slate-800"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {isOpen ? "Collapse" : "Expand"}
        </button>
        <ul className="flex flex-col gap-6 text-base">
          <li>
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `flex items-center justify-between gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : isDark
                      ? "hover:bg-slate-800"
                      : "hover:bg-gray-100"
                }`
              }
            >
              {isOpen && <span className="whitespace-nowrap">Home</span>}
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) =>
                `flex items-center justify-between gap-2 rounded-md px-3 py-2 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : isDark
                      ? "hover:bg-slate-800"
                      : "hover:bg-gray-100"
                }`
              }
            >
              {isOpen && <span className="whitespace-nowrap">Members</span>}
              <FontAwesomeIcon icon={faUserGroup} />
            </NavLink>
          </li>
        </ul>

        <button className="mt-auto">
          <NavLink
            to="/login"
            onClick={handleLogout}
            className={({ isActive }) =>
              `flex items-center justify-between gap-2 rounded-md px-3 py-2 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : isDark
                    ? "hover:bg-slate-800"
                    : "hover:bg-gray-100"
              }`
            }
          >
            {isOpen && <span className="whitespace-nowrap">Log Out</span>}
            <FontAwesomeIcon icon={faSignOut} className="rotate-180" />
          </NavLink>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
