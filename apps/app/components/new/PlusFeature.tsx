import React from "react";
import TwoBtn from "./TwoBtn";
import Plus from "./decoration/Plus";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel ";

const PlusFeature = ({ userId }: { userId: string | null }) => {
  return (
    <div className="w-full py-20">
      <div className="relative w-full h-auto max-w-7xl mx-auto flex lg:flex-row flex-col justify-between items-center">
        <div className="flex flex-col justify-center lg:items-start items-center text-[#030064] dark:text-white">
          <Plus />
          <h1 className="text-5xl tracking-wider mb-2">Plus</h1>
          <p className="text-2xl text-center tracking-wider mt-2">
            Try ‘plus features’ with 14 day free trial
          </p>
          <p className="text-[18px] lg:text-left lg:w-[50%] w-full text-center mt-2">
            Upgrade for unlimited cloud workspace, enhanced sharing and access
            options, presentation tool and more.
          </p>
          <TwoBtn className="mt-6" userId={userId} />
          {/*  */}
        </div>
        <ImageCarousel />
      </div>
      x
    </div>
  );
};

export default PlusFeature;
