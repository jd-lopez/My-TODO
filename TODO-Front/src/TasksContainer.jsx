import TaskFilters from "./TaskFilters";
import crossIcon from "./assets/icon-cross.svg";
import crossIconDark from "./assets/icon_cross_dark.svg";
import edit from "./assets/pencil.svg";
import editDark from "./assets/pencil_dark.svg";
import checkIcon from "./assets/icon-check.svg";
import { useTheme } from "./context/ThemeContext";
import InputTask from "./ImputTask";

function TasksContainer({ tasks, onDelete, onComplete, onMove }) {
  const { isDark } = useTheme();

  let isEmpty = tasks.length === 0;

  return (
    <div
      className={`  rounded-md flex flex-col gap-2 overflow-auto text-sm p-3`}
    >
      {isEmpty ? (
        <div
          className={`${isDark ? "text-white bg-slate-700" : "text-black bg-gray-200"} p-2 rounded-md`}
        >
          Nothing Here
        </div>
      ) : (
        tasks.map((task) => {
          return (
            <div
              key={task._id}
              className={`group flex items-center gap-2 shadow p-1 rounded-md transition-all delay-75 hover:scale-102 hover:cursor-pointer ${isDark ? "bg-slate-700 " : "bg-gray-200 text-black"}`}
            >
              <div
                className={`  group-hover:grid rounded-full border-2  transition-all delay-75 size-4 place-content-center hover:scale-120 active:scale-200 ${isDark ? "border-white" : "border-purple-600"}
                ${task.completed ? "bg-blue-500 grid" : "bg-white hidden"}`}
                onClick={() => onComplete(task._id)}
              >
                {task.completed && <img src={checkIcon} alt="" />}
              </div>
              <h1
                className={`transition-all delay-100 ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                {task.text}
              </h1>
              <div className="flex justify-between items-center gap-4 ml-auto ">
                <img
                  src={isDark ? crossIconDark : crossIcon}
                  alt=""
                  className="size-3 hover:scale-140"
                  onClick={() => onDelete(task._id)}
                />
                <img
                  src={isDark ? editDark : edit}
                  alt=""
                  className={`size-4 hover:scale-140 ${task.completed ? "invisible" : ""}`}
                />
                {onMove && (
                  <button onClick={() => onMove(task._id)}>&gt;</button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TasksContainer;
