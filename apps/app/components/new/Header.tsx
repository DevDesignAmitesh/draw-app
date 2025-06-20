import React from "react";
import Logo from "./Logo";
import { LandingPageHeader } from "@/lib/ui/utils";
import Button from "./Button";
import { MdKeyboardArrowDown } from "react-icons/md";
import HeaderDropDown from "./HeaderDropDown";
import TwoBtn from "./TwoBtn";

const Header = () => {
  return (
    <header className="fixed bg-white z-[50] top-0 right-0 left-0 w-full flex justify-between items-center px-9 py-7">
      <div className="flex justify-center items-center gap-18">
        <Logo />
        <div className="flex relative justify-center capitalize text-[#030064] items-center gap-6 text-[16px]">
          {LandingPageHeader.map((item) => (
            <div
              key={item.label}
              className={`relative ${item.label === "resources" ? "group" : ""}`}
            >
              <p className="tracking-wider transition-all duration-200 p-3 hover:bg-[#F5F5F9] cursor-pointer rounded-md">
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
          ))}
        </div>
      </div>
      <TwoBtn />
    </header>
  );
};

export default Header;
