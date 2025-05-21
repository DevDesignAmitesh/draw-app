import React from "react";
import SuperBtn from "./SuperBtn";
import ToggleBtn from "./ToggleBtn";

const Header = () => {
  return (
    <div className="w-full fixed top-0 py-5 bg-white dark:bg-[#121212] text-black dark:text-white px-20 flex justify-between items-center">
      <h1 className="text-2xl font-bold capitalize">drawing app</h1>
      <div className="flex justify-between items-center gap-4">
        <ToggleBtn />
        <SuperBtn label="sign in" variant={"primary"} />
        <SuperBtn label="sign up" variant={"secondary"} />
      </div>
    </div>
  );
};

export default Header;
