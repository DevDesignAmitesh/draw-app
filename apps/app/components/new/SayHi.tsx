import React from "react";
import TwoBtn from "./TwoBtn";
import Seven from "@/components/new/decoration/Seven";
import Six from "@/components/new/decoration/six";
import Three from "@/components/new/decoration/three";
import FourCopy from "./decoration/Four-copy";

const SayHi = () => {
  return (
    <div className="relative lg:h-[400px] h-[300px] w-full lg:px-10 px-6 lg:py-20 py-10 flex flex-col justify-center items-center">
      <p className="lg:text-[45px] text-[32px] text-center font-semibold tracking-widest text-[#030064]">
        Say hi to{" "}
        <span className="p-2 bg-[#D3FFD2] rounded-md">Excalidraw</span>{" "}
      </p>
      <p className="p-2 bg-[#D3FFD2] rounded-md text-center text-[#030064] lg:text-[22px] text-[18px] lg:mt-6 mt-4 tracking-wider">
        Free & Open source
      </p>
      <TwoBtn className="lg:mt-6 mt-4" />
      <Three />
      <FourCopy />
      <Six />
      <Seven />
    </div>
  );
};

export default SayHi;
