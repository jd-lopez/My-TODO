import { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

function TaskModal({
  onClose,
  task,
  list,
  board,
  onComplete,
  onAddDescription,
}) {
  const { isDark } = useTheme();
  const [description, setDescription] = useState(task.description);

  function onSubmit(e) {
    e.preventDefault();
    onAddDescription(description, list._id, task._id);
  }

  return (
    <motion.div
      className="fixed top-17 z-50 left-5 right-5 md:top-19 md:left-28 md:right-22"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <dialog
        open
        className={` w-full py-6 rounded-md ${isDark ? "bg-slate-700 text-white" : ""}`}
      >
        <div className="flex justify-between px-4  ">
          <div className="flex flex-col gap-1 ">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(board._id, list._id, task._id, task.completed);
                }}
                className={` grid  rounded-full border-2  transition-all delay-75 size-4 place-content-center hover:scale-120 active:scale-200  ${isDark ? "border-white" : "border-purple-600"}
                                    `}
              >
                {task.completed && <FontAwesomeIcon icon={faCircleCheck} />}
              </button>
              <h1 className="text-2xl">{task.title}</h1>
            </div>
            <h1 className="text-blue-600">{board.title}</h1>
            <h1 className="text-sm text-gray-400">in {list.title}</h1>
          </div>
          <div>
            <FontAwesomeIcon icon={faXmark} onClick={onClose} />
          </div>
        </div>

        <hr className="w-full border border-gray-500" />

        <div className="flex justify-between py-4 px-4">
          <div className="flex-3">
            <form className="flex justify-between" onSubmit={onSubmit}>
              <div className="flex flex-3 flex-col">
                <label htmlFor="description">Description</label>
                <textarea
                  className="border"
                  name="description"
                  id="description"
                  cols="2"
                  rows="3"
                  placeholder="Add a description to this task"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex-2 flex gap-2">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>

          <div className="flex-1">
            <div>
              <h1>Members</h1>
            </div>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
}

export default TaskModal;
