import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useTheme } from "../../../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function AccountModal() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const initials =
    `${user?.name?.first?.[0]} ${user?.name?.last?.[0]}`.toUpperCase();
  return (
    <div className="absolute top-16 right-68 md:top-18 md:right-66 bottom-0 z-50">
      {isAuthenticated && (
        <dialog
          open
          className={`px-4 py-4 rounded-md min-w-44 w-64 md:w-64 flex flex-col gap-4 shadow-md ${isDark ? "bg-slate-800 text-white" : ""}`}
        >
          <h1>Account</h1>
          <div className=" flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <button
                className="rounded-full size-12  p-2 font-bold "
                style={{ backgroundColor: user?.color }}
              >
                <span>{initials}</span>
              </button>
              <div>
                <p>{`${user?.name?.first} ${user?.name?.last}`}</p>
                <p className=" text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>
            <hr className="border-t border-white" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <p>Theme</p>
                <button
                  onClick={toggleTheme}
                  className={`rounded-full border p-1 grid items-center ${
                    isDark
                      ? "border-slate-600 hover:bg-slate-800 "
                      : "border-gray-300 hover:bg-gray-100 w"
                  }`}
                  aria-label={
                    isDark ? "Activate light mode" : "Activate dark mode"
                  }
                >
                  {isDark ? (
                    <FontAwesomeIcon icon={faSun} className="text-sm" />
                  ) : (
                    <FontAwesomeIcon icon={faMoon} className="text-sm" />
                  )}
                </button>
              </div>

              <button
                onClick={logout}
                className="flex  items-center justify-between w-full"
              >
                <span>Logout</span>
                <FontAwesomeIcon icon={faSignOut} className="text-lg" />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default AccountModal;
