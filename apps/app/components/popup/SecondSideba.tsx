import { ThemeContext } from "@/lib/ThemeProvider";
import React, { useContext, useEffect } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GoFileDirectory } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { LuGithub } from "react-icons/lu";
import {
  MdOutlineDeleteOutline,
  MdOutlineFileDownload,
  MdOutlineHelpOutline,
  MdOutlineLogout,
} from "react-icons/md";
import { SiExcalidraw } from "react-icons/si";

interface SecondSidebarItems {
  onClick: () => void;
  icon: React.ReactElement;
  text: string;
  shortCut?: string;
}

const SecondSideba = ({
  onClick,
  saveClick,
}: {
  onClick: () => void;
  saveClick: () => void;
}) => {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Escape") {
        onClick();
      }
    };

    window.addEventListener("keydown", fn);

    return () => {
      window.removeEventListener("keydown", fn);
    };
  }, []);

  const SecondSidebarItems: SecondSidebarItems[] = [
    {
      onClick: () => {},
      icon: <GoFileDirectory />,
      text: "Open",
    },
    {
      onClick: saveClick,
      icon: <MdOutlineFileDownload />,
      text: "Save",
      shortCut: "Ctrl + Shift + E",
    },
    {
      onClick: () => {},
      icon: <FiUsers />,
      text: "Collaboration",
    },
    {
      onClick: () => {},
      icon: <AiOutlineThunderbolt />,
      text: "Comand Palette",
      shortCut: "Ctrl + /",
    },
    {
      onClick: () => {},
      icon: <IoMdSearch />,
      text: "Comand Palette",
      shortCut: "Ctrl + F",
    },
    {
      onClick: () => {},
      icon: <MdOutlineHelpOutline />,
      text: "Comand Palette",
      shortCut: "?",
    },
    {
      onClick: () => {},
      icon: <MdOutlineDeleteOutline />,
      text: "Clear Canvas",
      shortCut: "?",
    },
    {
      onClick: () => {},
      icon: <SiExcalidraw />,
      text: "Excalidraw",
    },
    {
      onClick: () => {},
      icon: <LuGithub />,
      text: "Github",
    },
    {
      onClick: () => {},
      icon: <FaXTwitter />,
      text: "Follow Me",
    },
    {
      onClick: () => {},
      icon: <MdOutlineLogout />,
      text: "Sign up",
    },
  ];

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      onClick={onClick}
      className="fixed w-full h-screen bg-transparent top-0 bottom-0 left-0 right-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute left-5 top-20 w-[250px] rounded-xl dark:bg-[#232329] bg-white dark:text-[#D1D1E2] text-[#29294A] border border-neutral-600 p-2 flex flex-col justify-start items-start shadow-lg"
      >
        {SecondSidebarItems.map((item) => (
          <div
            key={item.text}
            className="w-full flex justify-between items-center py-2 px-3 hover:bg-[#E0DFFF] dark:hover:bg-[#2E2D39] cursor-pointer rounded-md"
          >
            <div
              onClick={item.onClick}
              className="flex justify-center font-[100] items-center gap-2 text-[15px] tracking-wider"
            >
              {item.icon}
              <p>{item.text}</p>
            </div>
            {item.shortCut && (
              <p className="text-neutral-400 text-[12px]">{item.shortCut}</p>
            )}
          </div>
        ))}

        <hr className="h-2 w-full my-2 opacity-70" />

        <div className="flex justify-between items-center px-3 w-full">
          <p className="text-[15px] tracking-wider">Theme</p>
          <div className="flex justify-center items-center border rounded-md">
            <div
              onClick={toggleTheme}
              className={`h-8 w-8 flex rounded-md hover:bg-[#E0DFFF] dark:hover:bg-[#2E2D39] cursor-pointer justify-center items-center ${
                theme === "light"
                  ? "bg-[#E0DFFF] dark:bg-[#4F4D6F]"
                  : "hover:bg-[#E0DFFF] dark:hover:bg-[#4F4D6F]"
              }`}
            >
              <IoSunnyOutline size={18} />
            </div>
            <div
              onClick={toggleTheme}
              className={`h-8 w-8 flex rounded-md hover:bg-[#E0DFFF] dark:hover:bg-[#2E2D39] cursor-pointer justify-center items-center ${
                theme === "dark"
                  ? "bg-[#E0DFFF] dark:bg-[#4F4D6F]"
                  : "hover:bg-[#E0DFFF] dark:hover:bg-[#4F4D6F]"
              }`}
            >
              <IoMoonOutline size={18} />
            </div>
          </div>
        </div>

        <hr className="h-2 w-full my-2 opacity-70" />

        <div className="flex flex-col justify-start items-start px-3 w-full">
          <p className="text-[15px] tracking-wider">Canvas Background</p>
          <div className="flex justify-start items-start gap-2 w-full mt-2">
            {["#121212", "#161718", "#13171C", "#181605", "#1B1615"].map(
              (item) => (
                <p
                  style={{
                    backgroundColor: item,
                  }}
                  key={item}
                  className={`h-7 w-7 rounded-md`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSideba;
