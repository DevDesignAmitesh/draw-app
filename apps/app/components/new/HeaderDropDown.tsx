import { HeaderDropDownUtils } from "@/lib/ui/utils";
import Link from "next/link";
import React from "react";

const HeaderDropDown = () => {
  return (
    <div className="absolute hidden group-hover:block bg-white text-[#030064] shadow-md p-2 rounded-md top-full w-auto">
      {HeaderDropDownUtils.map((item) => (
        <Link
          href={"#"}
          key={item.label}
          className="p-2 block rounded-md tracking-widest text-[14px] cursor-pointer w-full whitespace-nowrap hover:bg-[#F5F5F9]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default HeaderDropDown;
