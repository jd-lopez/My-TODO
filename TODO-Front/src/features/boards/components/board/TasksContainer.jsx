import { useState } from "react";
import TaskModal from "../modals/TaskModal";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useTheme } from "../../../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import CreatorForm from "../forms/CreatorForm";

function TasksContainer({
  tasks,
  list,
  board,
  onDeleteTask,
  onComplete,
  onAddDescription,
  onUpdateTitle,
}) {
  const { isDark } = useTheme();
  const [taskModal, setTaskModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const currentTask = tasks.find((task) => task._id === selectedTaskId);

  let isEmpty = tasks.length === 0;

  return (
    <div className=" max-h-60 overflow-y-auto rounded-md text-sm">
      {isEmpty ? (
        ""
      ) : (
        <div className="flex flex-col gap-2 p-2">
          <AnimatePresence>
            {tasks.map((task) => {
              const isEditing = editingTaskId === task._id;

              return (
                <motion.div
                  key={task._id}
                  className={`group overflow-hidden flex items-center justify-between gap-2 shadow p-1 rounded-md transition-all delay-75 hover:scale-102 hover:cursor-pointer ${isDark ? "bg-slate-700 " : "bg-gray-200 text-black"}`}
                  onClick={() => {
                    if (isEditing) return;
                    setSelectedTaskId(task._id);
                    setTaskModal(true);
                  }}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {!isEditing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onComplete(
                          board._id,
                          list._id,
                          task._id,
                          task.completed,
                        );
                      }}
                      className={`  group-hover:grid rounded-full border-2  transition-all delay-75 size-4 place-content-center hover:scale-120 active:scale-200  ${isDark ? "border-white" : "border-purple-600"}
                      ${task.completed ? " grid" : "md:hidden"}`}
                    >
                      {task.completed && (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="text-cyan-500"
                        />
                      )}
                    </button>
                  )}
                  {isEditing ? (
                    <div className="flex-1">
                      <CreatorForm
                        setOpen={() => {
                          setEditingTaskId(null);
                          setEditingTitle("");
                        }}
                        value={editingTitle}
                        setValue={setEditingTitle}
                        placeholder="Edit task title"
                        onSubmit={(title) =>
                          onUpdateTitle(title, list._id, task._id)
                        }
                        submitLabel="Save"
                        clearOnSubmit={false}
                      />
                    </div>
                  ) : (
                    <h1
                      className={`transition-all w-44 text-justify delay-100 ${task.completed ? "line-through text-gray-400" : ""}`}
                    >
                      {task.title ?? task.text}
                    </h1>
                  )}
                  {!isEditing && (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTaskId(task._id);
                          setEditingTitle(task.title ?? task.text ?? "");
                        }}
                        className={`${task.completed ? "hidden" : "block"}`}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                    </div>
                  )}
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
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => {
                setTaskModal(false);
                setSelectedTaskId(null);
              }}
            />
            <TaskModal
              onClose={() => {
                setTaskModal(false);
                setSelectedTaskId(null);
              }}
              task={currentTask}
              list={list}
              board={board}
              onComplete={onComplete}
              onAddDescription={onAddDescription}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TasksContainer;
