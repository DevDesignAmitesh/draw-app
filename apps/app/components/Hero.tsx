"use client";

import React, { useContext } from "react";
import SuperBtn from "./SuperBtn";
import Image from "next/image";
import { ThemeContext } from "@/lib/ThemeProvider";
import Link from "next/link";

const Hero = ({ userId }: { userId: string | null }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full py-10 lg:pt-24 pt-14 flex lg:flex-row flex-col justify-center lg:justify-between items-center gap-10">
      <div className="flex flex-col justify-center items-start">
        <h1 className="lg:text-6xl text-4xl text-left capitalize font-bold text-black dark:text-white">
          Virtual whiteboard for collaborative drawing
        </h1>
        <p className="lg:text-[16px] text-[14px] font-medium capitalize text-left text-neutral-600 dark:text-neutral-400 mt-3">
          Create beautiful diagrams, flowcharts, and sketches with a minimalist,
          intuitive interface. Just like Excalidraw, but built by you.
        </p>
        {!userId ? (
          <div className="flex justify-center items-center gap-4 lg:mt-8 mt-4">
            <Link href={"/signup"}>
              <SuperBtn label="get started" variant="secondary" />
            </Link>
            <Link href={"#demo"}>
              <SuperBtn label="watch demo" variant="primary" />
            </Link>
          </div>
        ) : (
          <Link href={"/dashboard"}>
            <SuperBtn
              label="start sketching"
              variant="secondary"
              className="lg:mt-8 mt-4"
            />
          </Link>
        )}
      </div>
      {theme === "dark" ? (
        <Image
          src={
            "https://images.refero.design/screenshots/excalidraw.com/desktop/6e8f23d3-f8e2-44ed-aedc-5af8169785ab_thumb.jpg"
          }
          height={1500}
          width={1500}
          className="rounded-md"
          alt="hero pic"
        />
      ) : (
        <Image
          src={
            "https://marketplace.atlassian.com/product-listing/files/d486d6e2-f8e5-449f-8706-86aae1c07111?fileType=image&mode=full-fit"
          }
          height={700}
          width={700}
          className="rounded-md"
          alt="hero pic"
        />
      )}
    </div>
  );
};

export default Hero;
