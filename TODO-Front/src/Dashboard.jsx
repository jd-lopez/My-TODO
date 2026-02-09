import { useState, useEffect } from "react";
import "./App.css";
import api from "./api/api";
import InputTask from "./ImputTask";
import TasksContainer from "./TasksContainer";
import TaskFilters from "./TaskFilters";
import { useTheme } from "./ThemeContext";
import KanbanBoard from "./KanbanBoard";

export default function Dashboard() {
  const FILTER_KEY = "todo_filter";

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem(FILTER_KEY) || "all";
  });
  const { isDark } = useTheme();

  useEffect(() => {
    api.get("/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  async function createTask(text) {
    const res = await api.post("/tasks", { text });

    const newTask = res.data;

    setTasks((prev) => [...prev, newTask]);
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  async function markComplete(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task,
      ),
    );

    try {
      await api.patch(`/tasks/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  //filter logic

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, filter);
  }, [filter]);

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;

    return true; //all
  });

  async function moveTask(id, status) {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
    await api.patch(`/tasks/${id}`, { status });
  }

  return (
    <div
      className={`h-screen transition-all delay-75 text-sm
      md:text-2xl bg-no-repeat bg-cover  flex flex-col 
        ${isDark ? "bg-slate-900 bgImgMobNight md:bgImgDeskNight bg-bottom " : "bgImgMobDay md:bgImgDeskDay bg-bottom"}`}
    >
      <InputTask createTask={createTask} />
      <KanbanBoard
        tasks={tasks}
        onDelete={deleteTask}
        onComplete={markComplete}
        onMove={moveTask}
      />
    </div>
  );
}
