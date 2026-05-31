import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { motion } from "motion/react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function SharedBoards({ boards }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div>
      <h1 className="text-2xl w-fit mb-4 font-bold bg-linear-to-r from-blue-800 to-cyan-300  bg-clip-text text-transparent">
        Boards shared with me
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-6 ">
        {boards.length > 0 && (
          <>
            {boards.map((board) => {
              return (
                <motion.div
                  to="/app/boards/:boardId"
                  className={`relative flex flex-col rounded-2xl shadow-xl justify-between h-46 ${isDark ? "bg-gray-500 text-white" : ""}`}
                  key={board._id}
                  onClick={() => {
                    navigate(`/app/boards/shared/${board._id}`);
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{
                    y: -4,
                    scale: 1.1,
                    boxShadow: "0 0 10px 2px lightblue",
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <img
                    src={board.background}
                    alt=""
                    className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
                  />
                  <h2
                    className={`text-lg font-semibold p-2 rounded-b-2xl ${isDark ? "bg-gray-600 " : "bg-white"}`}
                  >
                    {board.title}
                  </h2>

                  <button
                    className="absolute top-2 right-2 bg-white rounded-full grid place-content-center p-2"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleDelete(board._id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={`text-red-600 focus:animate-bounce`}
                    />
                  </button>
                </motion.div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
