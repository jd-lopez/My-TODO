import React from "react";
import { useEffect, useState } from "react";
import Dashboard from "../../../pages/Dashboard";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import ListInput from "./ListInput";

function Board() {
  const [board, setBoard] = useState();
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

  return (
    <div
      className="h-screen bg-cover"
      style={{ backgroundImage: `url(${board?.background})` }}
    >
      <div className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-2xl shadow-md">
        <div>
          <h1>{board?.title}</h1>
        </div>
        <div>
          <button className="px-1 cursor-pointer hover:bg-blue-200">
            Account
          </button>
          <button className="px-1 cursor-pointer hover:bg-blue-200">
            Filters
          </button>
          <button className="px-1 cursor-pointer hover:bg-blue-200">
            Start
          </button>
          <button className="px-1 cursor-pointer hover:bg-blue-200">
            Member
          </button>
          <button className="px-1 cursor-pointer hover:bg-blue-200">
            Share
          </button>
        </div>
      </div>

      <div>
        <ListInput />
      </div>
    </div>
  );
}

export default Board;
