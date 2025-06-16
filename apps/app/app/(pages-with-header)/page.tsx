import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import VideoDemo from "@/components/VideoDemo";
import React from "react";
import { getUserId } from "@/draw/http";

const page = async () => {
  const userId = await getUserId();

  return (
    <div className="w-full h-auto relative">
      <Hero userId={userId} />
      <VideoDemo />
      <Footer />
    </div>
  );
};

export default page;
