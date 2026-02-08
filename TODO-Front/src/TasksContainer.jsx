import TaskFilters from "./TaskFilters";
import crossIcon from "./assets/icon-cross.svg";
import crossIconDark from "./assets/icon_cross_dark.svg";
import edit from "./assets/pencil.svg";
import editDark from "./assets/pencil_dark.svg";
import checkIcon from "./assets/icon-check.svg";
import { useTheme } from "./ThemeContext";
import InputTask from "./ImputTask";

function TasksContainer({ tasks, onDelete, onComplete }) {
  const { isDark } = useTheme();

  let isEmpty = tasks.length === 0;

  return (
    <div
      className={`m-2  rounded-md flex flex-col w-1/4 p-2 gap-2 shadow overflow-auto ${isDark ? "bg-black/50 backdrop-blur-2xl" : "bg-white"}`}
    >
      {isEmpty ? (
        <div className="h-fit">Nothing Here</div>
      ) : (
        tasks.map((task) => {
          return (
            <div
              key={task._id}
              className="flex items-center justify-between px-4 py-1  rounded-xl "
            >
              <div
                className={` rounded-full border-2  transition-all delay-75 size-4 grid place-content-center hover:scale-120 active:scale-200 ${isDark ? "border-white" : "border-purple-600"}
                ${task.completed ? "bg-blue-500" : "bg-white"}`}
                onClick={() => onComplete(task._id)}
              >
                {task.completed && <img src={checkIcon} alt="" />}
              </div>
              <h1
                className={`transition-all delay-100 ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                {task.text}
              </h1>
              <div className="flex justify-between items-center gap-4 ">
                <img
                  src={isDark ? crossIconDark : crossIcon}
                  alt=""
                  className="size-3 hover:scale-140"
                  onClick={() => onDelete(task._id)}
                />
                <img
                  src={isDark ? editDark : edit}
                  alt=""
                  className="size-4 hover:scale-140"
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TasksContainer;
