import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <section
      className={`min-h-full  ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className=" mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-4">My Boards</h1>

        {/*Board list container */}
        <div className="grid grid-cols-4 gap-2">
          <NavLink
            to="/app/board"
            className="flex flex-col rounded-2xl shadow-sm justify-between h-46 max-w-60"
          >
            <img
              src="/images/sunset.jpg"
              alt=""
              className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
            />
            <h2 className="text-lg font-semibold p-2">Board Title</h2>
          </NavLink>

          <div className="flex flex-col rounded-2xl shadow-sm justify-between h-46 max-w-60">
            <img
              src="/images/sunset.jpg"
              alt=""
              className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
            />
            <h2 className="text-lg font-semibold p-2">Board Title</h2>
          </div>
          <div className="flex flex-col rounded-2xl shadow-sm justify-between h-46 max-w-60">
            <img
              src="/images/sunset.jpg"
              alt=""
              className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
            />
            <h2 className="text-lg font-semibold p-2">Board Title</h2>
          </div>
          <div className="flex flex-col rounded-2xl shadow-sm justify-between h-46 max-w-60">
            <img
              src="/images/sunset.jpg"
              alt=""
              className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
            />
            <h2 className="text-lg font-semibold p-2">Board Title</h2>
          </div>
          <div className="flex flex-col rounded-2xl shadow-sm justify-between h-46 max-w-60">
            <img
              src="/images/sunset.jpg"
              alt=""
              className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
            />
            <h2 className="text-lg font-semibold p-2">Board Title</h2>
          </div>
          <div className="flex flex-col rounded-2xl shadow-sm justify-between h-46 max-w-60">
            <img
              src="/images/sunset.jpg"
              alt=""
              className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
            />
            <h2 className="text-lg font-semibold p-2">Board Title</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
