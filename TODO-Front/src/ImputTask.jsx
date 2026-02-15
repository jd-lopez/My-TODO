import React, { useState } from "react";
import { useTheme } from "./context/ThemeContext";

function ImputTask({ createTask }) {
  const [text, setText] = useState("");
  const { isDark } = useTheme();

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    createTask(text);
    setText("");
  }

  return (
    <div
      className={`flex text-lg px-3 py-2 items-center justify-between transition-all delay-75 border border-gray-300 ${isDark ? "bg-white/10 backdrop-blur-2xl" : "bg-white/50 backdrop-blur-2xl"}`}
    >
      <div>
        <h1>MarketPlace</h1>
      </div>

      <div className="flex items-center gap-4">
        <button>Filter</button>
        <button>Share</button>
        <button>...</button>
      </div>
    </div>
  );
}

export default ImputTask;
