import React from "react";
import { CompanyCurousel } from "@/lib/ui/utils";
import Image from "next/image";

const ImageWithPartner = () => {
  return (
    <div className="w-full min-h-screen px-40 py-10">
      <Image
        width={1920}
        height={1080}
        alt="bottom-hero"
        src={"/bottom-hero.png"}
        className="z-[50] object-cover object-center shadow-md"
      />
      <div className="w-full flex flex-col justify-center items-center gap-5 py-20">
        <p className="text-[#030064] text-[22px] tracking-wider ">
          Trusted by the largest companies in the world
        </p>
        <div className="w-full flex justify-evenly items-center whitespace-nowrap">
          {CompanyCurousel.map((item) => (
            <Image
              key={item.src}
              height={70}
              width={70}
              alt="logo"
              src={item.src}
              className="inline-block"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageWithPartner;
