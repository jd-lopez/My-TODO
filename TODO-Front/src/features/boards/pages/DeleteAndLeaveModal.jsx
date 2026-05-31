export default function DeleteAndLeaveBoardModal({
  board,
  onConfirm,
  onCancel,
  words,
}) {
  return (
    <div className="absolute top-1/2 left-5 transform  bg-white p-2 rounded-md shadow-lg z-10">
      <h1 className="text-sm">
        Are you sure you want to {words[0]} "{board.title}"?
      </h1>
      <div className="text-xs flex justify-end gap-6 mt-4">
        <button
          className="text-green-800 hover:text-green-700 hover:underline"
          onClick={onConfirm}
        >
          Yes, {words[0]}
        </button>
        <button
          className="text-red-800 hover:text-red-700 hover:underline"
          onClick={onCancel}
        >
          No, {words[1]}
        </button>
      </div>
    </div>
  );
}
