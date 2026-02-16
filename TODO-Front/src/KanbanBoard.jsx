import React from "react";
import TasksColumn from "./TasksColumn";

function KanbanBoard({ tasks, onDelete, onComplete, onMove, onCreate }) {
  const todoTasks = tasks.filter((t) => (t.status ?? "todo") === "todo");
  const doingTasks = tasks.filter((t) => t.status === "doing");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 min-h-0 m-2 items-start z-10">
      <TasksColumn
        title={"To Do"}
        tasks={todoTasks}
        onDelete={onDelete}
        onComplete={onComplete}
        onMove={onMove}
        onCreate={onCreate}
      />
      <TasksColumn
        title={"Doing"}
        tasks={doingTasks}
        onDelete={onDelete}
        onComplete={onComplete}
      />
      <TasksColumn
        title={"Done"}
        tasks={doneTasks}
        onDelete={onDelete}
        onComplete={onComplete}
      />
    </div>
  );
}

export default KanbanBoard;
