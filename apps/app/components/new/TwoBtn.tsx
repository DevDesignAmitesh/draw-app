import React from "react";
import Button from "./Button";

interface TwoBtn {
  className?: string;
  userId?: string | null;
}

const TwoBtn = ({ className, userId }: TwoBtn) => {
  if (!userId) {
    return (
      <div className={`flex justify-center items-center gap-3 ${className}`}>
        <Button href="/signin" variant="white" label="Log in" />
        <Button href="/signup" variant="blue" label="Sign up" />
      </div>
    );
  }
  return (
    <div className={`flex justify-center items-center gap-3 ${className}`}>
      <Button href="/dashboard" variant="white" label="Dashboard" />
      <Button href="/create" variant="blue" label="Create Room" />
    </div>
  );
};

export default TwoBtn;
