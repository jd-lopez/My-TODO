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
      className="fixed top-17 z-50 left-5 right-5 md:top-19 md:min-w-90 md:w-230 mx-auto"
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
                {task.completed && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-cyan-500"
                  />
                )}
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

        <div className="flex flex-col justify-between py-4 px-4 md:flex-row">
          <div className="flex-2">
            <form
              className="flex justify-between flex-col gap-2"
              onSubmit={onSubmit}
            >
              <div className="flex flex-3 flex-col">
                <label htmlFor="description" className="mb-2">
                  Description
                </label>
                <textarea
                  className={`p-2 rounded-md resize-none mx-6 ${isDark ? "bg-slate-600 text-white" : "bg-gray-200"}`}
                  name="description"
                  id="description"
                  cols="2"
                  rows="3"
                  placeholder="Add a description to this task"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex-2 flex gap-2 ml-6 w-fit rounded-md bg-blue-600 px-2 py-0.5 text-white">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>

          <div className=" flex-1">
            <div className="flex flex-col">
              <h1>Members</h1>
              <div className="flex items-center mt-2">
                {board?.members.map((member) => {
                  const initials = `${member?.user?.name?.first?.[0] || ""}${
                    member?.user?.name?.last?.[0] || ""
                  }`.toUpperCase();
                  const name = `${member?.user?.name?.first || ""} ${
                    member?.user?.name?.last || ""
                  }`.trim();
                  return (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: member.color }}
                      key={member.user?._id}
                    >
                      {initials}
                    </div>
                  );
                })}

                <button>add </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
}

export default TaskModal;
