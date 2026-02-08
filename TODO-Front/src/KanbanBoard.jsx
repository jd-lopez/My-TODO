import React from "react";
import TasksColumn from "./TasksColumn";

function KanbanBoard({
  todoTasks,
  doingTasks,
  doneTasks,
  onDelete,
  onComplete,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 min-h-0 m-2 items-start">
      <TasksColumn
        title={"To Do"}
        tasks={todoTasks}
        onDelete={onDelete}
        onComplete={onComplete}
      />
      <TasksColumn
        title={"To Do"}
        tasks={doingTasks}
        onDelete={onDelete}
        onComplete={onComplete}
      />
      <TasksColumn
        title={"To Do"}
        tasks={doneTasks}
        onDelete={onDelete}
        onComplete={onComplete}
      />
    </div>
  );
}

export default KanbanBoard;
