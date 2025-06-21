import Image from "next/image";
import React from "react";

const Logo = ({ src }: { src: string }) => {
  return <Image height={100} width={220} src={src} alt="logo" />;
};

export default Logo;
