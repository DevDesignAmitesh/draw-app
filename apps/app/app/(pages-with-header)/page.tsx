import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import VideoDemo from "@/components/VideoDemo";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-auto relative">
      <Hero />
      <VideoDemo />
      <Footer />
    </div>
  );
};

export default page;
