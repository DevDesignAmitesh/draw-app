import Image from "next/image";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";

const Testimonials = () => {
  return (
    <div className="w-full pt-40 pb-20">
      <div className="h-auto w-full max-w-7xl mx-auto flex flex-col justify-start items-start text-[#030064] dark:text-white">
        <p className="text-6xl font-medium">Loved by individuals</p>
        <p className="mt-16 tracking-wider text-[18px]">
          See what other people say about Excalidraw.
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-5 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start tracking-wider bg-white p-5 shadow-md border border-neutral-400 rounded-md hover:shadow-xl cursor-pointer text-black"
            >
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
              <p className="text-[14px] tracking-wider text-left mt-4">
                LOVE Excalidraw. Diagramming made simple. With an AI integration
                that’s actually useful!.
                <br />I have terrible handwriting and never got to enjoy
                “sketching” before (scratch notes, <br /> whiteboards, etc).
                Excalidraw unlocked that for me and I owe y’all immensely for it
                ❤️❤️❤️
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
