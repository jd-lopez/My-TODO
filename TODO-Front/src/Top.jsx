import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "./context/ThemeContext";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faSign } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Login from "./pages/login/Login";

function Top() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`flex justify-between items-center p-4 transition-all duration-300  border-b border-gray-300 ${isDark ? "bg-slate-900 text-white" : "bg-white text-black"}`}
    >
      <NavLink className="font-bold" to="/">
        TODO
      </NavLink>
      <div className=" flex items-center  gap-3 text-lg">
        <NavLink to="/login" className="flex items-center gap-1 cursor-pointer">
          <FontAwesomeIcon icon={faSignIn} />
          <span>Log in</span>
        </NavLink>
        <button className="flex items-center gap-1 cursor-pointer">
          <FontAwesomeIcon icon={faSign} />
          <span>Sign Up</span>
        </button>
        <button onClick={toggleTheme}>
          {isDark ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>
      </div>
    </header>
  );
}

export default Top;
