import { useTheme } from "../../../../context/ThemeContext";

export default function CreatorForm({
  setOpen,
  value,
  setValue,
  placeholder,
  onSubmit,
  submitLabel = "Add",
  clearOnSubmit = true,
}) {
  const { isDark } = useTheme();
  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);

    if (clearOnSubmit) {
      setValue("");
    }

    setOpen(false);
  }

  return (
    <form
      className={`flex flex-col gap-2 ${isDark ? "bg-slate-900 text-white" : "bg-white text-black"} p-2 rounded-md`}
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-1 rounded-md border bg-gray-400/10 backdrop-blur-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
      />
      <div>
        <button
          className="rounded-md bg-blue-700 px-1 hover:cursor-pointer"
          type="submit"
        >
          {submitLabel}
        </button>

        <button
          className="rounded-md bg-red-700 px-1 ml-2 hover:cursor-pointer"
          type="button"
          onClick={() => {
            setOpen(false);
            setValue("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
