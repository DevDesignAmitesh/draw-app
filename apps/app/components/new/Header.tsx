"use client";

import React, { useContext } from "react";
import Logo from "./Logo";
import { LandingPageHeader } from "@/lib/ui/utils";
import { MdKeyboardArrowDown } from "react-icons/md";
import HeaderDropDown from "./HeaderDropDown";
import TwoBtn from "./TwoBtn";
import { ThemeContext } from "@/lib/ThemeProvider";

const Header = ({ userId }: { userId: string | null }) => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <div className="w-full">
      <header className="fixed bg-[#F8FFF8] dark:bg-[#121212] z-[50] top-0 right-0 left-0 w-full max-w-7xl mx-auto flex justify-between items-center lg:py-7 py-4">
        <div className="flex justify-center items-center gap-18">
          <Logo />
          <div className="lg:flex hidden relative justify-center capitalize text-[#030064] dark:text-white items-center gap-6 text-[16px]">
            {LandingPageHeader.map((item) => {
              return (
                <div
                  key={item.label}
                  className={`relative ${item.label === "resources" ? "group" : ""}`}
                >
                  <p
                    onClick={() =>
                      item.label === "toggle theme" && toggleTheme()
                    }
                    className="tracking-wider transition-all duration-200 p-3 hover:bg-[#F5F5F9] dark:hover:bg-[#6965db] cursor-pointer rounded-md"
                  >
                    {item.label}
                    {item.label === "resources" && (
                      <MdKeyboardArrowDown
                        className="inline-block ml-1"
                        size={22}
                      />
                    )}
                  </p>

                  {item.label === "resources" && <HeaderDropDown />}
                </div>
              );
            })}
          </div>
        </div>
        <TwoBtn userId={userId} />
      </header>
    </div>
  );
};

export default Header;
