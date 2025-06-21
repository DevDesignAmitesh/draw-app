import React from "react";

interface InputBoxProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
}

const InputBox = ({
  label,
  value,
  onChange,
  type = "text",
  className,
}: InputBoxProps) => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-start gap-2 ${className}`}
    >
      <p className="text-[15px] tracking-wider font-semibold dark:text-white capitalize text-black">
        {label}
      </p>
      <input
        onChange={onChange}
        type={type}
        value={value}
        placeholder={`Enter ${label}`}
        className="w-full p-2 tracking-wider text-[15px] rounded-md border border-neutral-600 dark:border-neutral-300 placeholder:text-neutral-600 dark:placeholder:text-neutral-300 text-neutral-600 dark:text-neutral-300 outline-none"
      />
    </div>
  );
};

export default InputBox;
