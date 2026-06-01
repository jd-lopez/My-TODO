import { useTheme } from "../../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faList,
  faTasks,
  faUserPlus,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
  const { isDark } = useTheme();

  const card = (index, icon, title, text) => (
    <div
      className={`rounded-lg p-4 shadow-sm border ${
        isDark
          ? "bg-slate-800 border-slate-700 text-white"
          : "bg-white border-gray-200"
      }`}
      key={index}
    >
      <div className="flex items-start gap-3">
        <div className="flex-none">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-blue-500 text-white">
            <FontAwesomeIcon icon={icon} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm mt-1">{text}</p>
        </div>
      </div>
    </div>
  );

  const cards = [
    {
      icon: faLayerGroup,
      title: "Boards",
      text: "Top-level workspace. Create from Home; owners can invite members and manage settings.",
    },
    {
      icon: faList,
      title: "Lists",
      text: "Structure your board into lists (columns). Create lists to categorize workflows like To Do / In Progress / Done.",
    },
    {
      icon: faTasks,
      title: "Tasks",
      text: "Items inside lists. Give a title, optional description; mark complete. New tasks append to the list order.",
    },
    {
      icon: faUserPlus,
      title: "Sharing",
      text: "Owners invite collaborators by email. Members can view and modify lists and tasks according to permissions.",
    },
    {
      icon: faClock,
      title: "Activity Log",
      text: "Each task keeps an activity feed (creates/updates). Open a task to review who changed what and when.",
    },
  ];

  return (
    <section className="p-6 overflow-y-auto h-full">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}
        >
          How it works
        </h1>

        <p
          className={`mb-6 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}
        >
          Quick overview of the core concepts and collaborative flow in TODO.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, i) => card(i, c.icon, c.title, c.text))}
        </div>

        <div className="mt-8">
          <h2
            className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-black"}`}
          >
            Best practices
          </h2>
          <ul
            className={`list-disc pl-6 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}
          >
            <li>Keep lists focused (e.g., Backlog, In Progress, Done).</li>
            <li>Use clear task titles and add descriptions for context.</li>
            <li>
              Invite collaborators to the board rather than sharing credentials.
            </li>
            <li>Check the activity log when resolving conflicting changes.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
