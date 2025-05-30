import Link from "next/link";
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
        <p className="capitalize font-medium lg:block hidden">developed by</p>
        <div className="flex justify-center items-center gap-2">
          <Link
            href="https://www.linkedin.com/in/amitesh-singh-504b2b281/"
            target="_blank"
          >
            <FaLinkedin size={20} className="cursor-pointer" />
          </Link>
          <Link href="http://github.com/DevDesignAmitesh/" target="_blank">
            <FaGithub size={20} className="cursor-pointer" />
          </Link>
          <Link href="https://x.com/Amitesh48256" target="_blank">
            <FaXTwitter size={20} className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
