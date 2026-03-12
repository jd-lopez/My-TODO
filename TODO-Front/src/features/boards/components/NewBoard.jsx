import React from "react";
import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function NewBoard({ onClose }) {
  const [title, setTitle] = useState("");
  const { user } = useAuth();

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
    // TODO: Implement board creation logic here
    createBoard(title);
  };

  return (
    <div className="fixed top-20 right-10">
      <div className="bg-white rounded-md shadow-lg w-60 max-w-md">
        <dialog open className="w-full">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full gap-10"
          >
            <h1>New Board</h1>

            <div>
              <label htmlFor="board-title">Board Title</label>
              <input
                type="text"
                id="board-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md border-gray-500 "
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white rounded-md px-2 py-1 font-bold cursor-pointer"
            >
              Create
            </button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
