import { useNavigate, useOutletContext } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SharedBoards from "./SharedBoards";

export default function Home() {
  const { isDark } = useTheme();
  const [boards, setBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const { showModal, setShowModal } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/boards").then((res) => {
      console.log(res.data);
      setBoards(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/boards/shared").then((res) => {
      setSharedBoards(res.data);
    });
  });

  const handleDelete = async (boardId) => {
    try {
      await api.delete(`/boards/${boardId}`);
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board._id !== boardId),
      );
    } catch (err) {
      console.error("Error deleting board:", err);
    }
  };

  return (
    <section
      className={`h-full min-h-0 flex flex-col ${
        isDark ? "bg-gray-800 text-white" : "bg-slate-200 text-slate-900"
      }`}
    >
      <div
        className={`m-4 flex  min-h-0 flex-1 flex-col px-4 py-4 rounded-md ${isDark ? "bg-gray-700" : "bg-white"}`}
      >
        <div className="flex-1">
          <h1 className="text-2xl w-fit mb-4 font-bold bg-linear-to-r from-blue-800 to-cyan-300  bg-clip-text text-transparent">
            My Boards
          </h1>

          {/*Board list container */}
          <div className="flex items-center flex-1 min-h-0 overflow-y-auto pr-1">
            <div
              className={`flex size-28 flex-col items-center justify-center gap-2 rounded-2xl shadow-xl cursor-pointer ${isDark ? "border-blue-600 border bg-slate-500" : "border-gray-300 border"}`}
              onClick={() => setShowModal((prev) => !prev)}
            >
              <button
                className={`rounded-full p-1 grid items-center border border-black ${isDark ? "border-blue-600 hover:bg-slate-800 " : "border-gray-300 hover:bg-gray-100 w"}`}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className={` ${isDark ? "text-blue-600" : "text-black"}`}
                />
              </button>
              <p className="text-sm text-center">Create a new board</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-4 p-4">
              {boards.length > 0 && (
                <>
                  {boards.map((board) => {
                    return (
                      <motion.div
                        className={`relative flex flex-col rounded-2xl shadow-xl justify-between h-46 ${isDark ? "bg-gray-500 text-white" : ""}`}
                        key={board._id}
                        onClick={() => {
                          navigate(`/app/boards/myboards/${board._id}`);
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
        </div>

        <div className="flex-1 mt-4">
          <SharedBoards boards={sharedBoards} />
        </div>
      </div>
    </section>
  );
}
