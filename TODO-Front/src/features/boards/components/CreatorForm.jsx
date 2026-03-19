import React from "react";

export function CreatorForm({
  setClicked,
  text,
  setText,
  onSubmit,
  placeholder,
}) {
  return (
    <form
      className="flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
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
            setText("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
