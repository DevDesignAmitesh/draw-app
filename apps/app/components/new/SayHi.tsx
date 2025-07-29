import React from "react";
import TwoBtn from "./TwoBtn";
import Seven from "@/components/new/decoration/Seven";
import Six from "@/components/new/decoration/six";
import Three from "@/components/new/decoration/three";
import FourCopy from "./decoration/Four-copy";

const SayHi = ({ userId }: { userId: string | null }) => {
  return (
    <div className="w-full dark:bg-neutral-900 mb-10">
      <div className="relative h-auto w-full max-w-7xl mx-auto lg:px-10 px-6 lg:py-20 py-10 flex flex-col justify-center items-center">
        <p className="lg:text-[45px] text-[32px] text-center font-semibold tracking-widest text-[#030064] dark:text-white">
          Say hi to{" "}
          <span className="p-2 bg-[#D3FFD2] dark:bg-[#030064] rounded-md">
            Excalidraw
          </span>{" "}
        </p>
        <p className="py-1 px-4 bg-[#D3FFD2] rounded-md text-center text-[#030064] lg:text-[15px] text-[13px] lg:mt-4 mt-2 tracking-wider">
          Free & Open source
        </p>
        <TwoBtn className="lg:mt-10 mt-6" userId={userId} />
        {/* <Three />
      <FourCopy />
      <Six />
      <Seven /> */}
      </div>
    </div>
  );
};

export default SayHi;
