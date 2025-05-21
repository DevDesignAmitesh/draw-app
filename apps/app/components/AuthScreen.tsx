"use client";

import React from "react";
import InputBox from "./InputBox";
import SuperBtn from "./SuperBtn";
import Link from "next/link";

const AuthScreen = ({ isSignin }: { isSignin?: boolean }) => {
  const headingText = isSignin ? "welcome back" : "create an account";
  const subText = isSignin
    ? "Sign in to access your diagrams"
    : "Sign up to start creating your diagrams";
  const buttonLabel = isSignin ? "Sign in" : "Sign up";
  const alternateText = isSignin
    ? "Don't have an account?"
    : "Already have an account?";
  const alternateAction = isSignin ? "Sign up" : "Sign in";

  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center p-10">
      <h1 className="text-3xl font-bold text-center capitalize dark:text-white text-black">
        {headingText}
      </h1>
      <p className="text-[15px] mt-2 text-center text-neutral-600 dark:text-neutral-300">
        {subText}
      </p>
      <div className="p-5 rounded-md border-2 border-neutral-600 dark:border-neutral-300 w-[450px] mt-4 flex flex-col justify-center items-center gap-4">
        {!isSignin && (
          <InputBox value="" onChange={() => {}} type="text" label="name" />
        )}
        <InputBox value="" onChange={() => {}} type="email" label="email" />
        <InputBox
          value=""
          onChange={() => {}}
          type="password"
          label="password"
        />
        <SuperBtn
          variant="primary"
          className="w-full mt-2"
          label={buttonLabel}
        />
        <p className="text-neutral-600 dark:text-neutral-300 capitalize text-[14px]">
          {alternateText}{" "}
          <Link href={isSignin ? "/auth/signup" : "/auth/signin"}>
            <span className="text-black hover:underline dark:text-white capitalize cursor-pointer">
              {alternateAction}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
