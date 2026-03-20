import React from "react";

export function CreatorForm({
  setClicked,
  title,
  setTitle,
  placeholder,
  onCreate,
}) {
  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title);
    setTitle("");
    setClicked(false);
  }

  return (
    <form
      className="flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
      onSubmit={submit}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
      />
      <div>
        <button
          className="rounded-md bg-blue-700 px-1 hover:cursor-pointer"
          type="submit"
        >
          Add
        </button>

        <button
          className="rounded-md bg-red-700 px-1 ml-2 hover:cursor-pointer"
          type="button"
          onClick={() => {
            setClicked(false);
            setTitle("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
