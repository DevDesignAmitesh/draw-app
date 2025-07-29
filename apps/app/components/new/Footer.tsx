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
      className="w-full h-auto bg-[#232329] overflow-hidden py-10"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex lg:flex-row flex-col items-start lg:justify-between justify-start h-full text-white text-center lg:gap-0 gap-10">
          <div className="flex flex-col justify-center items-start lg:gap-6 gap-5">
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
              <FooterListing
                key={item.label}
                data={item.data.item}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
