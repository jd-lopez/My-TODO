import { useTheme } from "./context/ThemeContext";

function ImputTask() {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row 
     text-white sm:items-center sm:justify-between text-base md:text-lg px-3 py-2 transition-all delay-75 border border-transparent ${
       isDark
         ? "bg-white/10 backdrop-blur-2xl"
         : "bg-white/50 backdrop-blur-2xl"
     }`}
    >
      <div>
        <h1>MarketPlace</h1>
      </div>

      <div className="flex items-center gap-3 text-sm md:text-base">
        <button className="rounded-md px-2 py-1 hover:bg-black/10">
          Filter
        </button>
        <button className="rounded-md px-2 py-1 hover:bg-black/10">
          Share
        </button>
        <button className="rounded-md px-2 py-1 hover:bg-black/10">...</button>
      </div>
    </div>
  );
}

export default ImputTask;
