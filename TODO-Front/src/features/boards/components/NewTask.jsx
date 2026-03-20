import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../context/ThemeContext";
import { CreatorForm } from "./CreatorForm";

export default function NewTask({ onCreate }) {
  const { isDark } = useTheme();
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div
      className={`p-1 text-lg gap-3  hover:bg-gray-600 hover:cursor-pointer rounded-md   ${isDark ? "bg-slate-900 text-white" : "bg-white text-black"}`}
    >
      {clicked ? (
        <CreatorForm
          setClicked={setClicked}
          title={title}
          setTitle={setTitle}
          placeholder={"New Task"}
          onCreate={onCreate}
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
