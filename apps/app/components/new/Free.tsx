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

const Free = ({ userId }: { userId: string | null }) => {
  return (
    <div className="w-full py-20 bg-gray-100 dark:bg-neutral-950">
      <div className="relative h-auto w-full max-w-7xl mx-auto flex flex-col justify-start items-center text-[#030064] dark:text-white">
        <FreeSvg />
        <p className="text-3xl text-center tracking-wider lg:mt-2 mt-4">
          Try the forever free editor for yourself
        </p>
        <p className="text-xl dark:text-neutral-300 text-neutral-700 text-center lg:w-[50%] w-full lg:mt-2 mt-4">
          Don’t take our word for granted. Try the forever free Excalidraw
          open-sourced editor for yourself and get your ideas out there.
        </p>
        <TwoBtn className="mt-6" userId={userId} />
        {/* <One />
      <Two />
      <Four /> */}
      </div>
    </div>
  );
};

export default Free;
