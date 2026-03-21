import React from "react";
import { useState } from "react";
import TasksContainer from "./TasksContainer";
import { useTheme } from "../../../context/ThemeContext";
import NewTask from "./NewTask";

function List({ tasks, onCreate, list, board }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-0 flex flex-col gap-1 rounded-md p-2 min-w-68 w-72 ${isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} `}
    >
      <h1>{list.title}</h1>

      <TasksContainer tasks={tasks} list={list} board={board} />

      <NewTask onCreate={onCreate} />
    </div>
  );
}

export default List;
