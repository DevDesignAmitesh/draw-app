"use client";

import { ImageCarouselItems } from "@/lib/ui/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ImageCarouselItems.length);
        setFade(true);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center lg:mt-0 mt-10 items-center gap-5 dark:text-white text-[#030064]">
      {/* Animated wrapper */}
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <Image
          height={300}
          width={300}
          alt="img"
          src={ImageCarouselItems[index].img}
          className="transition-all duration-500"
        />
        <p className="w-full text-center text-xl mt-4">
          {ImageCarouselItems[index].label}
        </p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-2">
        {ImageCarouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setIndex(i);
                setFade(true);
              }, 200);
            }}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === index ? "dark:bg-white bg-[#030064]" : "bg-gray-300 dark:bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
