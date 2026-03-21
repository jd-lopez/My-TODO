import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function TaskModal({ onClose, task, list, board }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`absolute top-17 z-50 left-5 right-5 md:top-19 md:left-34 md:right-24  md:w-5xl`}
    >
      <dialog
        open
        className={`px-4 w-full py-6 rounded-md ${isDark ? "bg-slate-700 text-white" : ""}`}
      >
        <div className="flex justify-between border-b border-white/40 ">
          <div className="flex flex-col gap-1 ">
            <h1 className="text-blue-600">{board.title}</h1>
            <h1 className="text-2xl">{task.title}</h1>
            <h1 className="text-sm text-gray-400">in {list.title}</h1>
          </div>
          <div>
            <FontAwesomeIcon icon={faXmark} onClick={() => onClose(false)} />
          </div>
        </div>

        <div className="flex justify-between py-4">
          <div className="flex-3">
            <div>
              <h1>Description</h1>
              <textarea
                name="description"
                id=""
                className="border border-amber-50"
              ></textarea>
            </div>
          </div>

          <div className="flex-1">
            <div>
              <h1>Members</h1>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default TaskModal;
