import React from "react";
import { RiUser3Line } from "react-icons/ri";
import Eight from "@/components/new/decoration/Eight";
import Five from "@/components/new/decoration/five";
import Four from "@/components/new/decoration/Four";
import Nine from "@/components/new/decoration/Nine";
import One from "@/components/new/decoration/one";
import Seven from "@/components/new/decoration/Seven";
import Six from "@/components/new/decoration/six";
import Three from "@/components/new/decoration/three";
import Two from "@/components/new/decoration/two";

const Hero = () => {
  return (
    <>
      <div
        className={`w-full relative h-screen flex justify-center items-center flex-col`}
      >
        <p className="lg:text-[58px] text-[40px] text-center tracking-widest text-[#030064]">
          Online <span className="p-2 bg-[#D3FFD2] rounded-md">Whiteboard</span>{" "}
          made simple
        </p>
        <p className="text-[#030064] text-center mt-3 lg:text-[20px] text-[15px] tracking-wider">
          Ideate, Collaborate, Share. Simply with Excalidraw.
        </p>
        <p className="text-[#030064] text-center tracking-widest py-1 px-3 mt-7 lg:text-[14px] text-[10px] rounded-md bg-[#ffe599] border-2 border-[#705400] hover:bg-white cursor-pointer transition-all duration-200">
          <RiUser3Line className="inline-block mr-2" size={18} />
          102.2 k users not using
        </p>
      </div>
      <One />
      <Two />
      <Three />
      <Four  />
      <Five />
      <Six />
      <Seven />
      <Eight />
      <Nine />
    </>
  );
};

export default Hero;
