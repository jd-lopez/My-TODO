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
    <div className="absolute z-20 right-14 md:right-5 -top-2  ">
      <dialog
        open
        className={`px-1 py-4 rounded-md min-w-44 md:w-64 flex flex-col gap-4 ${isDark ? "bg-slate-800 text-white" : ""}`}
      >
        <div className="flex justify-between z-50 px-2">
          <h1>List Actions</h1>
          <button onClick={() => onCloseModal(false)}>X</button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className={`listActionButton ${isDark ? "md:hover:bg-slate-700" : "md:hover:bg-gray-50 md:hover:shadow-md"}`}
          >
            Add Card
          </button>
          <button
            className={`listActionButton ${isDark ? "md:hover:bg-slate-700" : "md:hover:bg-gray-50 md:hover:lightShadow"}`}
            onClick={() => onDeleteList(boardId, listId)}
          >
            Delete List
          </button>
          <button
            className={`listActionButton ${isDark ? "md:hover:bg-slate-700" : "md:hover:bg-gray-50 md:hover:shadow-md"}`}
          >
            Delete all task in list
          </button>
        </div>
      </dialog>
    </div>
  );
}
