import React from "react";
import { CardType } from "./TextAndVideo";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const CardComp = ({ type }: { type: CardType }) => {
  if (type === "normal") {
    return (
      <div className="flex flex-col justify-start items-start tracking-wider bg-white p-5 shadow-md border border-neutral-400 rounded-md">
        <p>✏️ Easy to use</p>
        <p className="text-neutral-600">Zero learning curve</p>
      </div>
    );
  } else if (type === "long-text") {
    return (
      <div className="flex flex-col justify-start items-start tracking-wider bg-white p-5 shadow-md border border-neutral-400 rounded-md hover:bg-[#F5F5FC] transition-all duration-200 cursor-pointer">
        <p>UML diagram</p>
        <p className="text-neutral-600 mt-3">
          Visualize and communicate different aspects od a system effectively
        </p>
        <p className="underline">Read it</p>
      </div>
    );
  } else if (type === "twitter") {
    return (
      <div className="flex flex-col justify-start items-start tracking-wider bg-white p-5 shadow-md border border-neutral-400 rounded-md">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Image
              height={40}
              width={40}
              alt="profile"
              src={
                "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Adam_Rackis_X_avatar_photo.jpg"
              }
              className="rounded-full"
            />
            <div className="flex justify-start items-start flex-col">
              <p>Adam Rackis</p>
              <p className="text-[13px]">@AdamRackis</p>
            </div>
          </div>
          <FaXTwitter size={18} />
        </div>
        <p className="text-[14px] tracking-wide text-left mt-4">
          LOVE Excalidraw. Diagramming made simple. With an AI integration
          that’s actually useful!
        </p>
      </div>
    );
  }
};

export default CardComp;
