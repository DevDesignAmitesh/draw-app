"use client";

import React from "react";
import InputBox from "./InputBox";
import SuperBtn from "./SuperBtn";

const CreateRoom = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-start items-center p-10">
      <h1 className="text-3xl mt-10 font-bold text-center capitalize dark:text-white text-black">
        Create a new board
      </h1>
      <p className="text-[15px] capitalize mt-2 text-center text-neutral-600 dark:text-neutral-300">
        collaborative board for enjoying with friends
      </p>
      <div className="p-5 rounded-md border-2 border-neutral-600 dark:border-neutral-300 w-[450px] mt-4 flex flex-col justify-center items-center gap-4">
        <InputBox value="" onChange={() => {}} type="email" label="email" />
        <InputBox
          value=""
          onChange={() => {}}
          type="password"
          label="password"
        />
        <SuperBtn variant="primary" className="w-full mt-2" label={"create board"} />
      </div>
    </div>
  );
};

export default CreateRoom;
