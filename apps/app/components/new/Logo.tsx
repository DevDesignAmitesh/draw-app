import Image from "next/image";
import React from "react";

const Logo = () => {
  return <Image height={100} width={220} src={"/logo.svg"} alt="logo" />;
};

export default Logo;
