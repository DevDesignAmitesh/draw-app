"use client";

import { ThemeContext } from "@/lib/ThemeProvider";
import { useContext } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ToggleBtn = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex justify-center items-center rounded-full text-text cursor-pointer transition-all duration-300"
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
