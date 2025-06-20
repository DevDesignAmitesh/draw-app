import React from "react";
import Button from "./Button";

interface TwoBtn {
  className?: string;
}

const TwoBtn = ({ className }: TwoBtn) => {
  return (
    <div className={`flex justify-center items-center gap-3 ${className}`}>
      <Button href="/signin" variant="white" label="Log in" />
      <Button href="/signup" variant="blue" label="Sign up" />
    </div>
  );
};

export default TwoBtn;
