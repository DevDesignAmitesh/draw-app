import Link from "next/link";
import React from "react";

type BtnVariant = "white" | "blue";

interface ButtonProps {
  href: string;
  label: string;
  variant: BtnVariant;
}

const Button = ({ href, label, variant }: ButtonProps) => {
  const baseStyles =
    "px-7 py-[10px] tracking-wider text-[#030064] rounded-full transition-all duration-200";
  const whiteBtnStyles = `border-2 hover:bg-[#F5F5F9] border-[#C5C5D0]`;
  const blueBtnStyles = `bg-[#6965db] text-white hover:bg-[#F5F5F9] hover:text-[#030064] border hover:border-[#C5C5D0]`;

  return (
    <Link
      className={`${baseStyles} ${variant === "white" ? whiteBtnStyles : blueBtnStyles}`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default Button;
