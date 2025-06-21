import React from "react";

type variant = "primary" | "secondary";

interface SuperBtnProps {
  label: string;
  variant: variant;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const SuperBtn = ({
  label,
  variant,
  className,
  onClick,
  disabled,
}: SuperBtnProps) => {
  const primaryStyles =
    "bg-[#5B57D1] text-white dark:bg-[#B2AEFF] dark:text-[#24242D]";
  const secondaryStyles =
    "bg-[#F1F0FF] text-black dark:bg-[#2E2D39] dark:text-white";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md py-2 px-4 shadow-md tracking-wider capitalize cursor-pointer text-[14px] ${variant === "primary" ? primaryStyles : secondaryStyles} ${className}`}
    >
      {label}
    </button>
  );
};

export default SuperBtn;
