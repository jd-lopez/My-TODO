import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../context/ThemeContext";

export default function NewTask({ onCreate }) {
  const { isDark } = useTheme();
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onCreate(text);
    setText("");
    setClicked(false);
  }

  return (
    <div
      className={`p-1 text-lg gap-3  hover:bg-gray-600 hover:cursor-pointer rounded-md   ${isDark ? "bg-slate-900 text-white" : "bg-white text-black"}`}
      onClick={() => setClicked(!clicked)}
    >
      {clicked ? (
        <TaskForm
          clicked={clicked}
          setClicked={setClicked}
          text={text}
          setText={setText}
          onSubmit={submit}
        />
      ) : (
        <button
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={() => setClicked(true)}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="text-blue-700 hover:cursor-pointer"
          />
          <p>Add a new task</p>
        </button>
      )}
    </div>
  );
}

export function TaskForm({ clicked, setClicked, text, setText, onSubmit }) {
  return (
    <form
      className="flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="Task name"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
      />
      <div>
        <button
          className="rounded-md bg-blue-700 px-1 hover:cursor-pointer"
          type="submit"
        >
          Add
        </button>

        <button
          className="rounded-md bg-red-700 px-1 ml-2 hover:cursor-pointer"
          type="button"
          onClick={() => {
            setClicked(false);
            setText("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
