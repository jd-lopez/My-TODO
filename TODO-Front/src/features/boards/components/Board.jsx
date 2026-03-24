import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import BoardHeader from "./BoardHeader";
import NewList from "./NewList";
import List from "./List";
import { motion } from "motion/react";

function Board() {
  const [board, setBoard] = useState();
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
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
    async function loadLists() {
      try {
        const res = await api.get(`/board/${id}/lists`);
        setLists(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadLists();
  }, [id]);

  useEffect(() => {
    async function loadTasks() {
      if (lists.length === 0) {
        setTasks([]);
        return;
      }

      try {
        const responses = await Promise.all(
          lists.map((list) => api.get(`/board/${id}/lists/${list._id}/tasks`)),
        );
        setTasks(responses.flatMap((response) => response.data));
      } catch (error) {
        console.error(error);
      }
    }

    loadTasks();
  }, [id, lists]);

  async function createList(title) {
    try {
      const res = await api.post(`/board/${id}/lists`, {
        title,
      });
      const newList = res.data;
      setLists((prev) => [...prev, newList]);
    } catch (err) {
      throw new Error("This is the error", err.message);
    }
  }

  async function createTask(title, listId) {
    try {
      const res = await api.post(`/board/${id}/lists/${listId}/tasks`, {
        title,
      });
      const newTask = res.data;
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("This is the error: ", err);
    }
  }

  async function deleteTask(boardId, listId, taskId) {
    await api.delete(`boards/${boardId}/lists/${listId}/tasks/${taskId}`);
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  }

  async function markComplete(boardId, listId, taskId) {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );

    try {
      await api.patch(`boards/${boardId}/lists/${listId}/tasks/${taskId}`);
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
      <div
        id="board-canvas"
        className="flex items-start gap-3 p-4 overflow-x-auto h-108"
      >
        {lists.map((list) => {
          return (
            <List
              key={list._id}
              onCreate={(title) => createTask(title, list._id)}
              tasks={tasks.filter((task) => String(task.list) === list._id)}
              list={list}
              board={board}
              onDelete={deleteTask}
              onComplete={markComplete}
            />
          );
        })}
        <NewList onCreate={createList} />
      </div>
    </div>
  );
}

export default Board;
