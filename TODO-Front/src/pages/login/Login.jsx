import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";

function Login() {
  const { isDark } = useTheme();
  return (
    <div
      className={`flex justify-between items-center gap-4 p-8 transition-all duration-300  border-b border-gray-300 ${isDark ? "bg-slate-900 backdrop-blur-2xl text-white" : "bg-gray-100 backdrop-blur-2xl  text-black"}`}
    >
      {/* Login left side */}
      <div className=" flex flex-col gap-5 shrink flex-2">
        <h1 className="text-4xl font-bold">
          Master your <span className="text-blue-700">workflow</span>
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Organize, track and conquer your tasks and boost your productivity.
          The ultimate task management solution for busy professionals. Stay on
          top of your to-do list and achieve your goals with ease.
        </p>

        {/* Abstract Dashboard visualization */}

        <div className=" min-w-full h-50 flex flex-col  overflow-hidden bg-slate-800/50 rounded-lg p-5 shadow-lg border border-gray-700 relative">
          <div className="flex justify-start space-x-4">
            {/*three dots, different colors */}
            <div className="w-3 h-3 bg-blue-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
          </div>

          <div className="flex space-x-2 justify-between mt-5">
            <div className="w-16 h-1 bg-gray-400/50 rounded-full absolute left-5"></div>
            <div className="w-16 h-1 bg-blue-700/50 rounded-full absolute left-60"></div>
            <div className="w-16 h-1 bg-gray-400/50 rounded-full absolute left-115"></div>
          </div>

          <div className="relative w-full h-full">
            {/*floating rectangles - resized to fit parent*/}
            <div className="w-28 h-16 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-4 left-4"></div>
            <div className="w-28 h-20 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-24 left-4"></div>
            <div className="w-32 h-24 bg-blue-950/50 shadow-md border border-gray-700 rounded-lg absolute top-4 left-36"></div>
            <div className="w-28 h-12 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-28 left-36"></div>
            <div className="w-28 h-20 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-4 right-4"></div>
          </div>
        </div>
      </div>
      {/* Login form */}

      <div
        className={`flex flex-col flex-1 justify-between gap-5 shadow  text-sm p-8 rounded-2xl transition-all duration-300 ${isDark ? "bg-slate-900 text-white border border-gray-700" : "bg-white text-black border border-gray-300"}`}
      >
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Welcome Back</h1>
          <p className="text-sm ">
            Log in to manage your productivity and teams
          </p>
        </div>
        <div className="flex justify-between gap-2 ">
          <button className=" focus:text-blue-700 border-b-2 border-b-gray-400 focus:border-blue-700 px-5 py-2 text-sm grow">
            Sign in
          </button>
          <button className=" focus:text-blue-700 border-b-2 border-b-gray-400 focus:border-blue-700 px-5 py-2 text-sm grow">
            Sign up
          </button>
        </div>
        <form action="" className="flex flex-col gap-2">
          <div className="flex flex-col space-y-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={`border border-black rounded-md p-2 ${isDark ? "bg-slate-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`border border-black rounded-md p-2 ${isDark ? "bg-slate-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
            />
          </div>
          <button
            type="submit"
            className="mt-5 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md w-full"
          >
            Sign in
          </button>
        </form>

        <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Don't have an account yet?{" "}
          <NavLink to="/signup" className="text-blue-700">
            Sign up
          </NavLink>
        </span>
      </div>
    </div>
  );
}

export default Login;
