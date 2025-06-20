import React from "react";
import TwoBtn from "./TwoBtn";
import Four from "@/components/new/decoration/Four";
import Seven from "@/components/new/decoration/Seven";
import Six from "@/components/new/decoration/six";
import Three from "@/components/new/decoration/three";

const SayHi = () => {
  return (
    <div className="relative w-full px-10 py-20 flex flex-col justify-center items-center">
      <p className="text-[45px] font-semibold tracking-widest text-[#030064]">
        Say hi to{" "}
        <span className="p-2 bg-[#D3FFD2] rounded-md">Excalidraw</span>{" "}
      </p>
      <p className="p-2 bg-[#D3FFD2] rounded-md text-[#030064] text-[22px] mt-6 tracking-wider">
        Free & Open source
      </p>
      <TwoBtn className="mt-6" />
      <Three />
      <Four />
      <Six />
      <Seven />
    </div>
  );
};

export default SayHi;
