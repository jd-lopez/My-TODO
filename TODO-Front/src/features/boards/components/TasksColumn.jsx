import React from "react";
import TasksContainer from "./TasksContainer";
import { useTheme } from "../../../context/ThemeContext";
import NewTask from "./NewTask";

function TasksColumn({ title, tasks, onDelete, onComplete, onMove, onCreate }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-0 flex flex-col rounded-md p-2 ${isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} `}
    >
      <div className="shrink-0 p-2 font-bold">{title}</div>
      <TasksContainer
        tasks={tasks}
        onDelete={onDelete}
        onComplete={onComplete}
        onMove={onMove ? (id) => onMove(id, "doing") : undefined}
      />
      {onCreate && (
        <div className="shrink-0">
          <NewTask onCreate={onCreate} />
        </div>
      )}
    </div>
  );
}

export default TasksColumn;
