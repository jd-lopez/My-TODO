import React from "react";
import { useState } from "react";
import TasksContainer from "./TasksContainer";
import { useTheme } from "../../../context/ThemeContext";
import NewTask from "./NewTask";
import { AnimatePresence, motion } from "motion/react";

function List({ tasks, onCreate, list, board, onDelete, onComplete }) {
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        className={`min-h-0 flex flex-col gap-1 rounded-md p-2 min-w-68 w-72 ${isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} `}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <h1>{list.title}</h1>

        <TasksContainer
          tasks={tasks}
          list={list}
          board={board}
          onDelete={onDelete}
          onComplete={onComplete}
        />

        <NewTask onCreate={onCreate} />
      </motion.div>
    </AnimatePresence>
  );
}

export default List;
