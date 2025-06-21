import React from "react";
import TwoBtn from "./TwoBtn";
import Plus from "./decoration/Plus";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel ";

const PlusFeature = () => {
  return (
    <div className="relative w-full h-[70vh] flex justify-between items-center px-60 bg-[#F0FBFF]">
      <div className="flex flex-col justify-center items-start text-[#030064]">
        <Plus />
        <h1 className="text-5xl tracking-wider mb-2">Plus</h1>
        <p className="text-2xl tracking-wider mt-2">
          Try ‘plus features’ with 14 day free trial
        </p>
        <p className="text-[18px] text-left w-[50%] mt-2">
          Upgrade for unlimited cloud workspace, enhanced sharing and access
          options, presentation tool and more.
        </p>
        <TwoBtn className="mt-6" />
        {/*  */}
      </div>
      <ImageCarousel />
    </div>
  );
};

export default PlusFeature;
