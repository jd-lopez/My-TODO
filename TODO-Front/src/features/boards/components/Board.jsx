import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

function Board() {
  const [board, setBoard] = useState(null);
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
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-200">
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
    </div>
  );
}

export default Board;
