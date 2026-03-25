import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function ListOptionModal({
  onCloseModal,
  onDeleteList,
  boardId,
  listId,
}) {
  const { isDark } = useTheme();
  return (
    <div className="absolute  z-20 right-14 md:right-5 top-0  ">
      <dialog
        open
        className={`px-2 py-4 rounded-md min-w-44 ${isDark ? "bg-slate-700 text-white" : ""}`}
      >
        <div className="flex justify-between z-50">
          <h1>List Actions</h1>
          <button onClick={() => onCloseModal(false)}>X</button>
        </div>

        <div className="flex flex-col items-start">
          <button>Add Card</button>
          <button onClick={() => onDeleteList(boardId, listId)}>
            Delete List
          </button>
          <button>Delete all task in list</button>
        </div>
      </dialog>
    </div>
  );
}
