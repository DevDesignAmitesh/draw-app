import { FooterListingItems } from "@/lib/ui/utils";
import Link from "next/link";
import React from "react";

interface FooterListing {
  label: string;
  data: string[];
}

const FooterListing = ({ label, data }: FooterListing) => {
  return (
    <div className="flex flex-col justify-start items-start text-[#D0CCFF]">
      <>
        <h1 className="font-semibold text-[18px]">{label}</h1>
        {data.map((item) => (
          <p className="text-[13px] mb-1 hover:underline cursor-pointer">
            {item}
          </p>
        ))}
      </>
    </div>
  );
};

export default FooterListing;
