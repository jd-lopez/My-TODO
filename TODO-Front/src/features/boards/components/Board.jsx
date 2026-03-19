import React from "react";
import { useEffect, useState } from "react";
import Dashboard from "../../../pages/Dashboard";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import ListInput from "./NewList";
import BoardHeader from "./BoardHeader";
import NewList from "./NewList";
import NewTask from "./NewTask";
import List from "./List";
import { useTheme } from "../../../context/ThemeContext";

function Board() {
  const [board, setBoard] = useState();
  const [tasks, setTasks] = useState([]);
  const { isDark } = useTheme();
  const { id } = useParams();

  useEffect(() => {
    async function loadBoard() {
      try {
        const res = await api.get(`/board/${id}`);
        setBoard(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadBoard();
  }, [id]);

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
      className="h-screen bg-cover"
      style={{ backgroundImage: `url(${board?.background})` }}
    >
      <BoardHeader title={board?.title} />
      <div id="board-canvas" className="flex items-start">
        <List tasks={tasks} onCreate={createTask} />
        <NewList tasks={tasks} />
      </div>
    </div>
  );
}

export default Board;
