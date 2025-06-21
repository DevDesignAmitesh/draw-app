import React from "react";
import Logo from "./Logo";
import { FooterListingItems, footerPublicLink } from "@/lib/ui/utils";
import Link from "next/link";
import FooterListing from "./FooterListing";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `url(/footer.svg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-[50vh] bg-[#232329] overflow-hidden"
    >
      <div className="flex items-start pt-20 justify-between h-full text-white text-center px-40">
        <div className="flex flex-col justify-center items-start gap-10">
          <Logo src="https://plus.excalidraw.com/images/logo-dark.svg" />
          <div className="flex justify-center items-center gap-4">
            {footerPublicLink.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-[#121212] text-white p-[10px] rounded-md hover:bg-[#31303B] cursor-pointer transition-all duration-200"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-start gap-16">
          {FooterListingItems.map((item) => (
            <FooterListing data={item.data.item} label={item.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
