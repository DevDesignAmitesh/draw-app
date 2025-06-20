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

import Header from "@/components/new/Header";
import Five from "@/components/new/header-decoration/five";
import Four from "@/components/new/header-decoration/Four";
import One from "@/components/new/header-decoration/one";
import Three from "@/components/new/header-decoration/three";
import Two from "@/components/new/header-decoration/two";
import Hero from "@/components/new/Hero";
import React from "react";

const page = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#F8FFF8]">
      <Header />
      <Hero />
      <One />
      <Two />
      <Three />
      <Four />
      <Five />
    </div>
  );
};

export default page;
