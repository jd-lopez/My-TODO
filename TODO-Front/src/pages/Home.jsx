import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const { user } = useAuth();
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
      className={`min-h-full  ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className=" mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-4">My Boards</h1>

        {/*Board list container */}
        <div className="grid grid-cols-4 gap-2">
          {boards.length > 0 ? (
            <>
              {boards.map((board) => {
                return (
                  <div
                    to="/app/board"
                    className={`flex flex-col rounded-2xl shadow-sm justify-between h-46 max-w-60 ${isDark ? "bg-gray-500 text-white" : ""}`}
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
                    <h2 className="text-lg font-semibold p-2">{board.title}</h2>
                  </div>
                );
              })}
            </>
          ) : (
            <div>No board yet</div>
          )}
        </div>
      </div>
    </section>
  );
}
