import React from "react";
import TasksContainer from "./TasksContainer";
import { useTheme } from "./context/ThemeContext";

function TasksColumn({ title, tasks, onDelete, onComplete, onMove }) {
  const { isDark } = useTheme();
  return (
    <div
      className={`${isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} flex flex-col p-2 min-h-0 rounded-md`}
    >
      <div className="font-bold p-2">{title}</div>
      <>
        <TasksContainer
          tasks={tasks}
          onDelete={onDelete}
          onComplete={onComplete}
          onMove={(id) => onMove(id, "doing")}
        />
      </>
    </div>
  );
}

export default TasksColumn;
