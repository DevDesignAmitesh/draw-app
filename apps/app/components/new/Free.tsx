import React from "react";
import FreeSvg from "./decoration/FreeSvg";
import TwoBtn from "./TwoBtn";
import Eight from "@/components/new/decoration/Eight";
import Five from "@/components/new/decoration/five";
import Four from "@/components/new/decoration/Four";
import Nine from "@/components/new/decoration/Nine";
import One from "@/components/new/decoration/one";
import Seven from "@/components/new/decoration/Seven";
import Six from "@/components/new/decoration/six";
import Three from "@/components/new/decoration/three";
import Two from "@/components/new/decoration/two";

const Free = () => {
  return (
    <div className="relative min-h-[70vh] w-full bg-white flex flex-col justify-start items-center text-[#030064] lg:px-40 md:px-20 px-10 py-10">
      <FreeSvg />
      <p className="text-3xl text-center tracking-wider lg:mt-2 mt-4">
        Try the forever free editor for yourself
      </p>
      <p className="text-xl text-center lg:w-[50%] w-full lg:mt-2 mt-4">
        Don’t take our word for granted. Try the forever free Excalidraw
        open-sourced editor for yourself and get your ideas out there.
      </p>
      <TwoBtn className="mt-6" />
      <One />
      <Two />
      <Four />
    </div>
  );
};

export default Free;
