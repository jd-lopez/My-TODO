import { useState } from "react";
import NewTask from "./NewTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CreatorForm } from "./CreatorForm";

function ListInput() {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");

  return (
    <div onClick={() => setClicked(!clicked)}>
      {clicked ? (
        <CreatorForm
          setClicked={setClicked}
          text={text}
          setText={setText}
          placeholder={"New List"}
        />
      ) : (
        <button
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={() => setClicked(true)}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="text-blue-700 hover:cursor-pointer"
          />
          <p>Add a list</p>
        </button>
      )}
    </div>
  );
}

export default ListInput;
