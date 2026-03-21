import { useState } from "react";
import TaskModal from "./TaskModal";
import crossIcon from "../../../assets/icon-cross.svg";
import crossIconDark from "../../../assets/icon_cross_dark.svg";
import edit from "../../../assets/pencil.svg";
import editDark from "../../../assets/pencil_dark.svg";
import checkIcon from "../../../assets/icon-check.svg";
import { useTheme } from "../../../context/ThemeContext";

function TasksContainer({ tasks, list, board }) {
  const { isDark } = useTheme();
  const [taskModal, setTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState();

  let isEmpty = tasks.length === 0;

  return (
    <div className=" max-h-60 overflow-y-auto rounded-md text-sm">
      {isEmpty ? (
        ""
      ) : (
        <div className="flex flex-col gap-2 p-2">
          {tasks.map((task) => {
            return (
              <div
                key={task._id}
                className={`group flex items-center justify-between gap-2 shadow p-1 rounded-md transition-all delay-75 hover:scale-102 hover:cursor-pointer ${isDark ? "bg-slate-700 " : "bg-gray-200 text-black"}`}
                onClick={() => {
                  setTaskModal(!taskModal);
                  setCurrentTask(task);
                }}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  className={`  group-hover:grid rounded-full border-2  transition-all delay-75 size-4 place-content-center hover:scale-120 active:scale-200  ${isDark ? "border-white" : "border-purple-600"}
                      ${task.completed ? "bg-blue-500 grid" : "bg-white hidden"}`}
                >
                  {task.completed && <img src={checkIcon} alt="" />}
                </button>{" "}
                <h1
                  className={`transition-all w-44 text-justify delay-100 ${task.completed ? "line-through text-gray-400" : ""}`}
                >
                  {task.title ?? task.text}
                </h1>
                <div className="flex justify-end items-center gap-2  w-14 ">
                  <button onClick={(e) => e.stopPropagation()}>
                    <img
                      src={isDark ? crossIconDark : crossIcon}
                      alt=""
                      className="size-3 hover:scale-140"
                    />
                  </button>
                  <button onClick={(e) => e.stopPropagation()}>
                    <img
                      src={isDark ? editDark : edit}
                      alt=""
                      className={`size-4 hover:scale-140 ${task.completed ? "invisible" : ""}`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {taskModal && (
        <>
          <div
            className={`fixed z-40 ${taskModal ? "top-0 md:top-0 bottom-0 left-0 right-0" : ""} ${isDark ? "bg-black/40" : "bg-gray-500/20"}`}
            onClick={() => setTaskModal(false)}
          ></div>
          <TaskModal
            onClose={() => setTaskModal(false)}
            task={currentTask}
            list={list}
            board={board}
          />
        </>
      )}
    </div>
  );
}

export default TasksContainer;
