import TasksColumn from "./TasksColumn";

function KanbanBoard({ tasks, onDelete, onComplete, onMove, onCreate }) {
  const todoTasks = tasks.filter((t) => (t.status ?? "todo") === "todo");
  const doingTasks = tasks.filter((t) => t.status === "doing");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="flex-1 min-h-0 overflow-x-auto p-2 md:p-3">
      <div className="grid  min-h-0 grid-cols-1 gap-3 md:grid-cols-3 md:items-start">
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
    </div>
  );
}

export default KanbanBoard;
