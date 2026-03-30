import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreatorForm from "./CreatorForm";

function NewList({ onCreate }) {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div onClick={() => setClicked(!clicked)}>
      {clicked ? (
        <CreatorForm
          setOpen={setClicked}
          value={title}
          setValue={setTitle}
          placeholder={"New List"}
          onSubmit={onCreate}
          submitLabel="Add"
        />
      ) : (
        <button
          className="flex  items-center gap-2 hover:cursor-pointer bg-gray-400/10 backdrop-blur-lg px-2 py-1 min-w-60 rounded-md"
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
