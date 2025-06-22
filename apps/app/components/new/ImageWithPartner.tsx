import React from "react";
import { CompanyCurousel } from "@/lib/ui/utils";
import Image from "next/image";

const ImageWithPartner = () => {
  return (
    <div className="w-full lg:min-h-screen h-auto lg:px-40 md:px-20 px-10 lg:py-10 py-5">
      <Image
        width={1920}
        height={1080}
        alt="bottom-hero"
        src={"/bottom-hero.png"}
        className="z-[50] object-cover object-center shadow-md"
      />
      <div className="w-full flex flex-col justify-center items-center gap-5 lg:pb-20 pb-8 lg:pt-30 pt-16">
        <p className="text-[#030064] dark:text-white text-center lg:text-[22px] text-[19px] tracking-wider">
          Trusted by the largest companies in the world
        </p>
        <div className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:px-4 px-2 pt-4">
          {CompanyCurousel.map((item) => (
            <Image
              key={item.src}
              src={item.src}
              alt="logo"
              width={80}
              height={80}
              className="w-16 sm:w-20 md:w-24 h-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageWithPartner;
