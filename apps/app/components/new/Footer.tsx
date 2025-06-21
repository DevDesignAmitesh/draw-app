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
      className="w-full min-h-[50vh] bg-[#232329] overflow-hidden"
    >
      <div className="flex lg:flex-row flex-col items-start lg:py-20 py-10 lg:justify-between justify-start h-full text-white text-center lg:gap-0 gap-10 lg:px-40 md:px-20 px-10">
        <div className="flex flex-col justify-center items-start lg:gap-10 gap-5">
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
        <div className="flex md:justify-center justify-start items-start flex-wrap gap-16">
          {FooterListingItems.map((item) => (
            <FooterListing data={item.data.item} label={item.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
