import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
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
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto flex w-full min-h-0 flex-1 flex-col px-4 py-8">
        <h1 className="text-2xl w-fit mb-4 font-bold bg-linear-to-r from-blue-800 to-cyan-300  bg-clip-text text-transparent">
          My Boards
        </h1>

        {/*Board list container */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {boards.length > 0 ? (
              <>
                {boards.map((board) => {
                  return (
                    <div
                      to="/app/board"
                      className={`flex flex-col rounded-2xl shadow-sm justify-between h-46 ${isDark ? "bg-gray-500 text-white" : ""}`}
                      key={board._id}
                      onClick={() => {
                        navigate(`/app/board/${board._id}`);
                      }}
                    >
                      <img
                        src="/images/sunset.jpg"
                        alt=""
                        className="rounded-tl-2xl rounded-tr-2xl h-3/4 object-cover"
                      />
                      <h2 className="text-lg font-semibold p-2">
                        {board.title}
                      </h2>
                    </div>
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
