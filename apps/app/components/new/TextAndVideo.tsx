import Image from "next/image";
import React from "react";
import TwoBtn from "./TwoBtn";

interface TextAndVideo {
  title: string;
  description?: string;
  leftImg: string;
  videoUrl?: string;
  label: string;
  isBiglayout: boolean;
  type: "long-text" | "normal" | "twitter";
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
    <div className="w-full min-h-screen flex justify-center items-start px-20 py-30 gap-5">
      <div className="flex flex-col justify-center items-center">
        <Image height={70} width={70} alt="some-img" src={leftImg} />
        <div
          className={`w-[4px] rounded-full ${isBiglayout ? "h-screen" : "h-[100px]"} mt-2 bg-[#E0DFFF]`}
        />
      </div>
      {isBiglayout ? (
        <div className="w-full h-screen flex flex-col justify-start items-start text-[#030064] gap-2">
          <span className="p-2 bg-[#D3FFD2] rounded-md">{label}</span>
          <p className="text-7xl font-medium">{title}</p>
          <p className="text-xl">{description}</p>
          <video
            src={videoUrl}
            loop
            muted
            autoPlay
            className="w-full h-full object-cover rounded-lg mt-4"
          />
        </div>
      ) : (
        <div className="w-full h-fit flex flex-col justify-start items-start text-[#030064] gap-2">
          <p className="text-7xl font-medium">
            {title} <span className="p-2 bg-[#D3FFD2] rounded-md">{label}</span>
            <p className="text-xl mt-6">{description}</p>
          </p>
          <TwoBtn className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default TextAndVideo;
