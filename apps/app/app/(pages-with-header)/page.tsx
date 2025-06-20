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
import ImageWithPartner from "@/components/new/ImageWithPartner";
import SayHi from "@/components/new/SayHi";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <ImageWithPartner />
      <SayHi />
    </div>
  );
};

export default page;
