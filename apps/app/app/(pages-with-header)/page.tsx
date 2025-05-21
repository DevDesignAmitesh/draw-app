import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import VideoDemo from "@/components/VideoDemo";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-auto">
      <Hero />
      <VideoDemo />
      <Footer />
    </div>
  );
};

export default page;
