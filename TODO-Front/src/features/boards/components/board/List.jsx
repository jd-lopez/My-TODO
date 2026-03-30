import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TasksContainer from "./TasksContainer";
import { useTheme } from "../../../../context/ThemeContext";
import NewTask from "../forms/NewTask";
import { AnimatePresence, motion } from "motion/react";
import ListOptionModal from "../modals/ListOptionModal";

function List({
  tasks,
  onCreate,
  list,
  board,
  onDeleteTask,
  onComplete,
  onDeleteList,
  onAddDescription,
  onUpdateTitle,
}) {
  const { isDark } = useTheme();
  const [currentList, setCurrentList] = useState();
  const [listActionModal, setListActionModal] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className={` min-h-0 flex flex-col gap-1 rounded-md p-2 min-w-68 w-72 ${isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} `}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="relative flex justify-between">
          <h1 className="font-semibold">{list.title}</h1>
          <div>
            <button
              onClick={() => {
                setCurrentList(list);

                setListActionModal(!listActionModal);
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>

            <AnimatePresence>
              {listActionModal && currentList && (
                <>
                  <div
                    className={`fixed z-10 top-18 bottom-0 left-0 right-0 ${isDark ? "bg-black/05" : "bg-gray-500/20"}`}
                    onClick={() => setListActionModal(false)}
                  ></div>
                  <motion.div
                    intial={{
                      opacity: 0,
                      y: -20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <ListOptionModal
                      onCloseModal={setListActionModal}
                      onDeleteList={onDeleteList}
                      boardId={board._id}
                      listId={list._id}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <TasksContainer
          tasks={tasks}
          list={list}
          board={board}
          onDeleteTask={onDeleteTask}
          onComplete={onComplete}
          onAddDescription={onAddDescription}
          onUpdateTitle={onUpdateTitle}
        />

        <NewTask onCreate={onCreate} />
      </motion.div>
    </AnimatePresence>
  );
}

export default List;
