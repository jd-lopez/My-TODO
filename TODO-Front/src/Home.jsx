import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";

export default function Home() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <section
      className={`min-h-full px-6 py-8 md:px-10 md:py-12 ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div
          className={`rounded-3xl border p-6 md:p-8 ${
            isDark
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <p
            className={`text-sm uppercase tracking-[0.25em] ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Signed In
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            Welcome back{user?.name ? `, ${user.name}` : ""}.
          </h1>
          <p
            className={`mt-4 max-w-2xl text-base md:text-lg ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            This is your home page. Use it as the starting point after login,
            then jump into your dashboard to manage the tasks stored for your
            account.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/app/dashboard"
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Open Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div
            className={`rounded-2xl border p-5 ${
              isDark
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold">Home</h2>
            <p
              className={`mt-2 text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              `/app` is now the authenticated landing page.
            </p>
          </div>
          <div
            className={`rounded-2xl border p-5 ${
              isDark
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p
              className={`mt-2 text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              `/app/dashboard` loads the logged-in user&apos;s tasks.
            </p>
          </div>
          <div
            className={`rounded-2xl border p-5 ${
              isDark
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold">Session</h2>
            <p
              className={`mt-2 text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Your auth context keeps the user and token available while signed
              in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
