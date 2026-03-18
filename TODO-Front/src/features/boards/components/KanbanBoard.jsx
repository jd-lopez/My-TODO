import TasksColumn from "./TasksColumn";

function KanbanBoard({ tasks, onDelete, onComplete, onMove, onCreate }) {
  const todoTasks = tasks.filter((t) => (t.status ?? "todo") === "todo");

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
      </div>
    </div>
  );
}

export default KanbanBoard;
