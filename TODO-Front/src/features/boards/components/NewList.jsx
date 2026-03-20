import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CreatorForm } from "./CreatorForm";

function NewList({ onCreate }) {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div onClick={() => setClicked(!clicked)}>
      {clicked ? (
        <CreatorForm
          setClicked={setClicked}
          title={title}
          setTitle={setTitle}
          placeholder={"New List"}
          onCreate={onCreate}
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

export default NewList;
