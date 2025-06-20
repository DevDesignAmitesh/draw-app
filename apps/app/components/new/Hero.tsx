import React from "react";
import { RiUser3Line } from "react-icons/ri";

const Hero = () => {
  return (
    <div className={`w-full flex justify-center items-center flex-col pt-40`}>
      <p className="text-[58px] tracking-widest font-roboto text-[#030064]">
        Online <span className="p-2 bg-[#D3FFD2] rounded-md">Whiteboard</span>{" "}
        made simple
      </p>
      <p className="text-[#030064] mt-3 text-[20px] tracking-wider font-roboto">
        Ideate, Collaborate, Share. Simply with Excalidraw.
      </p>
      <p className="text-[#030064] tracking-wider py-1 px-3 mt-7 text-[13.5px] rounded-md bg-[#ffe599] border-2 border-[#705400] hover:bg-white cursor-pointer transition-all duration-200">
        <RiUser3Line className="inline-block mr-2" size={18} />
        102.2 k users not using
      </p>
    </div>
  );
};

export default Hero;
