"use client";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import VideoDemo from "@/components/VideoDemo";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { authenticated } = useAuthContext();
  const router = useRouter();

  if (authenticated) {
    router.push("/dashboard");
  }
  return (
    <div className="w-full h-auto relative">
      <Hero />
      <VideoDemo />
      <Footer />
    </div>
  );
};

export default page;
