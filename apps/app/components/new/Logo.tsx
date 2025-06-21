import Image from "next/image";
import React from "react";

const Logo = ({ src }: { src: string }) => {
  return <Image height={200} width={200} src={src} alt="logo" />;
};

export default Logo;
