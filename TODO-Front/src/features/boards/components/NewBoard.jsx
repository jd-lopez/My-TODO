import React from "react";
import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

export default function NewBoard({ showModal, onClose }) {
  const [title, setTitle] = useState("");
  const { user } = useAuth();
  const { isDark } = useTheme();

  const navigate = useNavigate();

  async function createBoard(title) {
    try {
      const res = await api.post("/board", { title, owner: user });
      const newBoard = res.data;
      onClose?.();
      navigate(`/app/board/${newBoard._id}`);
      console.log("Board created:", newBoard);
    } catch (err) {
      throw new Error("Error creating board: " + err.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createBoard(title);
  };

  return (
    <div className={`absolute top-17 z-50 right-46 md:top-19 md:right-62 `}>
      <dialog
        open
        className={`px-4 py-6 rounded-md ${isDark ? "bg-slate-700 text-white" : ""}`}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full gap-10"
        >
          <h1 className="self-center font-bold bg-linear-to-r from-blue-600 to-cyan-300 bg-clip-text text-transparent ">
            New Board
          </h1>

          <div>
            <label className="text-sm" htmlFor="board-title">
              Board Title
            </label>
            <input
              type="text"
              id="board-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md border-gray-500 "
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-blue-700"
            >
              Create
            </button>
            <button
              className="bg-red-500 rounded-md px-2 text-white font-bold cursor-pointer hover:bg-red-700"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
