import { useState, useEffect } from "react";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
import KanbanBoard from "../features/boards/components/KanbanBoard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { isDark } = useTheme();

  useEffect(() => {
    api.get("/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  async function createTask(text) {
    try {
      const res = await api.post("/tasks", { text });
      const newTask = res.data;
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("This is the error: ", err);
    }
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

  async function moveTask(id, status) {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
    await api.patch(`/tasks/${id}`, { status });
  }

  return (
    <div
      className={`min-h-full transition-all delay-75 text-sm
      md:text-2xl bg-no-repeat bg-cover relative flex h-full min-h-0 flex-col overflow-hidden
        ${isDark ? "bg-slate-900 bgImgMobNight md:bgImgDeskNight bg-bottom " : "bgImgMobDay md:bgImgDeskDay bg-bottom"}`}
    >
      <KanbanBoard
        tasks={tasks}
        onDelete={deleteTask}
        onComplete={markComplete}
        onMove={moveTask}
        onCreate={createTask}
      />
    </div>
  );
}
