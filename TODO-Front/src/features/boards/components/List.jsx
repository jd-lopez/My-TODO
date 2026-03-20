import React from "react";

import crossIcon from "../../../assets/icon-cross.svg";
import crossIconDark from "../../../assets/icon_cross_dark.svg";
import edit from "../../../assets/pencil.svg";
import editDark from "../../../assets/pencil_dark.svg";
import checkIcon from "../../../assets/icon-check.svg";
import TasksContainer from "./TasksContainer";
import { useTheme } from "../../../context/ThemeContext";
import NewTask from "./NewTask";

function List({ tasks, onCreate, list }) {
  const { isDark } = useTheme();
  let isEmpty = tasks.length === 0;

  return (
    <div
      className={`min-h-0 flex flex-col gap-1 rounded-md p-2 min-w-68 ${isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} `}
    >
      <h1>{list.title}</h1>

      <div className=" max-h-60 overflow-y-auto rounded-md text-sm">
        {isEmpty ? (
          ""
        ) : (
          <div className="flex flex-col gap-2 p-2">
            {tasks.map((task) => {
              return (
                <div
                  key={task._id}
                  className={`group flex items-center gap-2 shadow p-1 rounded-md transition-all delay-75 hover:scale-102 hover:cursor-pointer ${isDark ? "bg-slate-700 " : "bg-gray-200 text-black"}`}
                >
                  <div
                    className={`  group-hover:grid rounded-full border-2  transition-all delay-75 size-4 place-content-center hover:scale-120 active:scale-200 ${isDark ? "border-white" : "border-purple-600"}
                      ${task.completed ? "bg-blue-500 grid" : "bg-white hidden"}`}
                  >
                    {task.completed && <img src={checkIcon} alt="" />}
                  </div>
                  <h1
                    className={`transition-all delay-100 ${task.completed ? "line-through text-gray-400" : ""}`}
                  >
                    {task.title ?? task.text}
                  </h1>
                  <div className="flex justify-between items-center gap-4 ml-auto ">
                    <img
                      src={isDark ? crossIconDark : crossIcon}
                      alt=""
                      className="size-3 hover:scale-140"
                    />
                    <img
                      src={isDark ? editDark : edit}
                      alt=""
                      className={`size-4 hover:scale-140 ${task.completed ? "invisible" : ""}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NewTask onCreate={onCreate} />
    </div>
  );
}

export default List;
