import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function PublicLayout() {
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div
      className={` scroll-smooth  ${isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}
    >
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur ${
          isDark
            ? "bg-slate-950/80 border-slate-800"
            : "bg-slate-50/90 border-slate-200"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-lg font-bold tracking-wide"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            TODO FLOW
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="/#features"
              className={`text-sm font-medium ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              Features
            </a>
            <a
              href="/#workflow"
              className={`text-sm font-medium ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              Workflow
            </a>
            <a
              href="/#get-started"
              className={`text-sm font-medium ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              Get Started
            </a>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className={`rounded-lg px-4 py-2 text-sm font-semibold border ${
                isDark
                  ? "border-slate-600 hover:bg-slate-900"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Sign up
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                isDark
                  ? "border-slate-600 hover:bg-slate-900"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              {isDark ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                isDark
                  ? "border-slate-600 hover:bg-slate-900"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              {isDark ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                isDark
                  ? "border-slate-600 hover:bg-slate-900"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 transition-all ${
                    isDark ? "bg-slate-200" : "bg-slate-800"
                  } ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 transition-all ${
                    isDark ? "bg-slate-200" : "bg-slate-800"
                  } ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`block h-0.5 w-5 transition-all ${
                    isDark ? "bg-slate-200" : "bg-slate-800"
                  } ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="mx-auto w-full max-w-6xl px-6 pb-4 md:hidden">
            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-900 text-slate-200"
                  : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              <div className="flex flex-col gap-2">
                <a
                  href="#features"
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"
                  }`}
                >
                  Features
                </a>
                <a
                  href="/#workflow"
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"
                  }`}
                >
                  Workflow
                </a>
                <a
                  href="/#get-started"
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"
                  }`}
                >
                  Get Started
                </a>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className={`rounded-lg border px-3 py-2 text-center text-sm font-semibold ${
                    isDark
                      ? "border-slate-600 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <Outlet />
    </div>
  );
}
