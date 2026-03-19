import { useState, useEffect } from "react";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  return (
    <div
      className={` transition-all delay-75 text-sm
      md:text-2xl bg-no-repeat bg-cover relative flex h-full min-h-0 flex-col overflow-hidden
        ${isDark ? "bg-slate-900 bgImgMobNight md:bgImgDeskNight bg-bottom " : "bgImgMobDay md:bgImgDeskDay bg-bottom"}`}
    ></div>
  );
}
