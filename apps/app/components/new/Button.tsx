import Link from "next/link";
import React from "react";

type BtnVariant = "white" | "blue";

interface ButtonProps {
  href: string;
  label: string;
  variant: BtnVariant;
  className?: string;
  onClick?: () => void;
}

const Button = ({ href, label, variant, className, onClick }: ButtonProps) => {
  const baseStyles =
    "md:px-7 px-4 md:py-[10px] py-[7px] tracking-wider rounded-full transition-all duration-200";
  const whiteBtnStyles = `border-2 hover:bg-[#F5F5F9] hover:dark:bg-neutral-600 hover:dark:text-whute text-[#030064] dark:text-white border-[#C5C5D0]`;
  const blueBtnStyles = `bg-[#6965db] dark:border-0 text-white hover:bg-[#F5F5F9] hover:text-[#030064] border hover:border-[#C5C5D0]`;

  return (
    <Link
      onClick={onClick}
      className={`${baseStyles} ${variant === "white" ? whiteBtnStyles : blueBtnStyles} ${className}`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default Button;
