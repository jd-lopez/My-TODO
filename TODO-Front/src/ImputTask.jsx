import React, { useState } from "react";
import { useTheme } from "./ThemeContext";

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
    <div className="flex text-lg text-white px-3 items-center justify-between transition-all delay-75 bg-white/10 backdrop-blur-2xl">
      <div>
        <h1>MarketPlace</h1>
      </div>
      <form onSubmit={submit} className="flex  items-center">
        <label htmlFor="inputTask" className="flex-1">
          <input
            type="text"
            id="inputTask"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a new task"
            className={`outline-0 px-2 py-0.5 border w-full flex-1 rounded-bl-md rounded-tl-md focus:ring-1 ${isDark ? "bg-gray-700 text-white border-white" : "bg-white border-black text-black"}`}
          />
        </label>
        <button className="bg-violet-400  p-1 rounded-tr-md rounded-br-md hover:bg-violet-600 active:bg-violet-600">
          Submit
        </button>
      </form>
      <div className="text-white flex items-center gap-4">
        <button>Filter</button>
        <button>Share</button>
        <button>...</button>
      </div>
    </div>
  );
}

export default ImputTask;
