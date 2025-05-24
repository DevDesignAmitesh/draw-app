import React from "react";
import SuperBtn from "./SuperBtn";
import ToggleBtn from "./ToggleBtn";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full py-5 bg-white dark:bg-[#121212] text-black dark:text-white px-20 flex justify-between items-center">
      {/* <h1 className="text-2xl font-bold capitalize">drawing app</h1> */}
      <div className="flex flex-col justify-center items-start gap-1">
        <h1 className="text-3xl font-bold capitalize dark:text-white text-black">
          your boards
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Create and manage your collaborative whiteboards
        </p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <ToggleBtn />
        <Link href={"/"}>
          <SuperBtn label="log out" variant={"primary"} />
        </Link>
        <Link href={"/create"}>
          <SuperBtn label="create new room" variant="primary" />
        </Link>
        {/* <Link href={"/signin"}>
          <SuperBtn label="sign in" variant={"primary"} />
        </Link>
        <Link href={"/signup"}>
          <SuperBtn label="sign up" variant={"secondary"} />
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
