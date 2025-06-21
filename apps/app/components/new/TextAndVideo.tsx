import Image from "next/image";
import React from "react";
import TwoBtn from "./TwoBtn";
import CardComp from "./CardComp";

export type CardType = "long-text" | "normal" | "twitter";

interface TextAndVideo {
  title: string;
  description?: string;
  leftImg: string;
  videoUrl?: string;
  label: string;
  isBiglayout: boolean;
  type: CardType;
}

const TextAndVideo = ({
  title,
  description,
  label,
  leftImg,
  videoUrl,
  type,
  isBiglayout,
}: TextAndVideo) => {
  return (
    <div
      className={`w-full bg-white ${isBiglayout ? "min-h-screen" : "h-auto"} flex justify-center items-start lg:px-40 md:px-20 px-6 ${
        label === "no sign-up" ? "lg:py-30 md:py-20 py-10" : "lg:py-20 py-10"
      } gap-5`}
    >
      <div className="flex flex-col justify-center items-center">
        <Image height={70} width={70} alt="some-img" src={leftImg} />
        <div
          className={`w-[4px] rounded-full ${isBiglayout ? "h-screen" : "h-[100px]"} mt-2 bg-[#E0DFFF]`}
        />
      </div>
      {isBiglayout ? (
        <div className="w-full h-screen flex flex-col justify-start items-start text-[#030064] gap-2">
          <span className="p-2 bg-[#D3FFD2] rounded-md lg:text-[15px] text-[13px]">
            {label}
          </span>
          <p className="lg:text-5xl text-3xl font-medium">{title}</p>
          <p className="lg:text-[18px] text-[15px]">{description}</p>
          <video
            src={videoUrl}
            loop
            muted
            autoPlay
            className="w-full h-full object-cover rounded-lg mt-4"
          />
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-4">
            <CardComp type={type} />
            <CardComp type={type} />
          </div>
        </div>
      ) : (
        <div className="w-full h-fit flex flex-col justify-start items-start text-[#030064] gap-2">
          <p className="lg:text-5xl text-3xl font-medium">
            {title} <span className="p-2 bg-[#D3FFD2] rounded-md">{label}</span>
            <p className="lg:text-[18px] text-[15px] mt-6">{description}</p>
          </p>
          <TwoBtn className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default TextAndVideo;
