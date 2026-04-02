import { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";

function MembersModal({ board, onShare }) {
  const { isDark } = useTheme();
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState("member");

  async function onSubmit(e) {
    e.preventDefault();
    await onShare(memberEmail, memberRole);
    setMemberEmail("");
    setMemberRole("member");
  }

  return (
    <div className="fixed top-18 z-50 inset-x-4 md:top-19 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xl">
      <dialog
        open
        className={`w-full max-h-[calc(100vh-6rem)] overflow-y-auto px-4 py-4 rounded-md flex flex-col gap-4 shadow-md ${
          isDark ? "bg-slate-800 text-white" : ""
        }`}
      >
        <h1 className="text-lg font-semibold">Share Board</h1>
        <form action="" className="flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter email or name"
            className="border rounded-md px-2 py-2 flex-1 min-w-0"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />

          <select
            name="role"
            id="role"
            className="rounded-md border px-2 py-2 sm:w-fit"
            value={memberRole}
            onChange={(e) => setMemberRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin" disabled>
              Admin
            </option>
          </select>

          <button type="submit" className="actionButton w-full sm:w-fit">
            Share
          </button>
        </form>

        <hr
          className={`border-t my-8 ${
            isDark ? "border-gray-400" : "bg-slate-800"
          }`}
        />

        <div>
          <h1>Board Members</h1>
          <hr
            className={`border-t ${
              isDark ? "border-gray-400" : "bg-slate-800"
            }`}
          />

          <div className="space-y-2">
            {board?.members.map((member) => {
              const initials = `${member?.user?.name?.first?.[0] || ""}${
                member?.user?.name?.last?.[0] || ""
              }`.toUpperCase();
              const name = `${member?.user?.name?.first || ""} ${
                member?.user?.name?.last || ""
              }`.trim();

              return (
                <div
                  key={member._id || member.user?._id}
                  className="flex items-center gap-3 py-2 min-w-0"
                >
                  <button
                    className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white"
                    style={{ backgroundColor: member.color || "#475569" }}
                  >
                    {initials || "U"}
                  </button>
                  <div className="min-w-0">
                    <p className="truncate">{name || member.user?.email}</p>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default MembersModal;
