import SuperBtn from "@/components/SuperBtn";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center pt-5">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center items-start gap-1">
          <h1 className="text-3xl font-bold capitalize dark:text-white text-black">
            your boards
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Create and manage your collaborative whiteboards
          </p>
        </div>
        <Link href={"/create"}>
          <SuperBtn label="create new room" variant="primary" />
        </Link>
      </div>
      <div className="w-full grid grid-cols-3 mt-14 cursor-pointer">
        <div className="w-full flex flex-col justify-center items-start rounded-md border-2 border-neutral-600 dark:border-neutral-300">
          <div className="w-full py-3 px-5 flex flex-col justify-center items-start">
            <h1 className="text-xl font-semibold text-black dark:text-white">
              Marketing Flowchart
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-[12px]">
              marketing-flowchart-2023a89b3c
            </p>
          </div>
          <div className="w-full py-3 px-5 flex flex-col justify-center items-end">
            <p className="text-neutral-600 capitalize dark:text-neutral-300 text-[12px]">
              last edited: 20/10/2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
