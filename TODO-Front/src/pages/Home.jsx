import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import api from "../services/api";

export default function Home() {
  const { isDark } = useTheme();
  const [boards, setBoards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/boards").then((res) => {
      console.log(res.data);
      setBoards(res.data);
    });
  }, []);
  return (
    <section
      className={`h-full min-h-0 flex flex-col ${
        isDark ? "bg-gray-800 text-white" : "bg-slate-200 text-slate-900"
      }`}
    >
      <div
        className={`m-4 flex  min-h-0 flex-1 flex-col px-4 py-4 rounded-md ${isDark ? "bg-gray-700" : "bg-white"}`}
      >
        <h1 className="text-2xl w-fit mb-4 font-bold bg-linear-to-r from-blue-800 to-cyan-300  bg-clip-text text-transparent">
          My Boards
        </h1>

        {/*Board list container */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-4 p-4">
            {boards.length > 0 ? (
              <>
                {boards.map((board) => {
                  return (
                    <motion.div
                      to="/app/board"
                      className={`flex flex-col rounded-2xl shadow-sm justify-between h-46 ${isDark ? "bg-gray-500 text-white" : ""}`}
                      key={board._id}
                      onClick={() => {
                        navigate(`/app/board/${board._id}`);
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
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <div>No board yet</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
