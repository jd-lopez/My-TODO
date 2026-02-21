import { useTheme } from "../../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => navigate("/app"), 1000);
  };

  return (
    <div
      className={`w-full min-h-screen px-4 py-6 md:px-8 md:py-8 transition-all duration-300 ${
        isDark
          ? "bg-slate-900 backdrop-blur-2xl text-white"
          : "bg-gray-100 backdrop-blur-2xl text-black"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:gap-8 lg:flex-row lg:items-center">
        {/* Login left side */}
        <div className="flex flex-col gap-4 md:gap-5 lg:flex-1">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Master your <span className="text-blue-700">workflow</span>
          </h1>
          <p
            className={`text-base md:text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Organize, track and conquer your tasks and boost your productivity.
            The ultimate task management solution for busy professionals. Stay
            on top of your to-do list and achieve your goals with ease.
          </p>

          {/* Abstract Dashboard visualization */}

          <div className="w-full h-44 md:h-52 flex flex-col overflow-hidden bg-slate-800/50 rounded-lg p-5 shadow-lg border border-gray-700 relative">
            <div className="flex justify-start space-x-4">
              <div className="w-3 h-3 bg-blue-500/50 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500/50 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
            </div>

            <div className="mt-5 flex w-full items-center justify-between">
              <div className="w-16 h-1 bg-gray-400/50 rounded-full"></div>
              <div className="w-16 h-1 bg-blue-700/50 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-400/50 rounded-full"></div>
            </div>

            <div className="relative w-full h-full">
              <div className="w-20 h-12 md:w-28 md:h-16 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-4 left-2 md:left-4"></div>
              <div className="w-20 h-16 md:w-28 md:h-20 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-20 left-2 md:top-24 md:left-4"></div>
              <div className="w-24 h-18 md:w-32 md:h-24 bg-blue-950/50 shadow-md border border-gray-700 rounded-lg absolute top-4 left-24 md:left-36"></div>
              <div className="w-20 h-10 md:w-28 md:h-12 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-24 left-24 md:top-28 md:left-36"></div>
              <div className="w-20 h-16 md:w-28 md:h-20 bg-slate-700/50 shadow-md border border-gray-700 rounded-lg absolute top-4 right-2 md:right-4"></div>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div
          className={`w-full lg:max-w-md flex flex-col justify-between gap-5 shadow text-sm p-6 md:p-8 rounded-2xl transition-all duration-300 ${
            isDark
              ? "bg-slate-900 text-white border border-gray-700"
              : "bg-white text-black border border-gray-300"
          }`}
        >
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl">Welcome Back</h1>
            <p className="text-sm ">
              Log in to manage your productivity and teams
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <button className="focus:text-blue-700 border-b-2 border-b-gray-400 focus:border-blue-700 px-5 py-2 text-sm grow">
              Sign in
            </button>
            <button className="focus:text-blue-700 border-b-2 border-b-gray-400 focus:border-blue-700 px-5 py-2 text-sm grow">
              Sign up
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col space-y-2 md:space-y-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                className={`border rounded-md p-2 ${
                  isDark
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-white text-black border-gray-300"
                }`}
              />
            </div>
            <div className="flex flex-col space-y-2 md:space-y-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                placeholder="Enter your password"
                className={`border rounded-md p-2 ${
                  isDark
                    ? "bg-slate-800 text-white border-gray-700"
                    : "bg-white text-black border-gray-300"
                }`}
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
    </div>
  );
}

export default Login;
