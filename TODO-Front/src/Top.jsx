import moon from "./assets/icon-moon.svg";
import sun from "./assets/icon-sun.svg";
import { useTheme } from "./ThemeContext";

function Top() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between bg-slate-900 py-2 px-4">
      <h1 className="text-white font-bold">TODO</h1>
      <div className="text-white flex items-center gap-3 text-lg">
        <button>Log in</button>
        <button>Sign Up</button>
        <button onClick={toggleTheme}>
          {isDark ? <img src={sun} alt="" /> : <img src={moon} alt="" />}
        </button>
      </div>
    </div>
  );
}

export default Top;
