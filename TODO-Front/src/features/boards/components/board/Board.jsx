import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";
import BoardHeader from "./BoardHeader";
import NewList from "../forms/NewList";
import List from "./List";
import { AnimatePresence, motion } from "motion/react";
import MembersModal from "../modals/MembersModal";
import { useTheme } from "../../../../context/ThemeContext";

function Board() {
  const [board, setBoard] = useState();
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const { boardId } = useParams();

  const { isDark } = useTheme();

  useEffect(() => {
    async function loadBoard() {
      try {
        const res = await api.get(`/boards/${boardId}`);
        setBoard(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadBoard();
  }, [boardId]);

  useEffect(() => {
    async function loadLists() {
      try {
        const res = await api.get(`/boards/${boardId}/lists`);
        setLists(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadLists();
  }, [boardId]);

  useEffect(() => {
    async function loadTasks() {
      if (lists.length === 0) {
        setTasks([]);
        return;
      }

      try {
        const responses = await Promise.all(
          lists.map((list) =>
            api.get(`/boards/${boardId}/lists/${list._id}/tasks`),
          ),
        );
        setTasks(responses.flatMap((response) => response.data));
      } catch (error) {
        console.error(error);
      }
    }

    loadTasks();
  }, [boardId, lists]);

  async function createList(title) {
    try {
      const res = await api.post(`/boards/${boardId}/lists`, {
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
      const res = await api.post(`/boards/${boardId}/lists/${listId}/tasks`, {
        title,
      });
      const newTask = res.data;
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("This is the error: ", err);
    }
  }

  async function addDescription(description, listId, taskId) {
    try {
      const res = await api.patch(
        `/boards/${boardId}/lists/${listId}/tasks/${taskId}`,
        {
          description,
        },
      );
      const updatedTask = res.data;

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task)),
      );
    } catch (err) {
      console.error("This is the error: ", err);
    }
  }

  const updateTitle = async (title, listId, taskId) => {
    const res = await api.patch(
      `/boards/${boardId}/lists/${listId}/tasks/${taskId}`,
      {
        title,
      },
    );
    const updatedTask = res.data;

    setTasks((prev) =>
      prev.map((task) => (task._id === taskId ? updatedTask : task)),
    );
  };

  async function deleteTask(boardId, listId, taskId) {
    await api.delete(`/boards/${boardId}/lists/${listId}/tasks/${taskId}`);
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  }

  async function markComplete(boardId, listId, taskId, currentCompleted) {
    try {
      const res = await api.patch(
        `/boards/${boardId}/lists/${listId}/tasks/${taskId}`,
        {
          completed: !currentCompleted,
        },
      );
      const updatedTask = res.data;

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task)),
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteList(boardId, listId) {
    await api.delete(`/boards/${boardId}/lists/${listId}`);
    setLists((prev) => prev.filter((list) => list._id !== listId));
    setTasks((prev) => prev.filter((task) => String(task.list) !== listId));
  }

  async function shareBoard(email, role) {
    const boardId = board._id;
    try {
      const res = await api.post(`/boards/${boardId}/members`, {
        email,
        role,
      });
      setBoard(res.data);
    } catch (error) {
      console.error("Error sharing board:", error);
    }
  }

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${board?.background})` }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10">
        <BoardHeader
          className=""
          title={board?.title}
          shareModal={shareModal}
          setShareModal={setShareModal}
        />

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
                onDeleteTask={deleteTask}
                onComplete={markComplete}
                onDeleteList={deleteList}
                onAddDescription={addDescription}
                onUpdateTitle={updateTitle}
              />
            );
          })}
          <NewList onCreate={createList} />
        </div>
      </div>

      <AnimatePresence>
        {shareModal && (
          <>
            <motion.div
              key="share-backdrop"
              className={`fixed z-40 top-0 bottom-0 left-0 right-0 ${isDark ? "bg-black/40" : "bg-gray-500/20"}`}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => {
                setShareModal(false);
              }}
            />
            <MembersModal
              onClose={() => {
                setShareModal(false);
              }}
              board={board}
              onShare={shareBoard}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Board;
