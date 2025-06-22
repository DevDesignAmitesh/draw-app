import { HeaderDropDownUtils } from "@/lib/ui/utils";
import Link from "next/link";
import React from "react";

const HeaderDropDown = () => {
  return (
    <div className="absolute hidden group-hover:block bg-white dark:bg-[#121212] text-[#030064] dark:text-white shadow-md p-2 rounded-md top-full w-auto">
      {HeaderDropDownUtils.map((item) => (
        <Link
          href={"#"}
          key={item.label}
          className="p-2 block rounded-md tracking-widest text-[14px] cursor-pointer w-full whitespace-nowrap hover:bg-[#F5F5F9] dark:hover:bg-[#6965db]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default HeaderDropDown;
