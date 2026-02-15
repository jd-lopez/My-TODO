import React from "react";
import { useTheme } from "./context/ThemeContext";

function TaskFilters({ count, filter, setFilter }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex justify-between text-xs mt-0 rounded-md  shadow-xl px-2 py-1 md:text-xl backdrop-blur-sm ${isDark ? "bg-gray-400/20" : "bg-white/10"}`}
    >
      <div>
        <span>{count}</span> items left
      </div>
      <div className="flex gap-3 ">
        <button
          className={`cursor-pointer font-bold ${filter === "all" ? "text-blue-600 font" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`cursor-pointer ${filter === "active" ? "text-blue-600 font" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`cursor-pointer ${filter === "completed" ? "text-blue-600 font" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <button>Clear Completed</button>
    </div>
  );
}

export default TaskFilters;
