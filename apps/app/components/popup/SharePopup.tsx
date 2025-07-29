import React, { useEffect } from "react";
import { IoIosLink } from "react-icons/io";

const SharePopup = ({
  roomSlug,
  onClick,
}: {
  roomSlug: string;
  onClick: () => void;
}) => {
  const copyLiveLink = () => {
    const shareUrl = `https://${window.location.hostname}/canvas/${roomSlug}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Share URL copied to clipboard");
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Escape") {
        onClick();
      }
    };

    window.addEventListener("keydown", fn);

    return () => {
      window.removeEventListener("keydown", fn);
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className="w-full h-screen flex justify-center items-center bg-black/10 fixed top-0 bottom-0 left-0 right-0 z-50"
    >
      <div
        className="w-[400px] h-[300px] rounded-md bg-[#232329] flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl tracking-wider font-semibold text-[#A8A5FF]">
          Live collaboration
        </h2>
        <p className="text-base mt-6 tracking-widest text-center text-neutral-50">
          Invite people to collaborate on your drawing.
        </p>
        <p className="text-base mt-4 tracking-widest text-center w-[90%] text-neutral-50">
          Don't worry, the session is end-to-end encrypted, and fully private.
          Not even our server can see what you draw.
        </p>
        <button
          onClick={copyLiveLink}
          className="dark:bg-[#4F4D6F] mt-6 rounded-md bg-[#5B57D1] dark:text-neutral-50 text-neutral-50 py-2 px-4 flex justify-center items-center gap-2 cursor-pointer font-normal hover:opacity-80"
        >
          <IoIosLink />
          <p>Share Link</p>
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
