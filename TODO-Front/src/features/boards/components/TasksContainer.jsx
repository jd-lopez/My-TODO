import { useState } from "react";
import TaskModal from "./TaskModal";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useTheme } from "../../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

function TasksContainer({ tasks, list, board, onDeleteTask, onComplete }) {
  const { isDark } = useTheme();
  const [taskModal, setTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState();

  let isEmpty = tasks.length === 0;

  return (
    <div className=" max-h-60 overflow-y-auto rounded-md text-sm">
      {isEmpty ? (
        ""
      ) : (
        <div className="flex flex-col gap-2 p-2">
          <AnimatePresence>
            {tasks.map((task) => {
              return (
                <motion.div
                  key={task._id}
                  className={`group overflow-hidden flex items-center justify-between gap-2 shadow p-1 rounded-md transition-all delay-75 hover:scale-102 hover:cursor-pointer ${isDark ? "bg-slate-700 " : "bg-gray-200 text-black"}`}
                  onClick={() => {
                    setCurrentTask(task);
                    setTaskModal(true);
                  }}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onComplete(board._id, list._id, task._id);
                    }}
                    className={`  group-hover:grid rounded-full border-2  transition-all delay-75 size-4 place-content-center hover:scale-120 active:scale-200  ${isDark ? "border-white" : "border-purple-600"}
                      ${task.completed ? " grid" : "md:hidden"}`}
                  >
                    {task.completed && <FontAwesomeIcon icon={faCircleCheck} />}
                  </button>
                  <h1
                    className={`transition-all w-44 text-justify delay-100 ${task.completed ? "line-through text-gray-400" : ""}`}
                  >
                    {task.title ?? task.text}
                  </h1>
                  <div className="flex justify-end items-center gap-2  w-14 ">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(board._id, list._id, task._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className={`${task.completed ? "hidden" : "block"}`}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {taskModal && currentTask && (
          <>
            <motion.div
              key="task-backdrop"
              className={`fixed z-40 top-0 bottom-0 left-0 right-0 ${isDark ? "bg-black/40" : "bg-gray-500/20"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setTaskModal(false)}
            />
            <TaskModal
              onClose={() => setTaskModal(false)}
              task={currentTask}
              list={list}
              board={board}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TasksContainer;
