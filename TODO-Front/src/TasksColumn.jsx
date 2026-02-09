import React from "react";
import TasksContainer from "./TasksContainer";

function TasksColumn({ title, tasks, onDelete, onComplete, onMove }) {
  return (
    <div className="bg-white flex flex-col p-2 min-h-0 rounded-md text-black">
      <div>{title}</div>
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
