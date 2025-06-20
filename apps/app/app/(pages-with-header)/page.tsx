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
import TextAndVideo from "@/components/new/TextAndVideo";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <ImageWithPartner />
      <SayHi />
      <TextAndVideo
        label="open-source"
        title="Create"
        description="Simply designed to create perfect results fast. Elementary tools, advanced features and unlimited options with an infinite canvas."
        leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/bulb_icon.svg"
        type="normal"
        videoUrl="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Usecases_edit_video-1.mp4"
        isBiglayout
      />
      <TextAndVideo
        label="easy to use"
        title="Collaborate"
        description="Send link, get feedback and finish the idea together."
        leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/collaborate_arrows_icon.svg"
        type="normal"
        videoUrl="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Collaborate_video.mp4"
        isBiglayout
      />
      <TextAndVideo
        label="real-time collaboration"
        title="Common usecases"
        description="Meetings, Brainstorming, Diagrams, Interviews, Quick wireframing and more ..."
        leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/target_arrow_icon.svg"
        type="normal"
        videoUrl="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/create_video_temp.mp4"
        isBiglayout
      />
      <TextAndVideo
        label="whiteboard"
        title="Online"
        description="Something on your mind? Simply start drawing!"
        leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/excalidraw_logo_icon.svg"
        type="normal"
        isBiglayout={false}
      />
    </div>
  );
};

export default page;
