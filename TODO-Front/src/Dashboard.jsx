import { useState, useEffect } from "react";
import "./App.css";
import api from "./api/api";
import InputTask from "./ImputTask";
import TasksContainer from "./TasksContainer";
import TaskFilters from "./TaskFilters";
import { useTheme } from "./context/ThemeContext";
import KanbanBoard from "./KanbanBoard";
import Login from "./pages/login/Login";

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
      className={`min-h-full transition-all delay-75 text-sm
      md:text-2xl bg-no-repeat bg-cover  relative flex flex-col 
        ${isDark ? "bg-slate-900 bgImgMobNight md:bgImgDeskNight bg-bottom " : "bgImgMobDay md:bgImgDeskDay bg-bottom"}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-gray-400 to-gray-300 opacity-30"></div>
      <InputTask />
      <KanbanBoard
        tasks={tasks}
        onDelete={deleteTask}
        onComplete={markComplete}
        onMove={moveTask}
      />
    </div>
  );
}
