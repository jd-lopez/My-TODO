import React from "react";

export default function BoardHeader({ title }) {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-400/20 backdrop-blur-2xl shadow-md">
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
            Start
          </button>
          <button className="px-1 cursor-pointer hover:bg-blue-200">
            Member
          </button>
          <button className="px-1 cursor-pointer hover:bg-blue-200">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
