import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function BoardHeader({ title, shareModal, setShareModal }) {
  return (
    <div className="flex justify-between items-center  p-4 z-50 bg-white/60 backdrop-blur-2xl shadow-md">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <button className="px-1 cursor-pointer hover:bg-blue-200">
          Account
        </button>
        <button className="px-1 cursor-pointer hover:bg-blue-200">
          Filters
        </button>

        <button className="px-1 cursor-pointer hover:bg-blue-200">
          Member
        </button>
        <button
          className="px-1 cursor-pointer flex  gap-2 hover:bg-blue-200"
          onClick={() => setShareModal(!shareModal)}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
