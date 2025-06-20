"use client";

import { ThemeContext } from "@/lib/ThemeProvider";
import { useContext } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ToggleBtn = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      title="theme"
      onClick={toggleTheme}
      className={`flex justify-center items-center text-text cursor-pointer transition-all duration-300 p-3 rounded bg-[#E0DFFF] dark:bg-[#4F4D6F] hover:bg-[#E0DFFF] dark:hover:bg-[#4F4D6F] `}
    >
      {theme === "light" ? (
        <IoMoonOutline size={22} />
      ) : (
        <IoSunnyOutline size={22} />
      )}
    </button>
  );
};

export default ToggleBtn;
