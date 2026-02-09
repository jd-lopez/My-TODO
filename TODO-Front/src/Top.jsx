import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "./ThemeContext";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faSign } from "@fortawesome/free-solid-svg-icons";

function Top() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`flex justify-between items-center p-4 transition-all duration-300  border-b border-gray-300 ${isDark ? "bg-slate-900 text-white" : "bg-teal-800 text-white"}`}
    >
      <h1 className="font-bold">TODO</h1>
      <div className=" flex items-center  gap-3 text-lg">
        <button className="flex items-center gap-1 ">
          <FontAwesomeIcon icon={faSignIn} />
          <span>Log in</span>
        </button>
        <button className="flex items-center gap-1">
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
