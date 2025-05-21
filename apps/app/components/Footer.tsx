import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full py-5 flex justify-between items-center">
      <p className="capitalize text-[14px] text-neutral-600 dark:text-neutral-400">
        © 2025 drawing app. All rights reserved.
      </p>
      <div className="flex justify-center items-center gap-4 text-neutral-600 dark:text-neutral-400">
        <p className="capitalize font-medium">developed by</p>
        <div className="flex justify-center items-center gap-2">
          <FaLinkedin size={20} />
          <FaGithub size={20} />
          <FaXTwitter size={20} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
