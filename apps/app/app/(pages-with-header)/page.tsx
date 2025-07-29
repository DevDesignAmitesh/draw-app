// import Hero from "@/components/Hero";
// import Footer from "@/components/Footer";
// import VideoDemo from "@/components/VideoDemo";
// import React from "react";
// import { getUserId } from "@/draw/server-http";

// const page = async () => {
//   const userId = await getUserId();

//   return (
//     <div className="w-full h-auto relative">
//       <Hero userId={userId} />
//       <VideoDemo />
//       <Footer />
//     </div>
//   );
// };

// export default page;
import Hero from "@/components/new/Hero";
import React from "react";
import dynamic from "next/dynamic";
import Testimonials from "@/components/new/Testimonials";
import TextAndVideoComp from "@/components/new/TextAndVideoComp";
import Free from "@/components/new/Free";
import Footer from "@/components/new/Footer";
import PlusFeature from "@/components/new/PlusFeature";
import { getUserId } from "@/draw/server-http";

const page = async () => {
  const ImageWithPartner = dynamic(
    () => import("@/components/new/ImageWithPartner")
  );
  const SayHi = dynamic(() => import("@/components/new/SayHi"));

  const userId = await getUserId();

  return (
    <div className="w-full min-h-screen">
      <Hero />
      <ImageWithPartner />
      <SayHi userId={userId} />
      <TextAndVideoComp userId={userId} />
      <Testimonials />
      <Free userId={userId} />
      <PlusFeature userId={userId} />
      <Footer />
    </div>
  );
};

export default page;
