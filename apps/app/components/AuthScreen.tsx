"use client";

import React, { useState } from "react";
import InputBox from "./InputBox";
import SuperBtn from "./SuperBtn";
import Link from "next/link";
import axios from "axios";
import { HTTP_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Logo from "./new/Logo";
import ImageCarousel from "./new/ImageCarousel ";

const AuthScreen = ({ isSignin }: { isSignin?: boolean }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSignin = async () => {
    if (!email || !password) {
      alert("fill up all the details");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${HTTP_URL}/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        router.push("/dashboard");
      }
    } catch (err) {
      alert("Sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!name || !password || !email) {
      alert("fill up all the details");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${HTTP_URL}/signup`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.status === 201) {
        await handleSignin();
      }
    } catch (err) {
      alert("Sign-up failed. Try again.");
      setLoading(false);
    }
  };

  const headingText = isSignin ? "welcome back" : "create an account";
  const subText = isSignin
    ? "Sign in to access your diagrams"
    : "Sign up to start creating your diagrams";
  const buttonLabel = loading ? "Processing" : isSignin ? "Sign in" : "Sign up";
  const alternateText = isSignin
    ? "Don't have an account?"
    : "Already have an account?";
  const alternateAction = isSignin ? "Sign up" : "Sign in";

  return (
    <div className="w-full h-screen dark:bg-[#121212] bg-white flex flex-col gap-16 justify-center items-center p-10">
      <Logo />
      <div className="flex w-full justify-center gap-60 items-center">
        <ImageCarousel />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl tracking-wider font-bold text-center capitalize dark:text-white text-black">
            {headingText}
          </h1>
          <p className="text-[15px] tracking-wider mt-2 text-center text-neutral-600 dark:text-neutral-300">
            {subText}
          </p>
          <div className="p-5 rounded-md border-2 border-neutral-600 dark:border-neutral-300 lg:w-[450px] w-[350px] mt-4 flex flex-col justify-center items-center gap-4">
            {!isSignin && (
              <InputBox
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="name"
              />
            )}
            <InputBox
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="email"
            />
            <InputBox
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="password"
            />
            <SuperBtn
              variant="primary"
              className="w-full mt-2"
              label={buttonLabel}
              onClick={isSignin ? handleSignin : handleSignup}
              disabled={loading}
            />
            <p className="text-neutral-600 tracking-wider dark:text-neutral-300 capitalize text-[14px]">
              {alternateText}{" "}
              <Link href={isSignin ? "/signup" : "/signin"}>
                <span className="text-black tracking-wider hover:underline dark:text-white capitalize cursor-pointer">
                  {alternateAction}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
