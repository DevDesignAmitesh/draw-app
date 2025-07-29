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
  userId: string | null;
}

const TextAndVideo = ({
  title,
  description,
  label,
  leftImg,
  videoUrl,
  type,
  isBiglayout,
  userId,
}: TextAndVideo) => {
  return (
    <div className="w-full">
      <div
        className={`w-full max-w-7xl mx-auto h-auto flex justify-center items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center">
          <Image height={70} width={70} alt="some-img" src={leftImg} />
          <div
            className={`w-[4px] rounded-full ${isBiglayout ? "h-screen" : "h-[100px]"} mt-2 bg-[#E0DFFF]`}
          />
        </div>
        {isBiglayout ? (
          <div className="w-full h-screen flex flex-col justify-start items-start text-[#030064] dark:text-white gap-2">
            <span className="p-2 bg-[#D3FFD2] dark:bg-[#030064] rounded-md lg:text-[15px] text-[13px]">
              {label}
            </span>
            <p className="lg:text-5xl text-3xl font-medium">{title}</p>
            <p className="lg:text-[18px] text-[15px] dark:text-neutral-400">
              {description}
            </p>
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
          <div className="w-full h-fit flex flex-col justify-start items-start text-[#030064] dark:text-white gap-2">
            <div className="lg:text-5xl text-3xl font-medium">
              {title}{" "}
              <span className="p-2 bg-[#D3FFD2] dark:bg-[#030064] rounded-md">
                {label}
              </span>
              <p className="lg:text-[18px] text-[15px] mt-6">{description}</p>
            </div>
            <TwoBtn className="mt-2" userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAndVideo;
