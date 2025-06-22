"use client";

import { ThemeContext } from "@/lib/ThemeProvider";
import Image from "next/image";
import React, { useContext } from "react";

const Logo = ({ src }: { src?: string }) => {
  const { theme } = useContext(ThemeContext);
  if (theme === "light") {
    return (
      <Image height={200} width={200} src={src ?? "/logo.svg"} alt="logo" />
    );
  } else {
    return (
      <Image
        height={200}
        width={200}
        src={src ?? "https://plus.excalidraw.com/images/logo-dark.svg"}
        alt="logo"
      />
    );
  }
};

export default Logo;
