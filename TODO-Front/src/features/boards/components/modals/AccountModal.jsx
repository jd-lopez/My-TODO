import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useTheme } from "../../../../context/ThemeContext";

function AccountModal() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark } = useTheme();

  const initials =
    `${user?.name?.first?.[0]} ${user?.name?.last?.[0]}`.toUpperCase();
  return (
    <div className="absolute top-16 right-68 md:top-18 md:right-66 bottom-0 z-50">
      {isAuthenticated && (
        <div>
          <dialog
            open
            className={`px-4 py-4 rounded-md min-w-44 w-64 md:w-64 flex flex-col gap-4 ${isDark ? "bg-slate-800 text-white" : ""}`}
          >
            <h1>Account</h1>
            <div className=" flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <button className="rounded-full bg-red-600 p-2 font-bold ">
                  <span>{initials}</span>
                </button>
                <div>
                  <p>{`${user?.name?.first} ${user?.name?.last}`}</p>
                  <p className=" text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              <hr className="border-t border-white" />
              <div>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
}

export default AccountModal;
